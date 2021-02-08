import css from 'styled-jsx/css'

const styles = css`
.stars {
    display: block;
    height: 1rem;
    width: 15rem;
    width: 100%;
    background-image: linear-gradient(
        to bottom,
        transparent 30%,
        var(--fg2) 30%,
        var(--fg2) 40%,
        transparent 40%,
        transparent 60%,
        var(--fg2) 60%,
        var(--fg2) 70%,
        transparent 70%,
        transparent
    );
    margin-top: 2rem;
    margin-bottom: 2rem;
}
`

export default function Sters() {
    return (
        <>
            <span className="stars"></span>
            <style jsx>{ styles }</style>
        </>
    )
}