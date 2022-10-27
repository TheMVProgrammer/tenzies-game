import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import { v4 as uuid } from 'uuid';
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] =  useState(allNewdice);
  const [tenzies, setTenzies] = useState(false);

  useEffect(()=> {
     const allHeld = dice.every(die => die.isHeld);
     const firstValue = dice[0].value;
     const allSameValue = dice.every(die => die.value === firstValue);
     if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")   
     }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: uuid()
    }        
}

  function allNewdice() {
    // 10 length array of objects randomly generated with numbers between 1 and 6
    const randomNumbers = Array.from({length: 10}, ()=> {
        return generateNewDie()
      })
    return randomNumbers;
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(
    die => <Die 
      value={die.value} 
      isHeld={die.isHeld} 
      key={die.id}
      holdDice={()=>holdDice(die.id)}
      />
  )

  function rollDice() {
    return setDice(oldDice => oldDice.map(die => {
      return tenzies ? generateNewDie() : 
      die.isHeld ? die : generateNewDie()
    }))    
  }  

  function resetGame() {
    return setTenzies(false)
  }

  return (    
    <main>   
      {tenzies && <Confetti/>}
      <header>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. 
           Click each die to freeze it at its 
           current value between rolls.
        </p>
      </header>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
        onClick={()=>{rollDice(); resetGame();}} 
        className="roll-button">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
