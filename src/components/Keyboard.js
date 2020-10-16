import React from "react";
import styled from "styled-components";
import LetterKey from "./LetterKey";
import letterData from "../data/letters.json";

import { colors, contentWidth } from "./GlobalStyles";

const Keyboard = ({ usedLetters, guessHandler }) => {
  //console.log("The used Letters are: ", usedLetters);
  return (
    <Wrapper>
      {letterData.map((ele) => {
        let included = usedLetters.includes(ele);
        return (
          <LetterKey
            guessHandler={guessHandler}
            l={ele}
            disable={included}
            key={`letter-${ele}`}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${colors.yellow};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 20px 12px;
  max-width: ${contentWidth};
  min-width: 320px;
`;

export default Keyboard;
