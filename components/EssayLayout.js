import  Head  from 'next/head'
import Hr from './Hr'
import css from 'styled-jsx/css'



export default function EssayLayout( { metadata, children } ) {

    const title = metadata.title ? <h1>{ metadata.title }</h1> : null

    const description = metadata.description ? 
        ( <>
            <p>{ metadata.description }</p>
        </> ) :
        null

    return (
        <div>
                <Head>
                    <title>{metadata.title}</title>
                </Head>

                <article>
                        { title }

                        { children }


                </article>
        </div>
    )
}
