import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import Tracker from "./components/Tracker";
import { v4 as uuid } from 'uuid'; //"react-uuid" library to easily generate Universal Unique Identifiers
import Confetti from 'react-confetti'; //React component to draw confetti

function App() {

  const [dice, setDice] =  useState(allNewDice); //Setting dice initial state to the allNewDice function (Check it below!!)
  const [tenzies, setTenzies] = useState(false); //State used to manage the game's winning condition
  const [rolls, setRolls] = useState(0); //Track the number of rolls
  const [time, setTime] = useState(0); //Timer
  const [startStop, setStartStop] = useState(true); 
  const [bestTime, setBestTime] = useState(
    JSON.parse(localStorage.getItem("bestTime")) || 0
  );

  useEffect(()=> { //Runs on the first render and any time any dependency value changes
     const allHeld = dice.every(die => die.isHeld); //Returns true if every die is held 
     const firstValue = dice[0].value; //Value (number between 1 - 6) stored on the first die.
     const allSameValue = dice.every(die => die.value === firstValue); //Returns true if each die has the same value as the first one.
     const timeHolder = Math.floor(time / 10);
     
     if (allHeld && allSameValue) {
        setTenzies(true); //Returns true when the game's winning condition is satisfied
        setStartStop(false);

    //Save best time        
        
     if (!bestTime || timeHolder < bestTime) { //If bestTime does not exist or current time is lower than bestTime
        setBestTime(timeHolder);
      }  
     } 
     if (!startStop) {
      setStartStop(true);
    }
  }, [dice, startStop, time, bestTime]) //Dependency array - value 

  useEffect(() => {
    let interval;
    startStop ? interval = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10) : clearInterval(interval);

    return () => clearInterval(interval);
  }, [startStop]);

  //Save bestTime to localStorage every time bestTime changes
  useEffect(() => {
    localStorage.setItem("bestTime", JSON.stringify(bestTime));
  }, [bestTime]);


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

    if(tenzies) {
      resetGame();
    }

    return setDice(oldDice => oldDice.map(die => {
      return tenzies ? generateNewDie() : 
      die.isHeld ? die : generateNewDie()
    }))    
  }  

  function resetGame() {
    return (setTenzies(false), setTime(0));
  }

  function countRoll() {
    tenzies ? setRolls(0) :
    setRolls(oldRolls => oldRolls + 1);
  }

  return (    
    <>
    <main>   
      {tenzies && dice.every(die => die.isHeld) && <Confetti/>}
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
        onClick={()=>{rollDice(); countRoll();}} 
        className="roll-button">
        {tenzies ? "New Game" : "Roll"}
      </button>
      <Tracker 
        rollCount={rolls}
        timer={time}
        bestTime={bestTime}
      />
    </main>
    <footer>
      <small>Coded with <span>❤</span> by Franklin Martinez</small>
    </footer>
    </>
  );
}

export default App;
