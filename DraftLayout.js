import  Head  from 'next/head'
import Sters from './Sters'
import Header from './Header'
import css from 'styled-jsx/css'

const styles = css`

.fancy {
    display: grid;
    width: 100%;
    grid-template-rows: auto;
    grid-template-columns 1fr min(var(--width), 95%) 2fr;
    grid-template-areas: "dummy content d2";
}

article {
    grid-area: content;
}

#top-link {
    margin-top: 0.2rem;
}


`

export default function DraftLayout( { metadata, children } ) {

    const title = metadata.title

    const description = metadata.description ? 
        ( <>
            <p>{ metadata.description }</p>
            {/* <Sters /> */}
        </> ) :
        null
    
    

    return (
        <div className="fancy">
            <Head>
                <title>{metadata.title}</title>
            </Head>

            <article>
                <div id="top-link">
                    <a href="/drafts" id="top-link">Back to console</a>
                </div>

                <p><strong>&lt; &lt; Draft &gt; &gt;</strong></p>

                <h1>{ title }</h1>
                { description }
                <Sters />

                { children }

                <Sters />

                <nav>
                    <ul>
                        <li><a href="../">All writing</a></li>
                        <li><a href="/">Homepage</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </nav>
            </article>
            <style jsx>{styles}</style>
        </div>
    )
}