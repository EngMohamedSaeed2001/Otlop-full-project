package com.resturant.project.jwt;

import com.resturant.project.exception.JwtExpiredException;
import com.resturant.project.model.RefreshTokenResponse;
import com.resturant.project.model.entity.TokenStore;
import com.resturant.project.model.entity.User;
import com.resturant.project.repository.TokensRepository;
import com.resturant.project.repository.UserRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@Service
public class JwtUtil {

    private static final String SUBJECT_KEY = "sub";

    private String secret;
    private int jwtExpirationInMs;

    @Autowired
    private TokensRepository tokensRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        this.secret = secret;
    }

    @Value("${jwt.expirationDateInMs}")
    public void setJwtExpirationInMs(int jwtExpirationInMs) {
        this.jwtExpirationInMs = jwtExpirationInMs;
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        List<String> roles = new ArrayList<>();
        if (user.getProfile() != null) {
            user.getProfile().getRoles().forEach(grantedAuthority -> roles.add(grantedAuthority.getName()));
        }
        claims.put("roles", roles);
        String token = doGenerateToken(claims, user.getUsername());
        storeTokenInStore (user,token);
        return token;
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    public RefreshTokenResponse generateRefreshToken(String willExpireToken) {
        String token = extractBearerFromToken(willExpireToken);
        Jws<Claims> jwsClaims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
        Map<String, Object> claims = getMapFromIoJsonwebtokenClaims(jwsClaims.getBody());
        RefreshTokenResponse refreshTokenResponse = doGenerateRefreshToken(claims,claims.get(SUBJECT_KEY).toString());
        Optional<User> user = userRepository.findByUsername(getUsernameFromToken(token));
        storeTokenInStore (user.get(),refreshTokenResponse.getRefreshToken());

        return refreshTokenResponse;
    }

    private RefreshTokenResponse doGenerateRefreshToken(Map<String, Object> claims, String subject) {

        long currentTimeMillis = System.currentTimeMillis();
        Date issuedDate = new Date(currentTimeMillis);
        Date expiredDate = new Date(currentTimeMillis + jwtExpirationInMs);
        String token = Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(issuedDate)
                .setExpiration(expiredDate)
                .signWith(SignatureAlgorithm.HS512, secret).compact();

        return RefreshTokenResponse.builder()
                .refreshToken(token)
                .issuedDate(issuedDate)
                .expiredDate(expiredDate)
                .build();
    }

    public Map<String, Object> getMapFromIoJsonwebtokenClaims(Claims claims) {
        return new HashMap<>(claims);
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
            throw new BadCredentialsException("INVALID_CREDENTIALS", ex);
        } catch (ExpiredJwtException ex) {
            throw new JwtExpiredException(ex.getMessage(),ex);
        }
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public List<SimpleGrantedAuthority> getRolesFromToken(String token) {

        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        List<String> rolesInClaim = claims.get("roles", List.class);

        for (String role : rolesInClaim) {
            roles.add(new SimpleGrantedAuthority(role));
        }
        return roles;
    }

    private String extractBearerFromToken(String token) {
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return token;
    }
    private void storeTokenInStore(User user,String token){
        TokenStore tokenStore = TokenStore.builder()
                .token(token)
                .notUsed(false)
                .userId(user.getId())
                .createdAt(new Date(System.currentTimeMillis()))
                .expiredDate(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .build();
        tokensRepository.save(tokenStore);
    }

}
