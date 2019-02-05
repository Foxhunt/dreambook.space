import styled from "styled-components"
import Dream from "./Dream"

type Props = {
    dreams: number[]
    selectDream: (_id: number) => void
}

const Dreams = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`

export default ({dreams, selectDream}: Props) =>
    <Dreams>{
        dreams.map(_id => 
            <Dream
                selectDream={() => selectDream(_id)}
                key={_id} />
        )
    }</Dreams>
