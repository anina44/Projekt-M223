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

import jakarta.annotation.PostConstruct;

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

    @PostConstruct
    public void initAdminUser() {
        if (userRepo.findByUsername("admin").isEmpty()) {
            AppUser admin = new AppUser();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPasswordHash(encoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            userRepo.save(admin);
            System.out.println("Admin user created: username=admin, password=admin123");
        }

        if (userRepo.findByUsername("user").isEmpty()) {
            AppUser user = new AppUser();
            user.setUsername("user");
            user.setEmail("user@example.com");
            user.setPasswordHash(encoder.encode("user123"));
            user.setRole(Role.USER);
            userRepo.save(user);
            System.out.println("User created: username=user, password=user123");
        }
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
        String uoe = req.getUsernameOrEmail();

        AppUser user = userRepo.findByEmail(uoe)
                .or(() -> userRepo.findByUsername(uoe))
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!encoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getId(), user.getUsername(), user.getRole().name());
    }
}
