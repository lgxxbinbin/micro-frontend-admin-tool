import './abc.css'

import {
  Container,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
} from '@material-ui/core'

import React from 'react'
import { orders } from './../RecentOrdersWidget/data'
import { useServiceContext } from '@shell/ServiceContext'
// import ButtonStyle from './style'

import { useBearStore } from '@store/StoreService'

function preventDefault(event) {
  event.preventDefault()
}

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

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
}))

export default function OrderService() {
  const bears = useBearStore((state) => state.bears)
  const increaseBears = useBearStore((state) => state.increaseBears)

  const classes = useStyles()
  const serviceContext = useServiceContext()
  React.useEffect(() => {
    serviceContext.setService({ title: 'Orders' })
  }, [])
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Orders
            </Typography>
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

            <br />
            <br />
            <h1>We have {bears} candy</h1>

            <Button variant="outlined" color="primary" onClick={increaseBears}>
              one up
            </Button>
            {/* <ButtonStyle>test</ButtonStyle> */}
            {/* <div className="test">New com</div> */}
          </Paper>
        </Grid>
      </Container>
    </main>
  )
}
