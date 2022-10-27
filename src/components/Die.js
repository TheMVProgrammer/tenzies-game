import React from "react";

export default function Die(props) {
    let dots;

    if(props.value === 1) {
        dots = <div className="dot"></div>
    } else if (props.value === 2) {
        dots = 
        <div className="dot-container two">
            <div className="dot"></div> 
            <div className="dot"></div>
        </div>        
    } else if (props.value === 3) {
        dots = 
        <div className="dot-container three">
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
        </div>        
    } else if (props.value === 4) {
        dots = 
        <div className="dot-container four">
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
        </div>        
    } else if (props.value === 5) {
        dots = 
        <div className="dot-container five">
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
        </div>
    } else {
        dots = 
        <div className="dot-container six">
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
        </div>
    }

    return (
        <div 
            className={`die ${props.isHeld ? "green" : ""}`}
            onClick={props.holdDice}
        >  
            {dots}
        </div>
    )
}