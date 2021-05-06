import style from './focus.module.css'


export default function Poem() {

    const text = `
- efficiency corrupts without beauty -
- beauty decieves without efficiency -
- true virtue necessitates opposites -
`

    return (
	<div className={style.cont}>
	    <code className={style.c}>
	    <pre>
	        { text }
	    </pre>
	    </code>
	</div>
    )
}
