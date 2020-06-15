import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useQueryApi } from '../Services/MyBeersService';
import { Chart, BarSeries, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import config from '../config';
import { Paper, Box, Typography } from '@material-ui/core';
import { ArgumentAxis } from '@devexpress/dx-react-chart';
import TopList from '../Components/Generic/TopList/TopList';


const UserDetails = () =>
{
  const [queryState, executeQuery] = useQueryApi()
  const [userData, setUserData] = useState(null);
  const userName = useParams();

  const paperStyle = {
    margin: "1em 0",
    textAlign: 'center'
    
  }

  const getUserRatingData = () => {

    if(queryState.data) {
      const ones = queryState.data.ratings.filter(f => f.overallRating <= 1.5)
      const twos = queryState.data.ratings.filter(f => f.overallRating > 1.5 && f.overallRating <= 2.5 )
      const threes = queryState.data.ratings.filter(f => f.overallRating > 2.5 && f.overallRating <= 3.5 )
      const fours = queryState.data.ratings.filter(f => f.overallRating > 3.5 && f.overallRating <= 4.5 )
      const fives = queryState.data.ratings.filter(f => f.overallRating > 4.5)

      setUserData(
        [
          {"key": "1", "value": ones.length},
          {"key": "2", "value": twos.length},
          {"key": "3", "value": threes.length},
          {"key": "4", "value": fours.length},
          {"key": "5", "value": fives.length}
        ]
      )
    }
    
  }

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/user/alldata?id=${userName.id}`)
  }, [])
  
  useEffect(() => {
    getUserRatingData()
  }, [queryState.data])

  return (
    <div>
      {(userData && queryState.data) &&
        <Box padding=".5em">
          <Paper style={paperStyle}>
            <Typography variant="h6">Rating stats</Typography>
            <Chart data={userData} height={250} >
              <ArgumentAxis />
              <ValueAxis tickSize={1} />
              <BarSeries argumentField="key" valueField="value"/>
            </Chart>
          </Paper>
          <Paper style={paperStyle}>
            <Typography variant="h6">Top list</Typography>
            <TopList data={queryState.data.bestRatedBeer}/>
          </Paper>
          <Paper style={paperStyle}>
            <Typography variant="h6">Bottom list</Typography>
            <TopList data={queryState.data.worstRatedBeer}/>
          </Paper>
        </Box>
      }

    </div>
  )
}

export default UserDetails