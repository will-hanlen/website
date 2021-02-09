import css from 'styled-jsx/css'

const styles = css`
.stars {
    --hr-line-width: 9%;
    --hr-line-gap: 12%;

    --l1-start: calc(50% - var(--hr-line-gap) - var(--hr-line-width));
    --l1-end: calc(50% - var(--hr-line-gap));

    --l2-start: calc(50% + var(--hr-line-gap));
    --l2-end: calc(50% + var(--hr-line-gap) + var(--hr-line-width));

    display: block;
    height: 1rem;
    width: 15rem;
    width: 100%;
    background-image: linear-gradient(
        to bottom,
        transparent 0%,
        transparent var(--l1-start),
        var(--fg2) var(--l1-start),
        var(--fg2) var(--l1-end),
        transparent var(--l1-end),
        transparent var(--l2-start),
        var(--fg2) var(--l2-start),
        var(--fg2) var(--l2-end),
        transparent var(--l2-end),
        transparent 100%
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