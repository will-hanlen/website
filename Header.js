import css from 'styled-jsx/css'
import HomepageLink from './HomepageLink'

const styles = css`
a {
    margin-top: 0.5rem;
    display: block;
    text-decoration: underline;
}
`

export default function Header() {

    return (
        <>
            <HomepageLink />
            <style jsx>{ styles }</style>
        </>
    )
}