package io.github.mateuszuran.ptdlitemono.controller;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import io.github.mateuszuran.ptdlitemono.service.PdfService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/generate-doc")
    public ResponseEntity<?> generatePdfFromApi(
            @RequestParam String username,
            @RequestParam Long cardId,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        var pdf = service.retrieveInformation(username, cardId);
        var webContext = createContext(request, response);
        webContext.setVariable("pdf", pdf);

        String orderHtml = template.process("pdf-front", webContext);
        ByteArrayOutputStream target = new ByteArrayOutputStream();

        ConverterProperties converterProperties = new ConverterProperties();
        converterProperties.setBaseUri("http://localhost:8080");

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
}
