package in.gronliv.controller;

import in.gronliv.dto.ContactRequest;
import in.gronliv.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactService contactService;
    public ContactController(ContactService contactService) { this.contactService = contactService; }
    
    @PostMapping
    public void submitContact(@Valid @RequestBody ContactRequest req, HttpServletRequest request) {
        contactService.submitContact(req, request.getRemoteAddr());
    }
}
