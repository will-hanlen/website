import  Head  from 'next/head'
import Hr from './Hr'
import css from 'styled-jsx/css'

import Link from 'next/link'

const styles = css`

.fancy {
    display: grid;
    width: 100%;
    grid-template-rows: auto;
    grid-template-columns 1fr min(var(--width), 95%) 2fr;
    grid-template-areas: ". content .";
    margin-bottom: 0;
}

article {
    grid-area: content;
}

#top-link {
    margin-top: 0.2rem;
}
`

export default function EssayLayout( { metadata, children } ) {

    const title = metadata.title ? <h1>{ metadata.title }</h1> : null

    const description = metadata.description ? 
        ( <>
            <p>{ metadata.description }</p>
        </> ) :
        null
    
    return (
        <div className="fancy">
            <Head>
                <title>{metadata.title}</title>
            </Head>

            <article>
                <div id="top-link">
                    <Link href="/"><a id="top-link">Homepage</a></Link>
                </div>

                { title }
                { description }

                <Hr variant="double" />

                { children }

                <Hr variant="double" />

                <nav>
                    <ul>
                        <li><Link href="/"><a>Homepage</a></Link></li>
                        <li><Link href="/about"><a>About</a></Link></li>
                        <li><Link href="/newsletter"><a>Newsletter</a></Link></li>
                        <li><Link href="/feedback"><a>Feedback</a></Link></li>
                    </ul>
                </nav>
            </article>
            <style jsx>{styles}</style>
        </div>
    )
}
