import React from 'react'
import { AppBar, Container, Toolbar, Typography } from '@mui/material';



const Header = () => {
  return (
      <AppBar position='static'>
          <Container>
            <Toolbar>
                <Typography variant='h4'>
                    React API Demo
                </Typography>
            </Toolbar>
          </Container>          
      </AppBar>
  )
}

export default Header