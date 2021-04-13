import './style.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Flipper from '../components/flipper'

function MyApp({ Component, pageProps }) {

    const [flipping, setFlipping] = useState(false)

    const router = useRouter()

    useEffect(() => {
    const handleRouteChangeStart = (url, { shallow }) => {
        console.log("start")
        setFlipping(true)
    }

    const handleRouteChangeEnd = (url, { shallow }) => {
      console.log("done")
        setFlipping(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
        router.events.off('routeChangeStart', handleRouteChangeStart)
        router.events.off('routeChangeComplete', handleRouteChangeEnd)
    }
  }, [])
    
    return (
        <Flipper flipping={flipping}>
            <Component {...pageProps} />
        </Flipper>
    )
}

export default MyApp
