import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import words from "../data/words.json";
import bodyParts from "../data/body-parts.json";

import { colors, contentWidth } from "./GlobalStyles";

const initialGameState = { started: false, over: false, win: false };
const statusButtons = { 0: "Start", 1: "Pause", 2: "Continue" };
const App = () => {
  // states
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: [], hasSet: false });
  const [status_b, setStatus_b] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [usedBody, setUsedBody] = useState([]);

  // ========== functions ==========
  // ===== handlers =====
  const handleStart = () => {
    if (word.str === "") {
      setWord(getNewWord());
    }
    setGame({ ...game, started: !game.started }); // syntax for spreading + reset the dictionary value
    setStatus_b(status_b + 1);
  };
  const handleGuess = (ltr) => {
    // lots of logic in here.
    // put to used letters
    setUsedLetters([...usedLetters, ltr]);
    // check in word or not
    if (word.str.includes(ltr)) {
      // update word and revealed
      let arr = [...word.revealed];
      arr.forEach((ele, ind, array) => {
        if (word.str[ind] === ltr) {
          //console.log(ele);
          array[ind] = ltr;
        }
      });
      setWord({ ...word, revealed: [...arr] });
    } else {
      // add b to wrong guesses
      setWrongGuesses([...wrongGuesses, ltr]);
      // update the deadman
      let bp = bodyParts[wrongGuesses.length];
      setUsedBody([...usedBody, bp]);
    }
  };
  const handleReset = () => {
    setGame({ ...game, over: false, win: false });
    setWord(getNewWord());
    //setStatus_b(0);
    setWrongGuesses([]);
    setUsedLetters([]);
    setUsedBody([]);
  };
  const handleEndGame = (win) => {
    let k = win;
    setGame({ started: true, over: true, win: k });
  };
  // ===== helper functions =====
  const getNewWord = () => {
    let w = words[Math.floor(Math.random() * words.length)];
    let r = [];
    //console.log(w);
    for (let n = 0; n < w.length; n++) {
      r.push("");
    }
    return {
      str: w,
      revealed: r,
      hasSet: false,
    };
  };
  // checking winning
  const allRevealed = () => {
    return !(word.revealed.includes("") || word.revealed.includes("____ "));
  };
  if (!game.over) {
    if (wrongGuesses.length === 10) {
      handleEndGame(false);
    } else if (allRevealed() && game.started) {
      handleEndGame(true);
    }
  }
  //console.log("App.js: ", game.win);
  return (
    <Wrapper>
      {game.over && (
        <GameOverModal
          hasWin={game.win}
          word={word.str}
          restartHandler={handleReset}
        />
      )}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{statusButtons[status_b % 3]}</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman usedBody={usedBody} />
            <RightColumn>
              <DeadLetters wrongGuesses={wrongGuesses} />
              <TheWord word={word} />
            </RightColumn>
          </Container>
          <Keyboard usedLetters={usedLetters} guessHandler={handleGuess} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
