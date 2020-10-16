import React from "react";
import styled from "styled-components";

const TheWord = ({ word, status }) => {
  // blocking re-setting words everytime
  if (!word.hasSet) {
    //console.log(word);
    let line = "____ ";
    let result = "";
    for (let n = 0; n < word.str.length; n++) {
      let tmp = Math.random();
      if (tmp > 0.2) {
        word.revealed[n] = line;
      } else {
        word.revealed[n] = `${word.str[n]} `;
      }
      result += `${word.revealed[n]} `;
    }
    word.hasSet = true;
    return <Wrapper>{result}</Wrapper>;
  } else {
    return (
      <>
        <Wrapper>{word.revealed.join(" ")}</Wrapper>
      </>
    );
  }
};

const Wrapper = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto;
  display: flex;
`;
const Span = styled.span`
  display: block;
  border-bottom: ${(props) => (props.line ? "2px solid white" : "none")};
  width: 30px;
  margin: 0 3px;
  text-align: center;
`;

export default TheWord;
