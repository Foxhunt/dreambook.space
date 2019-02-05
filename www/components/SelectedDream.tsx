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

const Text = styled.div`
    color: white;
`

export default ({ children, unSelectDream }: Props) =>
    <SelectedDream
        onClick={unSelectDream}>
        <Text>
            { children }
        </Text>
    </SelectedDream>
