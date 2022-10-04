import React, { useState, useLayoutEffect } from 'react'
import './style.scss'
import { auth$, login } from '../Auth'
import Loader from '../Loader'
import { useServiceContext } from '@shell/ServiceContext'
import TextField from '@material-ui/core/TextField'
import {
  createStyles,
  makeStyles,
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      alignItems: 'flex-end',

      '& .MuiTextField-root': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
      },
    },
  })
)

function Login(props) {
  const classes = useStyles()

  const theme = createTheme({
    palette: {
      primary: green,
    },
  })

  const [pending, setPending] = useState(false)
  const [error, setError] = useState()
  const serviceContext = useServiceContext()

  useLayoutEffect(() => {
    serviceContext.setService({ title: 'Login' })

    let timeout
    const sub = auth$.subscribe(({ pending, error, sessionToken }) => {
      const needsLogin = !sessionToken

      if (!needsLogin && window.location.pathname === '/login') {
        window.location.replace('/')
      }
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
    login(username.value, password.value).then((user) => {
      console.log('after login success ', user)
      user.sessionToken && window.location.replace('/')
    })
  }

  return (
    <div className="container">
      <form
        name="login"
        className={`login-form ${classes.root}`}
        onSubmit={onSubmit}
      >
        <ThemeProvider theme={theme}>
          <TextField
            id="username"
            required
            label="Username"
            variant="outlined"
          />

          <TextField
            required
            id="password"
            type="password"
            label="Password"
            variant="outlined"
          />
        </ThemeProvider>

        {/* <label htmlFor="username">Username</label> */}
        {/* <input id="username" className="custom-input" type="text" required /> */}
        {/* <label htmlFor="password">Password</label>
        <input
          id="password"
          className="custom-input"
          type="password"
          required
        /> */}
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

export default Login
