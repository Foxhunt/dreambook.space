import styled from "styled-components"
import { FormEvent } from "react";

type Props = {
    onSubmit: (event: FormEvent) => void
    hideDreamInput: () => void
    dreamText: string
    setDreamText: (dreamText: string) => void
}

const DreamInput = styled.form`
    display: block;
    position: absolute;

    top: 0px;
    left: 0px;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.25);

    > input {
        position: absolute;
        transform: translate(-50%);
        left: 50%;
        bottom: 16%;

        width: 230px;
        height: 50px;

        border-radius: 30px;
        border-style: none;

        text-align: center;
        background-color: rgb(225, 225, 225);
        
        outline: none;
    }
`

export default ({onSubmit, hideDreamInput, dreamText, setDreamText}: Props) =>
    <DreamInput
        onSubmit={onSubmit}
        onClick={hideDreamInput} >
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