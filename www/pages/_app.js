import App, { Container } from "next/app"
import React from "react"
import Head from "next/head"

import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  div#__next, html, body {
    margin: 0;
    height: 100%;
    width: 100%;

    background: linear-gradient(164.54deg, #000000 0%, #23384B 36.65%, #365674 94.76%);

    overflow: hidden;
  }

  div#__next {
    will-change: transform;
  }
`

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <GlobalStyle />
        <Head>
          <title>DreamBook</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
