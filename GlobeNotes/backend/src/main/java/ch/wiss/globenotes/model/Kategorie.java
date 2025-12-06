package ch.wiss.globenotes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Kategorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public Kategorie() {
    }

    public Kategorie(String name) {
        this.name = name;
    }

    /** 
     * Returniert die ID der Kategorie.
     */
    // Getter & Setter

    public Long getId() {
        return id;
    }

    /** 
     * Setzt die ID der Kategorie.
     */
    public String getName() {
        return name;
    }

    /** 
     * Setzt den Namen der Kategorie.
     */
    public void setName(String name) {
        this.name = name;
    }
}
