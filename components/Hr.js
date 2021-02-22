import style from './Hr.module.css'

export default function Wally({variant}) {
    if (variant == "double") {
        return (
            <>
                <hr className={style.double}></hr>
            </>
        )
    }
    return <hr className={style.single}></hr>
}