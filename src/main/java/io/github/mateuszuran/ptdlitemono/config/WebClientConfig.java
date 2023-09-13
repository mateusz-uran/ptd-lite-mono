package io.github.mateuszuran.ptdlitemono.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@Data
public class WebClientConfig {

    @Value("${ptd.lite.machine-to-machine.domain}")
    private String machineToMachineDomain;

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder()
                .baseUrl("https://" + machineToMachineDomain);
    }
}
