import React from 'react'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import { orders } from './data'

import { useFederatedComponent } from './../../hooks/useFederatedComponent'

function Title() {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Recent Orders
    </Typography>
  )
}

function OrderRow(props) {
  return (
    <TableRow key={props.order.id}>
      <TableCell>{props.order.date}</TableCell>
      <TableCell>{props.order.name}</TableCell>
      <TableCell>{props.order.shipTo}</TableCell>
      <TableCell>{props.order.paymentMethod}</TableCell>
      <TableCell align="right">{props.order.amount}</TableCell>
    </TableRow>
  )
}

export default function RecentOrdersWidget() {
  const [{ module, scope, url }, setSystem] = React.useState({})

  function setApp2() {
    setSystem({
      url: 'http://localhost:6400/widget/remoteEntry.js',
      scope: 'widget',
      module: './Widget',
    })
  }

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    url,
    scope,
    module
  )
  console.log('FederatedComponent ', FederatedComponent)
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Title />
      <Box flex={1}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ship To</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Sale Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderRow order={order} key={order.id} />
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box mt={3}>
        <Button color="primary" onClick={setApp2}>
          Open widget
        </Button>
      </Box>

      <div style={{ marginTop: '2em' }}>
        <React.Suspense fallback="Loading System">
          {errorLoading
            ? `Error loading module "${module}"`
            : FederatedComponent && <FederatedComponent />}
        </React.Suspense>
      </div>
    </Box>
  )
}
