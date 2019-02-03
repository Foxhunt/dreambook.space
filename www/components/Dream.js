import React, { useState, useEffect } from "react"
import styled from "styled-components"

import DreamSVG from "../assets/svg/Dream.svg"

const Dream = styled(DreamSVG).attrs(({x, y}) => ({
    style: {
        left: `${10 + 80 * x}%`,
        top: `${10 + 50 * y}%`
    }
}))`
    position: absolute;
    transform: translate(-50%);
    transition: left cubic-bezier(0.46, 0.03, 0.52, 0.96) 10s,
                top cubic-bezier(0.46, 0.03, 0.52, 0.96) 10s;

    will-change: transform;
`

export default ({ onClick }) => {
    const [[x, y], setPosition] = useState([Math.random(), Math.random()])
    useEffect(() => {
        const intervall = setInterval(() => {
            setPosition([Math.random(), Math.random()])
        }, 1000 * 10)
        return () => {
            clearInterval(intervall)
        }
    })

    return <Dream
        x={x}
        y={y}
        onClick={onClick}
    />
}
