import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BaseLayout from '../BaseLayout'
import Viewport from './Viewport'
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync'
import { ServiceProvider } from './../../context/ServiceContext'
import { ErrorBoundary } from 'react-error-boundary'
import './style.scss'
import Iframe from '../Iframe'

const DashboardService = React.lazy(() => import('@dashboard/DashboardService'))
const OrderService = React.lazy(() => import('@order/OrderService'))
const Login = React.lazy(() => import('repoAuth/Login'))

import { auth$ } from 'repoAuth/Auth'

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

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="alert-container" role="alert-container">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button
        onClick={() => {
          window.location.reload()
        }}
      >
        Try again
      </button>
    </div>
  )
}

export default function Shell() {
  const drawer = useDrawer()
  // const navigate = useNavigate()

  useEffect(() => {
    console.log('auth$ ', auth$)
    console.log('LoginService ', Login)
    console.log('DashboardService ', DashboardService)
  }, [])

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <ServiceProvider>
        <BrowserRouter>
          <Viewport>
            <Box display="flex" flex={1}>
              <React.Suspense fallback={'Loading....'}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <BaseLayout>
                        <ErrorBoundary
                          FallbackComponent={ErrorFallback}
                          onReset={() => {
                            // reset the state of your app so the error doesn't happen again
                          }}
                        >
                          <DashboardService />
                        </ErrorBoundary>
                      </BaseLayout>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <BaseLayout abilities={['admin123', 'dev123']}>
                        <ErrorBoundary
                          FallbackComponent={ErrorFallback}
                          onReset={() => {
                            // reset the state of your app so the error doesn't happen again
                          }}
                        >
                          <OrderService />
                        </ErrorBoundary>
                      </BaseLayout>
                    }
                  />
                  <Route
                    path="/nova"
                    element={
                      <BaseLayout abilities={['admin123']}>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                          <Iframe />
                        </ErrorBoundary>
                      </BaseLayout>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </React.Suspense>
            </Box>
          </Viewport>
        </BrowserRouter>
      </ServiceProvider>
    </ErrorBoundary>
  )
}
