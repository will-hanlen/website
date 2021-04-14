import {
    getEssaySlugs,
    getEssayContent,
} from '../util/writing'

import Linky from '../components/linker'
import Quote from '../components/quote'
import Hr from '../components/Hr'

import hydrate from 'next-mdx-remote/hydrate'

import EssayLayout from '../components/EssayLayout'

export default function Blog ( { metadata, mdxSource } ) {

    const components = {
        a: ({href, children}) => <Linky href={href}>{children}</Linky>,
        blockquote: ({children}) => {
            if (Array.isArray(children)) {
                console.log(children.slice(-1)[0].props.children)
                const authorName = children.slice(-1)[0].props.children
                if (!Array.isArray(authorName)) {
                    children = children.slice(0, -1)
                    return (
                        <Quote author={authorName}>{ children }</Quote>
                    )
                }
            }
            return (
                <Quote>{ children } </Quote>
            )
        },
        hr: () => <Hr />,
    }

    const content = hydrate(mdxSource, {components})

    return <EssayLayout metadata={metadata} >{ content }</EssayLayout>
}

export async function getStaticProps( { params} ) {

    const slug = params.blog

    const post = await getEssayContent(slug)

    return {
        props: post
    }

}

export async function getStaticPaths() {

    const posts = await getEssaySlugs()

    const paths = posts.map( post => {
        return { 
            params: { 
                blog: post
            }
        }
    })
    
    return {
        paths,
        fallback: false,
    }
}
