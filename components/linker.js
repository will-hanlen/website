import Link from 'next/link'

export default function Linky({href, children}) {
    return (
        <Link
            href={href}
            scroll={ false }
        >
            <a>{ children }</a>
        </Link>
    )
}
