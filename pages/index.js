import {
    getEssayMetadata,
} from '../util/writing'

import styles from './index.module.css';

import {
    useEffect,
    useState
} from 'react'

import Hr from '../components/Hr'

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
            <nav className={styles.homepage}>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/newsletter">Newsletter</a></li>
                </ul>
            </nav>
        </header>

        <Hr variant="double" />

        {summaries.map( (md, i) => {
            return (
                <div key={i}>

                        <a href={`/${md.slug}`}>
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

    const summaries = await getEssayMetadata()

    return {
        props: {
            summaries
        }
    }
}