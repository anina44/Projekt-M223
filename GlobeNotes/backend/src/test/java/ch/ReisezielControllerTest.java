package ch.wiss.globenotes;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import java.util.List;
import ch.wiss.globenotes.controller.ReisezielController;
import ch.wiss.globenotes.repository.ReisezielRepository;
import ch.wiss.globenotes.model.Reiseziel;

@WebMvcTest(ReisezielController.class)  // Testet nur den Controller
public class ReisezielControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReisezielRepository repository;  // Mock für DB

    @Test
    public void testGetReiseziele() throws Exception {
        // Mock-Daten
        when(repository.findByOwnerId(anyLong())).thenReturn(List.of(new Reiseziel()));

        mockMvc.perform(get("/api/reiseziele")
                .header("Authorization", "Bearer valid-jwt-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    public void testGetReisezieleEmpty() throws Exception  {
        // Mock leere Liste
        when(repository.findByOwnerId(anyLong())).thenReturn(List.of());

        mockMvc.perform(get("/api/reiseziele")
                .header("Authorization", "Bearer valid-jwt-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }
}