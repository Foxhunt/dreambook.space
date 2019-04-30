import fetch from "isomorphic-unfetch"
import { NextContext } from "next"
import React, { useState, useEffect } from "react"
import styled from "styled-components"

import CloudSVG from "../assets/svg/Cloud.svg"

import Dreams from "../components/Dreams"
import DreamInput from "../components/DreamInput"
import SelectedDream from "../components/SelectedDream"

type dream = {
    _id: number
    text: string
}

type Props = {
    dreams: dream[]
}

const Cloud = styled(CloudSVG)`
    position: absolute;
    right: 64px;
    bottom: 64px;
`

const { floor, random } = Math

const dreamPrePhrases = ["Last night i dreamed ", "I wish i ", "If only i could ", "I dream of "]

const Page = (props: Props) => {
    const [dreams] = useState(new Map(props.dreams.map<[number,string]>(({_id, text}) => [_id, text])))
    const [dreamText, setDreamText] = useState(dreamPrePhrases[floor(dreamPrePhrases.length * random())])
    const [selectedDream, setSelectedDream] = useState<string | undefined>(undefined)
    const [showDreamInput, setShowDreamInput] = useState(false)

    useEffect(() => {
        if(dreamPrePhrases.includes(dreamText)){
            setDreamText(dreamPrePhrases[floor(dreamPrePhrases.length * random())])
        }
    }, [showDreamInput])

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
                hideDreamInput={ () => {
                    setShowDreamInput(false)
                }}
                onSubmit={event => {
                    event.preventDefault()
                    shareDream(dreamText)
                    setDreamText("")
                    setShowDreamInput(false)
                }}
            />
        }
        {
            selectedDream && <SelectedDream
                unSelectDream={() => {
                    setSelectedDream(undefined)
                }}
            >
                { selectedDream }
            </SelectedDream>
        }
    </>
}

Page.getInitialProps = async ({ req }: NextContext) => {
    const url = req ? `${req.headers.referer}api/getDreams` : "/api/getDreams"
    const res = await fetch(url)
    const dreams = await res.json()

    return { dreams }
}

function shareDream(dream: string) {
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
