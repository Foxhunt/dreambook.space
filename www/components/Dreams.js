import Dream from "../components/Dream"

export default ({dreams, selectDream}) =>
    <>{
        dreams.map(_id => 
            <Dream
                onClick={() => selectDream(_id)}
                key={_id} />
        )
    }</>
