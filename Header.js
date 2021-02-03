import css from 'styled-jsx/css'

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
            <a href="../">wiha.dev</a>
            <style jsx>{ styles }</style>
        </>
    )
}