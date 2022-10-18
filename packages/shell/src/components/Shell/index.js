import React from 'react'
import { Box } from '@material-ui/core'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BaseLayout from '../BaseLayout'
import Viewport from './Viewport'
import { ServiceProvider } from './../../context/ServiceContext'
import { ErrorFallback } from '../ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'
import './style.scss'
import Iframe from '../Iframe'

const DashboardService = React.lazy(() => import('@dashboard/DashboardService'))
const OrderService = React.lazy(() => import('@order/OrderService'))
const Login = React.lazy(() => import('@auth/Login'))

export default function Shell() {
  return (
    <ErrorBoundary key="app-root" FallbackComponent={ErrorFallback}>
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
                          key="/"
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
                          key="/orders"
                          FallbackComponent={ErrorFallback}
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
                        <ErrorBoundary
                          FallbackComponent={ErrorFallback}
                          key="/nova"
                        >
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
