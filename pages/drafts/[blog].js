import {
    getEssaySlugs,
    getEssayContent,
} from '../../util'

import hydrate from 'next-mdx-remote/hydrate'

import DraftLayout from '../../DraftLayout'

// imprt Head

export default function Blog ( { metadata, mdxSource } ) {

    const content = hydrate(mdxSource)

    return <DraftLayout metadata={metadata} >{ content }</DraftLayout>
}

export async function getStaticProps( { params} ) {

    const slug = params.blog

    const post = await getEssayContent('drafts', slug)

    return {
        props: post
    }

}

export async function getStaticPaths() {

    const posts = await getEssaySlugs('drafts')

    return {
        paths: posts.map( post => {
            return { 
                params: { 
                    blog: post
                }
            }
        }),
        fallback: false,
    }
}