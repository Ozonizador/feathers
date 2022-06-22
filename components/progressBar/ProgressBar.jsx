import React from "react";
import { useState, useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

export default function ProgressBar(props) {
    const [index, setIndex] = useState(props.idx);
    const [lineWidth, setLineWidth] = useState(9.0909090909090901 + "%");

    useEffect(() => {
        if (index === 0) {
            setLineWidth(9.0909090909090901 + "%");
        } else if (index === 10) {
            setLineWidth(100 + "%");
        } else {
            setLineWidth(index * 9.0909090909090901 + "%");
        }
    });

    return (
        <div className="progress-container">
            <div className="progress-line" style={{ width: lineWidth }}></div>
            <div className={index >= 2 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />
                <span>Passo 1</span>
            </div>
            <div className={index >= 3 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />

                <span>Passo 2</span>
            </div>
            <div className={index >= 4 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />

                <span>Passo 3</span>
            </div>
            <div className={index >= 5 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />

                <span>Passo 4</span>
            </div>
            <div className={index >= 6 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />

                <span>Passo 5</span>
            </div>
            <div className={index >= 7 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />

                <span>Passo 6</span>
            </div>
            <div className={index >= 8 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />

                <span>Passo 7</span>
            </div>
            <div className={index >= 9 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />

                <span>Passo 8</span>
            </div>
            <div className={index >= 10 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />

                <span>Passo 9</span>
            </div>
            <div className={index >= 10 ? "circle active" : "circle"}>
                <div className="bg-white"></div>
                <BsCheckCircleFill style={{ fontSize: "2rem" }} />

                <span>Passo</span>
            </div>
        </div>
    );
}
