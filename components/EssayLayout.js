import  Head  from 'next/head'
import Hr from './Hr'
import css from 'styled-jsx/css'

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
                    <a href="../" id="top-link">Homepage</a>
                </div>

                { title }
                { description }

                <Hr variant="double" />

                { children }

                <Hr variant="double" />

                <nav>
                    <ul>
                        <li><a href="/">Homepage</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/newsletter">Newsletter</a></li>
                        <li><a href="/feedback">Feedback</a></li>
                    </ul>
                </nav>
            </article>
            <style jsx>{styles}</style>
        </div>
    )
}