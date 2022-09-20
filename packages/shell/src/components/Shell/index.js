import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BaseLayout from '../BaseLayout'
import Viewport from './Viewport'
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync'
import { ServiceProvider } from './../../context/ServiceContext'

const DashboardService = React.lazy(() => import('@dashboard/DashboardService'))
const OrderService = React.lazy(() => import('@order/OrderService'))
const Login = React.lazy(() => import('@auth/Login'))

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

export default function Shell() {
  const drawer = useDrawer()

  useEffect(() => {
    console.log('auth$ ', auth$)
    console.log('LoginService ', Login)
    console.log('DashboardService ', DashboardService)
  }, [])

  return (
    <ServiceProvider>
      <BrowserRouter>
        <Viewport>
          <Box display="flex" flex={1}>
            <React.Suspense fallback={'Loading'}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <BaseLayout>
                      <DashboardService />
                    </BaseLayout>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <BaseLayout>
                      <OrderService />
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
  )
}
