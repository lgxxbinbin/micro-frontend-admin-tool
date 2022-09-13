import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '../AppBar'
import AppDrawer from './../AppDrawer'
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync'
import { auth$ } from '@auth/Auth'

function useDrawer() {
  const { value, setItem } = useLocalStorageSync('admin-tools/appdrawer/open')

  return {
    open: value,
    closeDrawer() {
      setItem(false)
    },
    openDrawer() {
      setItem(true)
    },
  }
}

const BaseLayout = (props) => {
  const { children } = props
  const drawer = useDrawer()
  const navigate = useNavigate()

  useEffect(() => {
    const sub = auth$.subscribe(({ sessionToken }) => {
      console.log(' BaseLayout sessionToken ', sessionToken)
      const needsLogin = !sessionToken

      if (needsLogin) {
        console.log('here ')
        navigate('/login', { replace: true })
      } else if (!needsLogin && window.location.pathname === '/login') {
        navigate('/', { replace: true })
      }
    })

    return () => sub.unsubscribe()
  }, [])

  return (
    <>
      <AppBar drawer={drawer} />
      <AppDrawer drawer={drawer} />
      {children}
    </>
  )
}

export default BaseLayout
