package com.vitaura.service;

import com.vitaura.domain.ContactSubmission;
import com.vitaura.dto.ContactRequest;
import com.vitaura.repository.ContactSubmissionRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private final ContactSubmissionRepository repo;

    public ContactService(ContactSubmissionRepository repo) {
        this.repo = repo;
    }

    public void submitContact(ContactRequest req, String ip) {
        ContactSubmission sub = new ContactSubmission();
        sub.setName(req.getName());
        sub.setEmail(req.getEmail());
        sub.setMessage(req.getMessage());
        sub.setIpAddress(ip);
        repo.save(sub);
    }
}

