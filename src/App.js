import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import { v4 as uuid } from 'uuid'; //"react-uuid" library to easily generate Universal Unique Identifiers
import Confetti from 'react-confetti'; //React component to draw confetti

function App() {

  const [dice, setDice] =  useState(allNewDice); //Setting dice initial state to the allNewDice function (Check it below!!)
  const [tenzies, setTenzies] = useState(false); //State used to manage the game's winning condition

  useEffect(()=> { //Runs on the first render and any time any dependency value changes
     const allHeld = dice.every(die => die.isHeld); //Returns true if every die is held 
     const firstValue = dice[0].value; //Value (number between 1 - 6) stored on the first die.
     const allSameValue = dice.every(die => die.value === firstValue); //Returns true if each die has the same value as the first one.
     if (allHeld && allSameValue) {
        setTenzies(true); //Returns true when the game's winning condition is satisfied
        console.log("You won!");   
     }
  }, [dice]) //Dependency array / value 

  function generateNewDie() { //Returns a Die object with 3 properties.
    return {
      value: Math.ceil(Math.random() * 6), //Random number between 1 - 6
      isHeld: false, //Determine if the die is currently being held
      id: uuid() //Assigns a random unique key (Important for mapping)
    }        
}

  function allNewDice() {
    // 10 length array of objects randomly generated with numbers between 1 and 6
    const randomNumbers = Array.from({length: 10}, ()=> { //Generates every die by calling the generateNewDie() function
        return generateNewDie(); 
      })
    return randomNumbers;
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die //Flips (true/false) the isHeld boolean value for the current clicked die.
    }))
  }

  const diceElements = dice.map( //Represents all the dice, mapping through each die and defining the props for the die component which are passed from the dice objects created by the generateNewDie() function
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
