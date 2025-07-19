package com.bank.banking_api.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bank.banking_api.dto.TransferRequest;
import com.bank.banking_api.model.Transaction;
import com.bank.banking_api.model.Users;
import com.bank.banking_api.repository.TransactionRepository;
import com.bank.banking_api.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public String transferMoney(TransferRequest request) {
        // Validate sender
    	String senderAccountNumber = SecurityContextHolder.getContext().getAuthentication().getName();
    	
        Users sender = userRepository.findByAccountNumber(senderAccountNumber)
            .orElseThrow(() -> new RuntimeException("Sender account not found"));

        if (sender.getAccountBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        // Validate receiver
        Users receiver = userRepository.findByAccountNumber(request.getReceiverAccountNumber())
            .orElseThrow(() -> new RuntimeException("Receiver account not found"));
        if (!receiver.getExpireMonth().equals(receiver.getExpireMonth()) || !receiver.getExpireYear().equals(request.getExpireYear())) {
        	throw new RuntimeException("Invalid expiry date");
		}
        // Transfer
        sender.setAccountBalance(sender.getAccountBalance().subtract(request.getAmount()));
        receiver.setAccountBalance(receiver.getAccountBalance().add(request.getAmount()));
        
        Transaction transaction = new Transaction();
        transaction.setSenderAccountId(sender.getAccountNumber());
        transaction.setReceiverAccountId(receiver.getAccountNumber());
        transaction.setAmount(request.getAmount());
        transaction.setTransactionTime(LocalDateTime.now());
        
        transactionRepository.save(transaction);
        userRepository.save(sender);
        userRepository.save(receiver);

        return "Transfer successful";
    }
}
