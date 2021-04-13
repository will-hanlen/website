import './style.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Flipper from '../components/flipper'
import { PageTransition } from 'next-page-transitions'

function MyApp({ Component, pageProps }) {

    const [flipping, setFlipping] = useState(false)

    const router = useRouter()

    useEffect(() => {
    const handleRouteChangeStart = (url, { shallow }) => {
        setFlipping(true)
    }

    const handleRouteChangeEnd = (url, { shallow }) => {
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
        //<Flipper flipping={flipping}>
        <>
        <PageTransition timeout={300} classNames="page-transition">
            <Component {...pageProps} key={router.route}/>
        </PageTransition>
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style>
        </>
        //</Flipper>
    )
}

export default MyApp
