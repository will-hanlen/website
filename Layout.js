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

export default function BlogLayout( { metadata, children } ) {

    const hr = <h2>* * *</h2>

    const title = metadata.title ? <h1>{ metadata.title }</h1> : null

    const date = metadata.date ? <p>Published: { metadata.date}</p> : null

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
                    <a href="../" id="top-link">Homepage</a>
                </div>

                { title }
                { description }
                <Sters />

                { children }

                <Sters />

                <nav>
                    <ul>
                        <li><a href="../">All writing</a></li>
                        <li><a href="/">Homepage</a></li>
                    </ul>
                </nav>
            </article>
            <style jsx>{styles}</style>
        </div>
    )
}