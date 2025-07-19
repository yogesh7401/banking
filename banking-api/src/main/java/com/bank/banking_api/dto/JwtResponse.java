package com.bank.banking_api.dto;

public class JwtResponse {
	private String accessToken;
    private String refreshToken;

    
    public JwtResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    
    public String getAccessToken() {
        return this.accessToken;
    }
    public String getRefreshToken() {
        return this.refreshToken;
    }
}
