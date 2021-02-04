import {
    getSummaries,
} from '../util'

import {
    useEffect,
    useState
} from 'react'

import Sters from '../Sters'

export default function H23 ( {summaries}) {
    const [root, setRoot] = useState()
    useEffect(() => {
        setRoot(window.location.hostname)
    })
    return (
        <article>

        <h1>{root}</h1>
        <p>My summary of life, and how to live it.</p>
        <Sters/>
        {summaries.map( (md, i) => {
            return (
                <div key={i}>

                    <a href={md.slug}>{md.title}</a>
                    <p className="date">{md.date}</p>
                    <p>{md.description}</p>
                </div>
            )
        })}
        </article>
    )
}

export async function getStaticProps() {

    const summaries = await getSummaries()

    console.log(summaries)

    return {
        props: {
            summaries
        }
    }
}