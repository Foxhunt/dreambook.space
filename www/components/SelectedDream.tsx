import styled from "styled-components"

type Props = {
    children: string
    unSelectDream: () => void
}

const SelectedDream = styled.div`
    position: absolute;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.25);
`

const Bubble = styled.div`
    width: 274px;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: rgb(225, 225, 225);
    border-radius: 46px;
`

const Text = styled.div`
    max-width: 80%;
    text-align: center;
    overflow-wrap: break-word;
    text-size-adjust: auto;
`

export default ({ children, unSelectDream }: Props) =>
    <SelectedDream
        onClick={unSelectDream}>
        <Bubble>
            <Text>
                { children }
            </Text>
        </Bubble>
    </SelectedDream>
