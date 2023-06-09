package io.github.mateuszuran.ptdlitemono.service.logic;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import io.github.mateuszuran.ptdlitemono.pdf.CardAdditionalInfo;
import io.github.mateuszuran.ptdlitemono.pdf.PdfSource;
import io.github.mateuszuran.ptdlitemono.service.PdfService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.web.servlet.JakartaServletWebApplication;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class PdfParser {
    private final PdfService pdfService;
    private final TemplateEngine template;

    @Value("${backend.url}")
    private String backendUrl;

    private WebContext createContext(HttpServletRequest req, HttpServletResponse res) {
        var application = JakartaServletWebApplication.buildApplication(req.getServletContext());
        var exchange = application.buildExchange(req, res);
        return new WebContext(exchange);
    }

    private WebContext generateContext(HttpServletRequest request, HttpServletResponse response, String username, Long cardId, CardAdditionalInfo info) {
        PdfSource pdf = pdfService.retrieveInformation(username, cardId);
        pdf.setInfo(info);
        WebContext webContext = createContext(request, response);
        webContext.setVariable("pdf", pdf);
        return webContext;
    }

    private String processToTemplateEngine(WebContext context, String templateName) {
        return template.process(templateName, context);
    }

    private byte[] convertHtmlToPdf(String orderHtml) {
        try (ByteArrayOutputStream target = new ByteArrayOutputStream()) {
            ConverterProperties converterProperties = new ConverterProperties();
            converterProperties.setBaseUri(backendUrl);

            HtmlConverter.convertToPdf(orderHtml, target, converterProperties);

            return target.toByteArray();
        } catch (IOException e) {
            // Handle or log the exception
            return new byte[0];
        }
    }

    public String validateTemplate(String template) {
        if (template != null) {
            if (template.equals("first")) {
                return "pdf-front";
            } else if (template.equals("second")) {
                return "pdf-back";
            }
        }
        return "pdf-all";
    }

    public byte[] generatePdf(HttpServletRequest request, HttpServletResponse response, String username, Long cardId, String templateName, CardAdditionalInfo info) {
        var context = generateContext(request, response, username, cardId, info);
        var templateNameValidated = validateTemplate(templateName);
        var template = processToTemplateEngine(context, templateNameValidated);
        return convertHtmlToPdf(template);
    }
}
