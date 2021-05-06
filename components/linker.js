import Link from 'next/link'

export default function Linky({href, id, children}) {

    if (!href) {
	return <p>what?</p>
    }
    
    return (
        <Link
        href={href}
	id={id}
            scroll={ false }
        >
            <a id={id} >{ children }</a>
        </Link>
    )
}
