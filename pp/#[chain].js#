import {
    readFile,
} from '../util/writing'

import EssayLayout from '../components/EssayLayout'

import hydrate from 'next-mdx-remote/hydrate'
import { useRouter } from 'next/router'

export default function Imean ( { metadata, mdxSource } ) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const content = hydrate(mdxSource)

    return <EssayLayout metadata={metadata} >{ content }</EssayLayout>

}

export async function getStaticProps( { params} ) {

    const entry = params.chain

    const post = await readFile( `src/${entry}.md` )

    return {
        props: post
    }

}

export async function getStaticPaths() {

    const paths = []

    return {
        paths,
        fallback: true,
    }
}
