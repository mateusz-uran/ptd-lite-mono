package io.github.mateuszuran.ptdlitemono.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.service.logic.pdf.PDFCreator;
import io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo.CardAdditionalInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("it")
@AutoConfigureMockMvc
class PdfControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private PDFCreator pdfCreator;

    @Test
    public void testGeneratePdf() throws Exception {
        //given
        String username = "john";
        Long cardId = 123L;
        String page = "page1";
        CardAdditionalInfo info = new CardAdditionalInfo();

        byte[] pdfContent = "Sample PDF Content".getBytes(StandardCharsets.UTF_8);
        when(pdfCreator.generatePdf(any(HttpServletRequest.class), any(HttpServletResponse.class), eq(username), eq(cardId), eq(page), eq(info)))
                .thenReturn(pdfContent);

        //when + then
        mockMvc.perform(post("/api/pdf/generate-doc")
                        .param("username", username)
                        .param("cardId", String.valueOf(cardId))
                        .param("page", page)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(info)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andReturn();
    }
}