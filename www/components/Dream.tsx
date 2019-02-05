import React, { useState, useEffect } from "react"
import styled from "styled-components"

import DreamSVG from "../assets/svg/Dream.svg"

type Props = {
    selectDream: () => void
}

const Dream = styled(DreamSVG).attrs(({x, y, delay}) => ({
    style: {
        left: `${10 + 80 * x}%`,
        top: `${10 + 50 * y}%`,
        transition: `
            left cubic-bezier(0.46, 0.03, 0.52, 0.96) ${delay}ms,
            top cubic-bezier(0.46, 0.03, 0.52, 0.96) ${delay}ms`
    }
}))`
    position: absolute;
    transform: translate(-50%);
    mix-blend-mode: screen;
`

export default ({ selectDream }: Props) => {
    const [[x, y], setPosition] = useState([Math.random(), Math.random()])
    const [delay, setDelay] = useState(1000 * (5 + 5 * Math.random()))

    useEffect(() => {
        const id = setTimeout(() => {
            setPosition([Math.random(), Math.random()])
            setDelay(1000 * (5 + 5 * Math.random()))
        }, delay)
        return () => clearTimeout(id)
    }, [delay])

    return <Dream
        x={x}
        y={y}
        delay={delay}
        onClick={selectDream}
    />
}
