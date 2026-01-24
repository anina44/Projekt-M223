package ch.wiss.globenotes.repository;

import ch.wiss.globenotes.model.AppUser;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}