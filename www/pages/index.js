import "isomorphic-unfetch"

const Page = ({ dreams }) =>
    <>
        {dreams.map(({ text }, i) => <div key={i}>{ text }</div>)}
    </>

Page.getInitialProps = async ({ req }) => {
    const res = await fetch("/api/getDreams")
    const dreams = await res.json()
    console.log(dreams)
    return { dreams }
}

export default Page
