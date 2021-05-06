import './style.css'
import {MDXProvider} from '@mdx-js/react'

import Head from 'next/head'

function MyApp({ Component, pageProps}) {

    const components = {
        wrapper: props => {
            const footer = (
                <footer>
                    <a href="/">&larr; homepage</a>
                </footer>
            )
            return (
                <>
                    <Head><title>{props?.metadata?.title}</title></Head>
                    <main {...props} />
                    {!props?.metadata?.nofooter ? footer : null }
                </>
            )}
    }

    return (
        <MDXProvider components={components}>
            <Component {...pageProps} />
        </MDXProvider>
    )
}

export default MyApp
