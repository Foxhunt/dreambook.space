import "isomorphic-unfetch"

const Page = ({ dreams }) =>
    <>
        {dreams.map(({ text, _id }) => <div key={_id}>{ text }</div>)}
    </>

Page.getInitialProps = async ({ req }) => {
    const url = req ? `https://${req.headers.host}/api/getDreams` : "/api/getDreams"
    const res = await fetch(url)
    const dreams = await res.json()
    return { dreams }
}

export default Page
