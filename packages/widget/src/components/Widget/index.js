import React from 'react'
import { Typography } from '@material-ui/core'
// import { Button } from '@lgxxbinbin/template-react-component-library'
import { NVButton } from 'nova-ui-kit'

export default function Widget() {
  return (
    <div>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        App widget
      </Typography>
      <NVButton variant="outlined"> New Button</NVButton>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit
        est a vehicula pellentesque. Nunc vitae pulvinar est, sed ultricies
        justo. Phasellus pulvinar leo at dignissim scelerisque. Nam porttitor
        arcu a eleifend consequat. Maecenas eget turpis mi. Vestibulum faucibus
        quis orci sit amet cursus. Maecenas elementum sapien lobortis lacus
        rutrum faucibus. Mauris placerat tincidunt odio, sit amet tincidunt sem
        ultricies eu. Nam pretium nisi ut vestibulum commodo. Nunc ullamcorper
        tortor turpis, eget lobortis nisl congue ut. Interdum et malesuada fames
        ac ante ipsum primis in faucibus. Maecenas mattis auctor commodo.
        <br />{' '}
      </p>
    </div>
  )
}
