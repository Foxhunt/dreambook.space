import "isomorphic-unfetch"

const handleSubmit = event => {
    event.preventDefault()
    const form = new FormData(event.target)
    const text = form.get("dream")
    fetch('/api/newDream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text }),
    })
    event.target.reset()
}

const Page = ({ dreams }) =>
    <>
        {dreams.map(({ text, _id }) => <div key={_id}>{ text }</div>)}
        <form onSubmit={ handleSubmit }>
            <input
                name="dream"
                type="text"
                placeholder="share your Dream"
                autocomplete="off" />
        </form>
    </>

Page.getInitialProps = async ({ req }) => {
    const url = req ? `https://${req.headers.host}/api/getDreams` : "/api/getDreams"
    const res = await fetch(url)
    const dreams = await res.json()
   
   return { dreams }
}

export default Page
