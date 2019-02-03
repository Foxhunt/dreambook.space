import styled from "styled-components"

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
    }
`

export default ({onSubmit, onClick, dreamText, setDreamText}) =>
    <>
        <DreamInput
            onSubmit={onSubmit}
            onClick={onClick} >
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
    </>