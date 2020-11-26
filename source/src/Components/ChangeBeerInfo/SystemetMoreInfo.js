import React from 'react'
import SystemetProps from './SystemetProps'
import { Box } from '@material-ui/core'

const SystemetMoreInfo = ({data}) => {
  if (!data) return null 
  
  return (
    <Box>
      <SystemetProps title='Alcohol precentage' value={data.alcoholPercentage} />
      <SystemetProps title='Assortment' value={data.assortment} />
      <SystemetProps title='Assortment Text' value={data.assortmentText} />
      <SystemetProps title='Beverage Description Short' value={data.beverageDescriptionShort} />
      <SystemetProps title='Category' value={data.category} />
      <SystemetProps title='Country' value={data.country} />
      <SystemetProps title='Origin Level 1' value={data.originLevel1} />
      <SystemetProps title='Origin Level 2' value={data.originLevel2} />
      <SystemetProps title='Producer Name' value={data.producerName} />
      <SystemetProps title='Product Id' value={data.productId} />
      <SystemetProps title='Product Name Bold' value={data.productNameBold} />
      <SystemetProps title='Product Name Thin' value={data.productNameThin} />
      <SystemetProps title='Product Number' value={data.productNumber} />
      <SystemetProps title='Product Number Short' value={data.productNumberShort} />
      <SystemetProps title='Style' value={data.style} />
      <SystemetProps title='Sub Category' value={data.subCategory} />
      <SystemetProps title='Supplier Name' value={data.supplierName} />
      <SystemetProps title='Taste' value={data.taste} />
      <SystemetProps title='Type' value={data.type} />
      <SystemetProps title='Usage' value={data.usage} />
      <SystemetProps title='Vintage' value={data.vintage} />
    </Box>
  )
}

export default SystemetMoreInfo