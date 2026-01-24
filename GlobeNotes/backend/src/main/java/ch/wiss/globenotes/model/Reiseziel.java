package ch.wiss.globenotes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;


@Entity
public class Reiseziel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ort;
    private String jahr;
    private String highlights;
    private String bildUrl;
    private String bildPfad;

    private double latitude;
    private double longitude;


    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private AppUser owner;

    @ManyToOne
    private Kategorie kategorie;

     // Getter & Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrt() {
        return ort;
    }

    public void setOrt(String ort) {
        this.ort = ort;
    }

    public String getJahr() {
        return jahr;
    }

    public void setJahr(String jahr) {
        this.jahr = jahr;
    }

    public String getHighlights() {
        return highlights;
    }

    public void setHighlights(String highlights) {
        this.highlights = highlights;
    }

    public String getBildUrl() {
        return bildUrl;
    }

    public void setBildUrl(String bildUrl) {
        this.bildUrl = bildUrl;
    }

    public String getBildPfad() {
        return bildPfad;
    }

    public void setBildPfad(String bildPfad) {
        this.bildPfad = bildPfad;
    }

    public Kategorie getKategorie() {
        return kategorie;
    }
    
    public void setKategorie(Kategorie kategorie) {
        this.kategorie = kategorie;
    }

    public double getLatitude() {
        return latitude;
    }
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
    public double getLongitude() {
        return longitude;
    }
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public AppUser getOwner() {
        return owner;
    }

    public void setOwner(AppUser owner) {
        this.owner = owner;
    }

}