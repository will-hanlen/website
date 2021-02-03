import  Head  from 'next/head'
import Sters from './Sters'
import Footer from './Footer'
import Header from './Header'

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
        <>
            <Head>
                <title>{metadata.title}</title>
            </Head>

            <article>
                <Header />

                { title }
                { description }
                <Sters />
                <div>
                    { children }
                </div>
                <Sters />
                { date }
                <Footer/>
            </article>
        </>
    )
}