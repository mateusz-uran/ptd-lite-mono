package io.github.mateuszuran.ptdlitemono.async;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class AsyncTestMethod {

    @Async("ptdLiteTaskExecutor")
    public void asyncMethodWithVoidReturnType() throws InterruptedException {
        Thread.sleep(5000);
        System.out.println("Execute method asynchronously. "
                + Thread.currentThread().getName());
    }
}
