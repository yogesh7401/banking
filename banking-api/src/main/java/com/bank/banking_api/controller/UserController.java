package com.bank.banking_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bank.banking_api.model.Transaction;
import com.bank.banking_api.model.Users;
import com.bank.banking_api.repository.TransactionRepository;
import com.bank.banking_api.repository.UserRepository;

@Controller
@RequestMapping(path = "/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    
	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
    private UserRepository userRepository;
	
	@GetMapping(path = "")
    public @ResponseBody Iterable<Users> getAllUsers() {
        return userRepository.findAll();
    }
	
	@GetMapping("/profile")
	public ResponseEntity<Users> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
	    Users user = userRepository.findByAccountNumber(userDetails.getUsername())
	        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
	    return ResponseEntity.ok(user);
	}
	
	@GetMapping("/{accountNumber}/transactions")
	public ResponseEntity<Page<Transaction>> getUserTransactions(
	        @PathVariable String accountNumber,
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
	        @RequestParam(defaultValue = "transactionTime,desc") String[] sort) {

	    Sort sortObj = Sort.by(Sort.Direction.fromString(sort[1]), sort[0]);
	    Pageable pageable = PageRequest.of(page, size, sortObj);

	    org.springframework.data.domain.Page<Transaction> transactions = transactionRepository.findBySenderAccountIdOrReceiverAccountId(accountNumber, accountNumber, pageable);

	    return ResponseEntity.ok(transactions);
	}
	
	
}
