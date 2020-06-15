import React, { useEffect } from 'react'
import { Typography, Card } from '@material-ui/core'
import { useQueryApi } from '../Services/MyBeersService'
import config from '../config'
import TopList from '../Components/Generic/TopList/TopList'
import ProgressCircle from '../Components/Generic/ProgressCircle'

export default () =>
{

  const [querryState, executeQuery] = useQueryApi(true)

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/beer/bestworst`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Card className="cardMargin">
        <Typography className="text-center" variant="h5">The best of the best</Typography>
        {querryState.data &&
          <TopList data={querryState.data.bestBeer}/>
        }
      </Card>
      <Card className="cardMargin">
        <Typography className="text-center" variant="h5">The worst of the worst</Typography>
        {querryState.data &&
          <TopList data={querryState.data.worstBeer} />
        } 
      </Card>
      <ProgressCircle show={querryState.loading} />
    </div>
  )
}