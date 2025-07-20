package com.bank.banking_api.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.bank.banking_api.dto.JwtResponse;
import com.bank.banking_api.dto.LoginRequest;
import com.bank.banking_api.service.CustomUserDetailsService;
import com.bank.banking_api.utils.JwtUtil;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    	try {
    	    authenticationManager.authenticate(
    	        new UsernamePasswordAuthenticationToken(
    	            loginRequest.getAccountNumber(), loginRequest.getPassword()
    	        )
    	    );
    	} catch (Exception e) {
    	    return ResponseEntity.status(401).body("Invalid credentials");
    	}


        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getAccountNumber());
        final String accessToken = jwtUtil.generateAccessToken(userDetails.getUsername());
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

        return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        try {
            String accountNumber = jwtUtil.extractAccountNumber(refreshToken);
            String newAccessToken = jwtUtil.generateAccessToken(accountNumber);

            return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired refresh token");
        }
    }

}
