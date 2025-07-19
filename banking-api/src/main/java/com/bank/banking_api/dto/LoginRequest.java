package com.bank.banking_api.dto;

public class LoginRequest {
    private String accountNumber;
    private String password;
    
    public String getAccountNumber() {
		return accountNumber;
	}
    
    public String getPassword() {
		return password;
	}
}
