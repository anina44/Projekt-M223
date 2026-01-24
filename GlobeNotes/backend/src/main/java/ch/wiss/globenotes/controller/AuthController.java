package ch.wiss.globenotes.controller;

import ch.wiss.globenotes.dto.AuthResponse;
import ch.wiss.globenotes.dto.LoginRequestDTO;
import ch.wiss.globenotes.dto.RegisterRequestDTO;
import ch.wiss.globenotes.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequestDTO req) {
        return ResponseEntity.ok(authService.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequestDTO req) {
        return ResponseEntity.ok(authService.login(req));
    }
}
