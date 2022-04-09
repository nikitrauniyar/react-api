import { Box, Container, Grid, Link } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <footer style={{ position: "absolute", bottom: 0, width: "100%", height: "100px", backgroundColor:"#2b2d2f", color:"white", padding:"10px"}}>
      <Container>
        
        <center>Tech Used - React.js and Material UI</center>
        <center>Add and Delete Functionality can be Verified at last page</center>
        <center>Made by 
          <Link 
            href="https://nikitrauniyar.com.au"
            style={{
              textDecoration:"none",
              fontWeight:"bold"
              
            }}
          > Nikit Rauniyar
          </Link>
        </center>
      </Container>

    </footer>
  )
}

export default Footer