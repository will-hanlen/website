import BlogLayout from '../Layout'
import Sters from '../Sters'

export default function Newsletter() {
    const metadata = {
        title: "Newsletter",
        description: "A periodical update of ideas I've refined, drafts I'm working on, and interesting ideas that I've found."
    }
    return (
        <BlogLayout metadata={metadata}>
            {/* <h1>Newsletter</h1>
            <p>{metadata.description}</p> */}

            <h2>Subscribe</h2>
            <p>Well I haven't actually built this part yet...</p>
            <p>It's coming 'soon,' I promise. It will also include subscribe via RSS.</p>

            <h2>Newsletter Archive</h2>
            <p>Yeah... I haven't written any yet.</p>
        
        </BlogLayout>

    )
}