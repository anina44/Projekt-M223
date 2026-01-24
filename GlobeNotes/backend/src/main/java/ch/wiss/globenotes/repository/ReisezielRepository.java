package ch.wiss.globenotes.repository;

import ch.wiss.globenotes.model.Reiseziel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;



/**
 * Repository interface für Reiseziel entities.
 * Dieses Interface ermöglicht CRUD-Operationen auf Reiseziel-Objekten.
 * Es erweitert JpaRepository, um grundlegende Datenbankoperationen zu unterstützen.
 */
@Repository
public interface ReisezielRepository extends JpaRepository<Reiseziel, Long> {
    List<Reiseziel> findByOwnerId(Long ownerId);
}


