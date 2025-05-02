package country.app.controller;

import country.app.model.*;
import country.app.service.*;
import country.app.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(value = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/post")
public class PostController {
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public PostController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/{userId}/favorites")
    public ResponseEntity<?> addFavoriteCountry(@PathVariable String userId, @RequestBody Map<String, String> request) {
        String country = request.get("country");
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        user.addFavoriteCountry(country);
        userRepository.save(user);

        return ResponseEntity.ok("Added to favorites");
    }
}
