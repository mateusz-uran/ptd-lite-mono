package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo.CardAdditionalInfo;
import io.github.mateuszuran.ptdlitemono.service.logic.pdf.PDFCreator;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
public class PdfController {
    private final PDFCreator parser;

    @PostMapping("/generate-doc")
    public ResponseEntity<?> generatePdf(
            @RequestParam String username,
            @RequestParam Long cardId,
            @RequestParam(required = false) String page,
            @RequestBody CardAdditionalInfo info,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        var result = parser.generatePdf(request, response, username, cardId, page, info);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(result);
    }
}
