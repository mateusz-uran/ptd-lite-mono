package io.github.mateuszuran.ptdlitemono.controller;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import io.github.mateuszuran.ptdlitemono.pdf.CardAdditionalInfo;
import io.github.mateuszuran.ptdlitemono.pdf.PdfRequest;
import io.github.mateuszuran.ptdlitemono.service.PdfService;
import io.github.mateuszuran.ptdlitemono.service.logic.PdfParser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.web.servlet.JakartaServletWebApplication;

import java.io.ByteArrayOutputStream;

@Slf4j
@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
public class PdfController {
    private final PdfService service;
    private final TemplateEngine template;
    private final PdfParser parser;

    @Value("${backend.url}")
    private String backendUrl;

    @PostMapping("/generate")
    public ResponseEntity<?> generatePdf(
            @RequestBody PdfRequest pdfRequest,
            @RequestParam String username,
            HttpServletRequest request,
            HttpServletResponse response) {
        var pdf = service.gatherAllData(pdfRequest, username);
        var webContext = createContext(request, response);
        webContext.setVariable("pdf", pdf);

        String orderHtml = template.process("card", webContext);
        ByteArrayOutputStream target = new ByteArrayOutputStream();

        ConverterProperties converterProperties = new ConverterProperties();
        converterProperties.setBaseUri(backendUrl);

        HtmlConverter.convertToPdf(orderHtml, target, converterProperties);

        byte[] bytes = target.toByteArray();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(bytes);
    }

    private static WebContext createContext(HttpServletRequest req, HttpServletResponse res) {
        var application = JakartaServletWebApplication.buildApplication(req.getServletContext());
        var exchange = application.buildExchange(req, res);
        return new WebContext(exchange);
    }

    @PostMapping("/generate-doc")
    public ResponseEntity<?> generatePdfFromParser(
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
