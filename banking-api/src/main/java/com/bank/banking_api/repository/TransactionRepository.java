package com.bank.banking_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bank.banking_api.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT COUNT(t) FROM Transaction t")
    long countAllTransactions();
    
    Page<Transaction> findBySenderAccountIdOrReceiverAccountId(String senderAccountId, String receiverAccountId, Pageable pageable);
    
}
