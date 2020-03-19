import React, { useEffect } from 'react'
import { Typography, Card } from '@material-ui/core'
import { useQueryApi } from '../Services/MyBeersService'
import config from '../config'
import TopList from '../Components/Index/TopList'

export default () =>
{

  const [querryState, executeQuery] = useQueryApi(true)

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/beer/best`);
  }, [])

  return (
    <div>
      <Card className="cardMargin">
        <Typography className="text-center" variant="h5">The best of the best</Typography>
        <TopList data={querryState.data}/>
      </Card>
    </div>
  )
}