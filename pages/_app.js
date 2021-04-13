import './style.css'
import css from 'styled-jsx/css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    CSSTransition,
} from 'react-transition-group'
import { SwitchTransition } from 'react-transition-group';

function MyApp({ Component, pageProps }) {

    const router = useRouter()
    
    return (
        <SwitchTransition mode='out-in'>
          <CSSTransition key={router.pathname}
          classNames='page' timeout={300}>
            <Component {...pageProps} />
          </CSSTransition>
        </SwitchTransition>
  )
}

export default MyApp
