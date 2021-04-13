import styles from './flipper.module.css'
import { useState } from 'react'

export default function Flipper ({ flipping, children }) {

    return (
        <>
            <div className={`
                ${styles.overlay}
                `}>
            </div>
            { children }
        </>
    )
}
