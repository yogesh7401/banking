package com.bank.banking_api.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bank.banking_api.model.Users;
import com.bank.banking_api.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository UserRepository;

    public UserDetails loadUserByUsername(String accountNumber) throws UsernameNotFoundException {
        Users user = UserRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new UsernameNotFoundException("Account number not found"));
        return new org.springframework.security.core.userdetails.User(
                user.getAccountNumber(),
                user.getPassword(),
                new ArrayList<>()
        );
    }
}
