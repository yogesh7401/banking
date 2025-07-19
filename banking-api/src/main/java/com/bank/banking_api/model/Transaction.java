package com.bank.banking_api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_id", unique = true, nullable = false)
    private String transactionId;

    @Column(nullable = false)
    private String senderAccountId;

    @Column(nullable = false)
    private String receiverAccountId;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDateTime transactionTime;

    private String description;
    
    @PrePersist
    public void generateTransactionId() {
        this.transactionId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    // Constructors
    public Transaction() {}

    public Transaction(String transactionId, String senderAccountId, String receiverAccountId,
                       BigDecimal amount, String transactionType, LocalDateTime transactionTime,
                       String description) {
        this.transactionId = transactionId;
        this.senderAccountId = senderAccountId;
        this.receiverAccountId = receiverAccountId;
        this.amount = amount;
        this.transactionTime = transactionTime;
        this.description = description;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTransactionId() { return transactionId; }

    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getSenderAccountId() { return senderAccountId; }

    public void setSenderAccountId(String senderAccountId) { this.senderAccountId = senderAccountId; }

    public String getReceiverAccountId() { return receiverAccountId; }

    public void setReceiverAccountId(String receiverAccountId) { this.receiverAccountId = receiverAccountId; }

    public BigDecimal getAmount() { return amount; }

    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public LocalDateTime getTransactionTime() { return transactionTime; }

    public void setTransactionTime(LocalDateTime transactionTime) { this.transactionTime = transactionTime; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }
    
}
