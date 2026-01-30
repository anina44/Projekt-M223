package ch.wiss.globenotes.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import ch.wiss.globenotes.model.Reiseziel;
import ch.wiss.globenotes.repository.KategorieRepository;
import ch.wiss.globenotes.repository.ReisezielRepository;
import ch.wiss.globenotes.model.Kategorie;
import ch.wiss.globenotes.model.Role;
import org.json.JSONArray;
import org.json.JSONObject;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import ch.wiss.globenotes.model.AppUser;


@CrossOrigin(origins = {"http://localhost:5173", "http://localhost", "http://localhost:80"})
@RestController
@RequestMapping("/api/reiseziele")
public class ReisezielController {

    @Autowired
    private ReisezielRepository repository;

    @Autowired
    private KategorieRepository kategorieRepository;

    /** 
     * Liefert alle Reiseziele zurück.
     */
    @GetMapping
    public List<Reiseziel> getMeine(@AuthenticationPrincipal AppUser user) {
        if (user.getRole() == Role.ADMIN) {
            return repository.findAll();
        }
        return repository.findByOwnerId(user.getId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> loeschen(@AuthenticationPrincipal AppUser user, @PathVariable Long id) {

        Reiseziel item = repository.findById(id).orElse(null);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }

        if (item.getOwner() == null || !item.getOwner().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        repository.delete(item);
        return ResponseEntity.ok().build();
    }


    /** 
     * Lädt ein Reiseziel mit einem Bild hoch.
     */
    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Reiseziel> uploadReisezielMitBild(
            @AuthenticationPrincipal AppUser user,
            @RequestParam("ort") String ort,
            @RequestParam("jahr") String jahr,
            @RequestParam("highlights") String highlights,
            @RequestParam("kategorie") String kategorieName,
            @RequestParam("bild") MultipartFile bildDatei
    ) {
        try {
            String ordner = "/uploads/";
            Files.createDirectories(Paths.get(ordner));

            String eindeutigerName = java.util.UUID.randomUUID() + "_" + bildDatei.getOriginalFilename();
            String pfad = ordner + eindeutigerName;
            Files.copy(bildDatei.getInputStream(), Paths.get(pfad), StandardCopyOption.REPLACE_EXISTING);

            Kategorie gespeicherteKategorie = kategorieRepository.save(new Kategorie(kategorieName));

            Reiseziel neuesZiel = new Reiseziel();
            neuesZiel.setOrt(ort);
            neuesZiel.setJahr(jahr);
            neuesZiel.setHighlights(highlights);
            neuesZiel.setKategorie(gespeicherteKategorie);
            neuesZiel.setBildUrl("/uploads/" + eindeutigerName);
            neuesZiel.setOwner(user);


            double[] koordinaten = ermittleKoordinaten(ort);
            neuesZiel.setLatitude(koordinaten[0]);
            neuesZiel.setLongitude(koordinaten[1]);

            return ResponseEntity.ok(repository.save(neuesZiel));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    /** 
     * Ermittelt die geografischen Koordinaten eines Ortes über die Nominatim API.
     */
    private double[] ermittleKoordinaten(String ort) {
        try {
            String url = "https://nominatim.openstreetmap.org/search?format=json&q=" + URLEncoder.encode(ort, StandardCharsets.UTF_8);
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("User-Agent", "Globenotes")
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JSONArray results = new JSONArray(response.body());
            if (results.length() > 0) {
                JSONObject firstResult = results.getJSONObject(0);
                double lat = firstResult.getDouble("lat");
                double lon = firstResult.getDouble("lon");
                return new double[]{lat, lon};
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new double[]{0, 0};
    }
}
