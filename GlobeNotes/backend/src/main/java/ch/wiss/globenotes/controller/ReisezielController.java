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
import org.json.JSONArray;
import org.json.JSONObject;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/reiseziele")
public class ReisezielController {

    @Autowired
    private ReisezielRepository repository;

    @Autowired
    private KategorieRepository kategorieRepository;

    /** 
     * Liefert alle Reiseziele zurück.
     */
    @GetMapping("/")
    public List<Reiseziel> getAlle() {
        return repository.findAll();
    }

    /** 
     * Liefert ein einzelnes Reiseziel basierend auf der ID.
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadReiseziel(@RequestBody Reiseziel reiseziel) {
        return ResponseEntity.ok("Upload erfolgreich");
    }

    /** 
     * Liefert ein einzelnes Reiseziel basierend auf der ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> loeschen(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /** 
     * Lädt ein Reiseziel mit einem Bild hoch.
     */
    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Reiseziel> uploadReisezielMitBild(
            @RequestParam("ort") String ort,
            @RequestParam("jahr") String jahr,
            @RequestParam("highlights") String highlights,
            @RequestParam("kategorie") String kategorieName,
            @RequestParam("bild") MultipartFile bildDatei
    ) {
        try {
            String ordner = "uploads/";
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
            neuesZiel.setBildPfad("/uploads/" + eindeutigerName);

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
