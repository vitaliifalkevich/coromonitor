import React, { useEffect } from 'react'
import { appExit } from 'helpers'
import { useDoubleTap } from 'use-double-tap'
import Logo from 'components/Logo'
import Spinner from 'components/Spinner'

const TrialScreenOrExpired: React.FC = () => {
  useEffect(() => {
    window.addEventListener('tizenhwkey', appExit, { passive: true })
    return () => {
      window.removeEventListener('tizenhwkey', appExit)
    }
  }, [])
  const onDoubleTap = useDoubleTap(() => {})

  return (
    <div className="ui-page ui-page-active" {...onDoubleTap}>
      <Logo />
    </div>
  )
}

export default TrialScreenOrExpired
