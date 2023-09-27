package io.github.mateuszuran.ptdlitemono.service.cronjob;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Slf4j
@Component
@AllArgsConstructor
@NoArgsConstructor
public class Auth0UsersListProvider {

    @Value("${ptd.lite.machine-to-machine.audience}")
    private String machineToMachineAudience;
    @Value("${ptd.lite.machine-to-machine.client-secret}")
    private String machineToMachineClientSecret;
    @Value("${ptd.lite.machine-to-machine.client-id}")
    private String machineToMachineClientID;

    private WebClient webClient;

    @Autowired
    public Auth0UsersListProvider(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public Mono<UserResponse[]> sequentialCalls() {
        MultiValueMap<String, String> bodyValues = new LinkedMultiValueMap<>();
        bodyValues.add("grant_type", "client_credentials");
        bodyValues.add("client_id", machineToMachineClientID);
        bodyValues.add("client_secret", machineToMachineClientSecret);
        bodyValues.add("audience", machineToMachineAudience);

        return this.webClient.post()
                .uri("/oauth/token")
                .body(BodyInserters.fromFormData(bodyValues))
                .retrieve()
                .bodyToMono(AccessToken.class)
                .zipWhen(token ->
                                webClient.get().uri("/api/v2/users")
                                        .headers(headers -> headers.setBearerAuth(token.getAccess_token()))
                                        .retrieve()
                                            .bodyToMono(UserResponse[].class),
                        (token, users) -> users
                );
    }

    public List<String> extractUsersNicknames() {
        var monoUsers = sequentialCalls().block();
        if (monoUsers == null) {
            return Collections.emptyList();
        }
        return Arrays.stream(monoUsers)
                .map(UserResponse::getNickname)
                .toList();
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class UserList {
        private List<UserResponse> users;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class UserResponse {
        private String nickname;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AccessToken {
        private String access_token;
    }
}
