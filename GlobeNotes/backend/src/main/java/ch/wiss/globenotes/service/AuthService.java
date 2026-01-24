package ch.wiss.globenotes.service;

import ch.wiss.globenotes.dto.AuthResponse;
import ch.wiss.globenotes.dto.LoginRequestDTO;
import ch.wiss.globenotes.dto.RegisterRequestDTO;
import ch.wiss.globenotes.model.AppUser;
import ch.wiss.globenotes.model.Role;
import ch.wiss.globenotes.repository.AppUserRepository;
import ch.wiss.globenotes.security.JwtService; // WICHTIG: muss zu deinem Klassennamen passen!
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AppUserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthService(AppUserRepository userRepo, PasswordEncoder encoder, JwtService jwtService) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequestDTO req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (userRepo.existsByUsername(req.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        AppUser user = new AppUser();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPasswordHash(encoder.encode(req.getPassword()));
        user.setRole(Role.USER);

        userRepo.save(user);

        String token = jwtService.generateToken(user);
        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );
    }

    public AuthResponse login(LoginRequestDTO req) {
        AppUser user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!encoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );
    }
}
