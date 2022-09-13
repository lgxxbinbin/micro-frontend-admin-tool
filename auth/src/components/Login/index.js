import React, { useState, useEffect } from 'react'
import './style.scss'
import { auth$, login } from '../Auth'
import Loader from '../Loader'
import { useServiceContext } from '@shell/ServiceContext'

export default function Login(props) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState()
  const serviceContext = useServiceContext()

  console.log(' auth$', auth$)
  console.log('login 123', login)

  useEffect(() => {
    serviceContext.setService({ title: 'Login' })

    let timeout
    const sub = auth$.subscribe(({ pending, error, ...rest }) => {
      console.log('pending ', pending)
      console.log('...rest  ', rest)

      console.log('error ', error)
      // redirecting to /home when logged in will be done in the navbar. Cohesive code FTW!
      setPending(pending)
      setError(error)
      timeout = setTimeout(() => {
        setError()
      }, 2000)
    })
    return () => {
      clearInterval(timeout)
      sub.unsubscribe()
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const { username, password } = document.forms.login.elements
    login(username.value, password.value)
  }

  return (
    <div>
      <form name="login" className="login-form" onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" required />
        <div>
          <button type="submit" className="submit" disabled={pending}>
            {pending ? <Loader /> : 'Submit'}
          </button>
        </div>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  )
}
