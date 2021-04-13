import styles from './flipper.module.css'

export default function Flipper ({ flipping, children }) {

    return (
        <>
            <div className={`
                ${styles.overlay}
                ${flipping ? styles.cool: null}
                `}>
            </div>
            { children }
        </>
    )
}
