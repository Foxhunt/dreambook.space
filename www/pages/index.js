import "isomorphic-unfetch"
import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Dreams from "../components/Dreams"
import DreamInput from "../components/DreamInput"

import CloudSVG from "../assets/svg/Cloud.svg"

const Cloud = styled(CloudSVG)`
    position: absolute;
    right: 64px;
    bottom: 64px;
`

const SelectedDream = styled.div`
    position: absolute;

    top: 0px;
    left: 0px;

    width: 100%;
    height: 100%;

    color: white;
    text-align: center;
`

const Page = props => {
    const [dreams, setDreams] = useState(new Map(props.dreams.map(({_id, text}) => [_id, text])))
    const [dreamText, setDreamText] = useState("")
    const [selectedDream, setSelectedDream] = useState(null)
    const [showDreamInput, setShowDreamInput] = useState(false)

    return <>
        <Dreams 
            dreams={Array.from(dreams.keys())}
            selectDream={id => setSelectedDream(dreams.get(id))}/>
        <Cloud
            onClick={ () => setShowDreamInput(true) } />
        {
            showDreamInput && <DreamInput
                dreamText={ dreamText }
                setDreamText={ setDreamText }
                onClick={ () => { setShowDreamInput(false) } }
                onSubmit={(event) => {
                    event.preventDefault()
                    shareDream(dreamText)
                    setDreamText("")
                    setShowDreamInput(false)
                }}
            />
        }
        {
            selectedDream && <SelectedDream
                onClick={() => setSelectedDream(null)}>
                { selectedDream }
            </SelectedDream>
        }
    </>
}

Page.getInitialProps = async ({ req }) => {
    const url = req ? `https://${req.headers.host}/api/getDreams` : "/api/getDreams"
    const res = await fetch(url)
    const dreams = await res.json()

    return { dreams }
}

function shareDream(dream) {
    const text = dream.trim()
    fetch('/api/newDream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text }),
    })
}

export default Page
