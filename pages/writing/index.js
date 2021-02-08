import {
    getSummaries,
} from '../../util'

import {
    useEffect,
    useState
} from 'react'

import Sters from '../../Sters'

import Head from 'next/head'

export default function H23 ( {summaries}) {
    const [root, setRoot] = useState("ok")
    useEffect(() => {
        setRoot(window.location.hostname)
    })
    return (
        <>
        <Head>
            <title>Writing</title>
        </Head>
        <article>

        <h1>Writing</h1>
        <p>My summary of life, and how to live it.</p>
        <Sters/>
        {summaries.map( (md, i) => {
            return (
                <div key={i}>

                        <a href={`/writing/${md.slug}`}>
                            {/* <em>{md.title}</em> */}
                            {md.title}
                        </a>
                    <p>
                        {md.description}
                        </p>
                </div>
            )
        })}
        </article>
        </>
    )
}

export async function getStaticProps() {

    const summaries = await getSummaries()

    return {
        props: {
            summaries
        }
    }
}