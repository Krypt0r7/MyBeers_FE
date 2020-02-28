import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import VerticalLine from '../Generic/VerticalLine';
import RatingSummaryLine from './RatingSummaryLine';

export default ({ ratings }) =>
{
  const [averageRating, setAverageRating] = useState(0);
  const [allRatings, setAllRatings] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })

  useEffect(() =>
  {
    if (ratings.length === 1) {
      setAverageRating(ratings[0].overallRating)
    }else{
      const average = ratings.reduce((a, b) => a.overallRating + b.overallRating ) / ratings.length
      setAverageRating(average);
    }

    let allRatingsUpdated = {...allRatings}
    ratings.map(rating => allRatingsUpdated[rating.overallRating]++)
    setAllRatings(allRatingsUpdated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {averageRating &&

        <Box width="100%" textAlign="center" marginBottom=".7em">
          <Typography variant="h6" style={{marginBottom: ".5em"}}>Rating and reviews</Typography>
          <Box display="flex" justifyContent="space-evenly">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Typography variant="h2">{averageRating}</Typography>
              <Rating name="averageRating" value={averageRating} />
              <Typography>{ratings.length}</Typography>
            </Box>
            <VerticalLine />
            <Box width="50vw" display="flex" flexDirection="column" justifyContent="space-between">
              {allRatings && Object.keys(allRatings).map(rating => (
                  <RatingSummaryLine key={rating} value={allRatings[rating] / ratings.length} number={rating} />
              ))
              }
            </Box>
          </Box>
        </Box>
      }
    </>
  )
}