package io.github.mateuszuran.ptdlitemono.service.cronjob;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Component
public class Auth0AccessTokenProvider {

    @Value("${ptd.lite.machine-to-machine.domain}")
    private String machineToMachineDomain;
    @Value("${ptd.lite.machine-to-machine.audience}")
    private String machineToMachineAudience;
    @Value("${ptd.lite.machine-to-machine.client-secret}")
    private String machineToMachineClientSecret;
    @Value("${ptd.lite.machine-to-machine.client-id}")
    private String machineToMachineClientID;

    public HttpResponse<String> callAccessToken() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        Map<String, String> formData = new HashMap<>();
        formData.put("grant_type", "client_credentials");
        formData.put("client_id", machineToMachineClientID);
        formData.put("client_secret", machineToMachineClientSecret);
        formData.put("audience", machineToMachineAudience);

        HttpRequest request = HttpRequest.newBuilder()
                .header("Content-Type", "application/x-www-form-urlencoded")
                .uri(URI.create(String.format("https://%s/oauth/token", machineToMachineDomain)))
                .POST(HttpRequest.BodyPublishers.ofString(getFormDataAsString(formData)))
                .build();

        return client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    private static String getFormDataAsString(Map<String, String> formData) {
        StringBuilder formBodyBuilder = new StringBuilder();
        for (Map.Entry<String, String> singleEntry : formData.entrySet()) {
            if (formBodyBuilder.length() > 0) {
                formBodyBuilder.append("&");
            }
            formBodyBuilder.append(URLEncoder.encode(singleEntry.getKey(), StandardCharsets.UTF_8));
            formBodyBuilder.append("=");
            formBodyBuilder.append(URLEncoder.encode(singleEntry.getValue(), StandardCharsets.UTF_8));
        }
        return formBodyBuilder.toString();
    }
}
