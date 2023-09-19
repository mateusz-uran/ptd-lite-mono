package io.github.mateuszuran.ptdlitemono.service.cronjob;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@EnableScheduling
public class StatisticExecutor {
    private final Auth0UsersListProvider provider;
    private final StatisticCollector collector;

    @Scheduled(cron = "0 59 17 * * *")
    public void cronJobUpdateStats() {
        var users = provider.extractUsersNicknames();

        for (String user : users) {
            collector.statisticExecutor(user);
        }
    }
}
