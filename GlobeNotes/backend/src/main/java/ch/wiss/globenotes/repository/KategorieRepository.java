package ch.wiss.globenotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ch.wiss.globenotes.model.Kategorie;
import org.springframework.stereotype.Repository;

/**
 * Repository interface für Kategorie entities.
 * Dieses Interface ermöglicht CRUD-Operationen auf Kategorie-Objekten.
 */

@Repository
public interface KategorieRepository extends JpaRepository<Kategorie, Long> {
}