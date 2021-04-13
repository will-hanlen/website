import {
    getEssayMetadata,
} from '../util/writing'

import Link from 'next/link'

import {
    useEffect,
    useState
} from 'react'

import Hr from '../components/Hr'

import Linky from '../components/linker'

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

        <header>
            <nav className="homepage">
                <ul>
                    <li><Linky href="/about">About</Linky></li>
                    <li><Linky href="/newsletter">Newsletter</Linky></li>
                </ul>
            </nav>
        </header>

        <Hr variant="double" />

        {summaries.map( (md, i) => {
            return (
                <div key={i}>

                        <Linky href={`/${md.slug}`}>{md.title}</Linky>
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

    const summaries = await getEssayMetadata()

    return {
        props: {
            summaries
        }
    }
}
