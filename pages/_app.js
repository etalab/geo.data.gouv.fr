import React from 'react'
import App, {Container} from 'next/app'

export default class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render() {
    const {Component, pageProps} = this.props
    return (
      <Container>
        <style jsx global>{`
          @import 'reset';
        `}</style>

        <Component {...pageProps} />
      </Container>
    )
  }
}
