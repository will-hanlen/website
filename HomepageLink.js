import { useEffect, useState } from 'react'

export default function HomepageLink() {
    const [root, setRoot] = useState("localhost")

    useEffect(() => {
        setRoot(window.location.hostname)
    })
    return (
        <a href="../">{root}</a>
    )
}