import {
    getEssaySlugs,
    getEssayContent,
} from '../../util'

import hydrate from 'next-mdx-remote/hydrate'

import BlogLayout from '../../Layout'

// imprt Head

export default function Blog ( { metadata, mdxSource } ) {

    const content = hydrate(mdxSource)

    return <BlogLayout metadata={metadata} >{ content }</BlogLayout>
}

export async function getStaticProps( { params} ) {

    const slug = params.blog

    const post = await getEssayContent('published', slug)

    return {
        props: post
    }

}

export async function getStaticPaths() {

    const posts = await getEssaySlugs('published')

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