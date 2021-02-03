import css from 'styled-jsx/css'

const styles = css`
.stars {
    display: block;
    font-size: 0.9rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-shadow: 0 0 1.5px var(--fg);
    // font-weight: 900;
}
`

export default function Sters() {
    return (
        <>
            <span className="stars">* * *</span>
            <style jsx>{ styles }</style>
        </>
    )
}