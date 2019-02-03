import styled from "styled-components"

const Container = styled.div`
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


export default ({children, onClick}) =>
    <Container
        onClick={onClick}>
        <Text>
            {children}
        </Text>
    </Container>
