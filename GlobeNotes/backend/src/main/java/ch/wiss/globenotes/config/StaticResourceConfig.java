package ch.wiss.globenotes.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    /** 
     * Konfiguriert statische Ressourcen für die Anwendung.
     * Dies ermöglicht den Zugriff auf Dateien im Verzeichnis "uploads".
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/uploads/**")
            .addResourceLocations("file:uploads/");
    }
}