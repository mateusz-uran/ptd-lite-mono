package io.github.mateuszuran.ptdlitemono;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.http.HttpResponse;

@SpringBootApplication
public class PtdLiteMonoApplication {
    public static void main(String[] args) {
        SpringApplication.run(PtdLiteMonoApplication.class, args);
    }

    static class Scheduler {

        static void getAccessToken() {
        }
    }
}