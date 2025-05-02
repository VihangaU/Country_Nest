package country.app.controller;

import country.app.model.User;
import country.app.repository.UserRepository;
import country.app.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(value = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/put")
public class PutContoller {
    private static final Logger logger = LoggerFactory.getLogger(PutContoller.class);

    private final UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public PutContoller(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/{userId}/favorites")
    public ResponseEntity<?> removeFavoriteCountry(@PathVariable String userId, @RequestBody Map<String, String> request) {
        String country = request.get("country");
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        user.removeFavoriteCountry(country);
        userRepository.save(user);

        return ResponseEntity.ok("Removed from favorites");
    }
}
