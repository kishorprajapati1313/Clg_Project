import React from 'react'
import Catproduct from './Cat-product'
import Saleproduct from './Sale-product'
import Viewprodcuct from './View-prodcuct'
import { Container } from '@mui/system'
// import Saleproduct from '../TestingofUIs/Pages/Component/Saleproduct'

const Feed = () => {
  return (
    <>
      <Container sx={{ mb:"100px"}}>
        <Catproduct />
        <Saleproduct />

        {/* 3D_MODEL SALE PRODUCT */}
        {/* <Saleproduct /> */}
        <Viewprodcuct />
      </Container >
    </> 
  )
}

export default Feed