import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AppBar from '../AppBar'
import AppDrawer from './../AppDrawer'
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync'
import { auth$ } from 'repoAuth/Auth'
import useAuthCheck from '../../hooks/useAuthCheck'

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
  const { children, abilities = [] } = props
  const drawer = useDrawer()
  const navigate = useNavigate()

  React.useEffect(() => {
    const sub = auth$.subscribe(({ sessionToken }) => {
      const needsLogin = !sessionToken
      console.log('useEffect ', sessionToken)
      if (needsLogin) navigate('/login', { replace: true })
    })

    return () => sub.unsubscribe()
  }, [])

  const token = auth$._value.sessionToken
  const auth = useAuthCheck(abilities, token)

  if (!token) return <Navigate to="/login" replace />

  if (!auth) return <Navigate to="/" replace />

  return (
    <>
      <AppBar drawer={drawer} />
      <AppDrawer drawer={drawer} />
      {children}
    </>
  )
}

export default BaseLayout
