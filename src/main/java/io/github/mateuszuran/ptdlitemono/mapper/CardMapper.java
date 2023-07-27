package io.github.mateuszuran.ptdlitemono.mapper;

import io.github.mateuszuran.ptdlitemono.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlitemono.dto.response.CardResponse;
import io.github.mateuszuran.ptdlitemono.model.Card;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class CardMapper {
    private final ModelMapperConfig mapper;

    public CardResponse mapCardToCardResponse(Card card) {
        return mapper.modelMapper().map(card, CardResponse.class);
    }

    public CardResponse mapToCardResponseWithFormattedCreationTime(Card card) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedTime = card.getCreationTime().format(formatter);
        CardResponse response = mapper.modelMapper().map(card, CardResponse.class);
        response.setCreationTime(formattedTime);
        return response;
    }
}
