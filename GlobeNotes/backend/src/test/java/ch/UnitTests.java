package ch;

import ch.wiss.globenotes.model.Reiseziel;
import ch.wiss.globenotes.repository.ReisezielRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UnitTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ReisezielRepository repository;

    private Reiseziel beispielZiel;

    @BeforeEach
    void setup() {
        repository.deleteAll();
        beispielZiel = new Reiseziel();
        beispielZiel.setOrt("Paris");
        beispielZiel.setJahr("2022");
        beispielZiel.setHighlights("Eiffelturm");
        repository.save(beispielZiel);
    }

    @Test
    void getAlleReiseziel() throws Exception {
        mockMvc.perform(get("/reiseziel/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].ort", is("Paris")));
    }

    // U2: POST neues Reiseziel
    @Test
    void postNeuesReiseziel() throws Exception {
        String neuesReiseziel = """
                {
                    "ort": "Rom",
                    "jahr": "2023",
                    "highlights": "Kolosseum"
                    "kategorie": "Städtetrip"
                }
                """;

        mockMvc.perform(post("/reiseziel/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(neuesReiseziel))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists());
    }

    // U3: Validierung testen - Ort leer
    @Test
    void postUngültigesReiseziel_OrtLeer() throws Exception {
        String invalidReiseziel = """
                {
                    "ort": "",
                    "jahr": "2023",
                    "highlights": "Kolosseum"
                }
                """;

        mockMvc.perform(post("/reiseziel/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidReiseziel))
                .andExpect(status().isBadRequest());
    }

    // U4: DELETE Reiseziel
    @Test
    void deleteReiseziel() throws Exception {
        mockMvc.perform(delete("/reiseziel/" + beispielZiel.getId()))
                .andExpect(status().isNoContent());
    }

    // U5: GET Reiseziel nach ID
    @Test
    void getReisezielById() throws Exception {
        mockMvc.perform(get("/reiseziel/" + beispielZiel.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ort", is("Paris")));
    }
}
