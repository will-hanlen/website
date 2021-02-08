import css from 'styled-jsx/css'
import HomepageLink from './HomepageLink'

const styles = css`
.linkers {
    display: block;
    margin-top: 0.3rem;
}
`

export default function Header() {

    return (
        <>
            <div className="linkers">
                <HomepageLink className="linkers" />
            </div>
            <style jsx>{ styles }</style>
        </>
    )
}