import "isomorphic-unfetch"
import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Dream from "../components/Dream"

import CloudSVG from "../assets/svg/Cloud.svg"

const Cloud = styled(CloudSVG)`
    position: absolute;
    right: 64px;
    bottom: 64px;
`

const DreamInput = styled.form`
    display: block;
    position: absolute;

    top: 0px;
    left: 0px;

    width: 100%;
    height: 100%;

    > input {
        position: absolute;
        right: 108px;
        bottom: 92px;

        width: 230px;
        height: 50px;

        border-radius: 30px;
        border-style: none;

        text-align: center;
        background-color: rgb(225, 225, 225);
    }
`

const SelectedDream = styled.div`
    position: absolute;

    top: 0px;
    left: 0px;

    width: 100%;
    height: 100%;

    color: white;
`

const Page = props => {
    const [dreams, setDreams] = useState(new Map(props.dreams.map(({_id, text}) => [_id, text])))
    const [dreamText, setDreamText] = useState("")
    const [selectedDream, setSelectedDream] = useState(null)
    const [showDreamInput, setShowDreamInput] = useState(false)

    return <>
        {
            Array.from(dreams.keys()).map(_id => 
                <Dream
                    onClick={() => setSelectedDream(dreams.get(_id))}
                    key={_id} />
            )
        }
        <Cloud
            onClick={ () => setShowDreamInput(true) } />
        {
            showDreamInput && <DreamInput
                onSubmit={(event) => {
                    event.preventDefault()
                    shareDream(dreamText)
                    setDreamText("")
                    setShowDreamInput(false)
                }}
                onClick={ () => { setShowDreamInput(false) } }
            >
                <input
                    onChange={ event => setDreamText(event.target.value) }
                    onClick={ event => event.stopPropagation() }
                    value={ dreamText }
                    name="dream"
                    type="text"
                    required
                    placeholder="share your Dream"
                    autoComplete="off" />
            </DreamInput>
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
