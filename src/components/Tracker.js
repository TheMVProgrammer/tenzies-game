import React from "react";

export default function Tracker (props) {
    return (
        <div className="tracker-container">
            <div className="roll-count">
                <p>Rolls</p>
                <p>{props.rollCount}</p>
            </div>
            <div className="best-time">
                <p>Best time</p>
                <p>{props.bestTime / 100}</p>
            </div>
            <div className="time-count">
                <p>Timer</p>
                <p>{("0" + Math.floor((props.timer / 1000) % 60)).slice(-2)}:
            {("0" + ((props.timer / 10) % 1000)).slice(-2)}</p>
            </div>
        </div>
    )
}