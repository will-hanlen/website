import {
    readFile,
} from '../util/writing'

import EssayLayout from '../components/EssayLayout'

import hydrate from 'next-mdx-remote/hydrate'

import Head from 'next/head'

export default function Homepage ({ metadata, mdxSource }) {

    const content = hydrate(mdxSource)

    return <EssayLayout metadata={metadata} >{ content }</EssayLayout>

}

export async function getStaticProps() {

    const post = await readFile( `src/homepage.md` )

    return {
        props: post
    }

}
