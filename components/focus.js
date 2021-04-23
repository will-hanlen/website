import style from './focus.module.css'


export default function Focus() {

    const t2 = `
a weak man is not good for staying out of a fight
the strong who steal from the weak are not strong
`

    const text = `
efficiency degrades you unless balanced by beauty.

beauty deceives you unless balanced by efficiency.

every virtue is a sin without its counter balance.

`

    return (
	    <div className={style.cont}>
	    <code className={style.c}><pre>
	    { text }
	</pre></code></div>
    )
}
