import { Container, Grid, makeStyles, Button } from '@material-ui/core'
import React from 'react'
import Widget from './../components/Widget'
import { useServiceContext } from '@shell/ServiceContext'
import ButtonStyle from './style'
import './test.style.scss'
import './abc.css'

import RecentOrders from '../components/RecentOrdersWidget'

// const RecentOrders = React.lazy(() => import('@order/RecentOrdersWidget'))

import { useBearStore } from '@store/StoreService'

const RecentOrderWidget = () => (
  <Widget>
    <RecentOrders />
  </Widget>
)

// const SalesDepositsWidget = () => (
//   <Widget height="240px">
//     <SalesDeposits />
//   </Widget>
// )

// const SalesTodayWidget = () => (
//   <Widget height="240px">
//     <SalesToday />
//   </Widget>
// )

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
}))

export default function Dashboard() {
  const bears = useBearStore((state) => state.bears)
  const increaseBears = useBearStore((state) => state.increaseBears)
  const removeAllBears = useBearStore((state) => state.removeAllBears)

  const classes = useStyles()
  const serviceContext = useServiceContext()
  React.useEffect(() => {
    serviceContext.setService({ title: 'Dashboard' })
  }, [])

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={8} lg={9}>
            <SalesTodayWidget />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <SalesDepositsWidget />
          </Grid> */}
          <Grid item xs={12}>
            <RecentOrderWidget />

            <br />
            <br />
            <h1>We have {bears} candy</h1>

            <Button variant="outlined" color="primary" onClick={increaseBears}>
              one up
            </Button>
            <Button variant="outlined" color="primary" onClick={removeAllBears}>
              clear
            </Button>
            {/* <iframe src="https://platform.twitter.com/widgets/tweet_button.html"></iframe> */}
            {/* <ButtonStyle>test 2</ButtonStyle>
            <div className="test">Test </div> */}
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}
