package ch.wiss.globenotes.service;

import ch.wiss.globenotes.model.AppUser;
import ch.wiss.globenotes.model.Reiseziel;
import ch.wiss.globenotes.repository.ReisezielRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ReisezielService {

    private final ReisezielRepository repo;

    public ReisezielService(ReisezielRepository repo) {
        this.repo = repo;
    }

    public List<Reiseziel> findMyReiseziele(AppUser user) {
        return repo.findByOwnerId(user.getId());
    }

    @Transactional
    public Reiseziel createForUser(AppUser user, Reiseziel reiseziel) {
        reiseziel.setId(null);
        reiseziel.setOwner(user);
        return repo.save(reiseziel);
    }

    @Transactional
    public void deleteMine(AppUser user, Long id) {
        Reiseziel r = repo.findById(id).orElseThrow();
        if (!r.getOwner().getId().equals(user.getId())) {
            throw new SecurityException("Not your item");
        }
        repo.delete(r);
    }
}
