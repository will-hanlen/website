import './style.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    CSSTransition,
    SwitchTransition 
} from 'react-transition-group'

function MyApp({ Component, pageProps, router }) {

    return (
        <SwitchTransition mode='out-in'>
          <CSSTransition
            key={router.asPath}
            classNames='page'
            onEnter={()=>{
                window.scrollTo(0, 0)
            }
            }
            timeout={300}>
             <Component {...pageProps} />
          </CSSTransition>
        </SwitchTransition>
  )
}

export default MyApp
