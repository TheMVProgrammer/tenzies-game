import React from "react";

export default function Tracker () {
    return (
        <div className="tracker-container">
            <div className="roll-count">
                <p>Rolls</p>
                <p>0</p>
            </div>
            <div className="best-time">
                <p>Best time</p>
                <p>10s</p>
            </div>
            <div className="time-count">
                <p>Timer</p>
                <p>5.3s</p>
            </div>
        </div>
    )
}