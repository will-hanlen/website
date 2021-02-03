import css from 'styled-jsx/css'
import Sters from './Sters'
import HomepageLink from './HomepageLink'

const styles = css`

`

export default function Footer() {
    return (
        <>
            <HomepageLink />
            <Sters/>
            <style jsx>{ styles }</style>
        </>
    )
}