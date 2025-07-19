package com.bank.banking_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bank.banking_api.model.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
	
	@Query(value="SELECT * FROM users WHERE account_number = :accountNumber", nativeQuery = true)
	Optional<Users> findByAccountNumber(@Param("accountNumber") String accountNumber);
}
