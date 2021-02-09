import {
    getEssayMetadata
} from '../../util'

import Sters from '../../Sters'

import Head from 'next/head'

export default function H23 ({ drafts, publishedEssays }) {

    return (
        <>
        <Head>
            <title>Drafts &amp; Editing</title>
        </Head>
        <article>


            <header>
                <a href="/writing/">&lt; Back to public site</a>
            </header>

            <h1>Editing Console</h1>
            <p>My writer's station.</p>

            <Sters />

            <table>
                <tr>
                    <th>Title</th>
                    <th>Desc.</th>
                    <th>Last Reviewed</th>
                </tr>
                {  
                    drafts.sort((a, b) => a.title > b.title).map(
                        (draft, index) => {
                        const lastReview = draft.lastReview ? new Date(draft.lastReview) : null
                        return (
                            <tr key={ index }>
                                <td><a href={`/drafts/${draft.slug}`}>{ draft.title }</a></td>
                                <td>{ draft.description ? null : 'X' }</td>
                                <td>{ lastReview ? lastReview.toDateString() : 'X' }</td>
                            </tr>
                        )
                    })
                }
                {  
                    publishedEssays.sort((a, b) => new Date(a.lastReview) > new Date(b.lastReview)).map(
                        (draft, index) => {
                        const lastReview = draft.lastReview ? new Date(draft.lastReview) : null
                        return (
                            <tr key={ index }>
                                <td><a href={`/drafts/${draft.slug}`}>{ draft.title }</a></td>
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

    const drafts = await getEssayMetadata('drafts')
    // const drafts = []

    const publishedEssays = await getEssayMetadata('published')

    return {
        props: {
            drafts,
            publishedEssays
        }
    }
}