import styles from './quote.module.css'

export default function Quote({ author, children }) {
    return (
        <blockquote>
            { children }
            <p className={ styles.author }>{ author ? ` - ${author}` : `` }</p>
        </blockquote>
    )
}
