import {
    getEssayMetadata
} from '../util/writing'

import Hr from '../components/Hr'

import Head from 'next/head'

export default function H23 ({ essays }) {

    return (
        <>
        <Head>
            <title>Drafts &amp; Editing</title>
        </Head>
        <article>


            <header>
                <a href="/">&lt; Back to public site</a>
            </header>

            <h1>Editing Console</h1>
            <p>My writer's station.</p>

            <Hr />

            <table>
                <tr>
                    <th>Title</th>
                    <th>Desc.</th>
                    <th>Last Reviewed</th>
                </tr>
                {  
                    essays.sort((a, b) => a.slug > b.slug).map(
                        (draft, index) => {
                        const lastReview = draft.lastReview ? new Date(draft.lastReview) : null
                        return (
                            <tr key={ index }>
                                <td><a href={`/${draft.slug}`}>{ draft.title }</a></td>
                                <td>{ draft.description ? null : 'X' }</td>
                                <td>{ lastReview ? lastReview.toDateString() : 'X' }</td>
                            </tr>
                        )
                    })
                }
            </table>

        </article>
        </>
    )
}

export async function getStaticProps() {

    const essays = await getEssayMetadata('drafts')

    return {
        props: {
            essays,
        }
    }
}