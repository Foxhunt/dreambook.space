import "isomorphic-unfetch"
import useState from "react"

const handleSubmit = event => {
    event.preventDefault()
    const form = new FormData(event.target)
    const text = form.get("dream").trim()
    fetch('/api/newDream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text }),
    })
    event.target.reset()
}

const Page = props => {
    const [dreams, setDreams] = useState(props.dreams)

    return <>
        {dreams.map(({ text, _id }) => <div key={_id}>{ text }</div>)}
        <form onSubmit={ handleSubmit }>
            <input
                name="dream"
                type="text"
                required
                placeholder="share your Dream"
                autoComplete="off" />
        </form>
        <button 
            onClick={async () => {
                const res = await fetch("/api/getDreams")
                const dreams = await res.json()
                setDreams(dreams)
        }}>
            refresh
        </button>
    </>
}

Page.getInitialProps = async ({ req }) => {
    const url = req ? `https://${req.headers.host}/api/getDreams` : "/api/getDreams"
    const res = await fetch(url)
    const dreams = await res.json()
   
   return { dreams }
}

export default Page
