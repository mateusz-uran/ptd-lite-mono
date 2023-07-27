package io.github.mateuszuran.ptdlitemono.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncTaskExecutorConfig {

    @Bean(name = "ptdLiteTaskExecutor")
    public Executor threadPoolTaskExecutor() {
        ThreadPoolTaskExecutor threadPoolTaskExecutor = new ThreadPoolTaskExecutor();
        threadPoolTaskExecutor.setCorePoolSize(2); //default: 1
        threadPoolTaskExecutor.setMaxPoolSize(10); //default: Integer.MAX_VALUE
        threadPoolTaskExecutor.setQueueCapacity(20); // default: Integer.MAX_VALUE
        threadPoolTaskExecutor.setKeepAliveSeconds(120); // default: 60 seconds
        threadPoolTaskExecutor.initialize();
        return threadPoolTaskExecutor;
    }
}
