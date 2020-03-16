import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import VerticalLine from '../Generic/VerticalLine';
import RatingAverageInSpecific from './RatingAverageInSpecific';

export default ({ ratings }) =>
{
  const [averageRating, setAverageRating] = useState(0);
  const [allRatings, setAllRatings] = useState(
    {
      taste: 0,
      aftertaste: 0,
      chugability: 0,
      value: 0,
      firstImpression: 0,
    }
  )

  useEffect(() =>
  {
    if (ratings.length === 1)
    {
      setAverageRating(ratings[0].overallRating)
    } else
    {

      let average = 0;
      ratings.map(rating => {
        average += rating.overallRating;
      })
      
      setAverageRating(Math.round((average/ ratings.length) * 10) / 10);
    }

    let allRatingsUpdated = { ...allRatings }
    ratings.map((rating) =>
    {
      allRatingsUpdated.taste += rating.taste;
      allRatingsUpdated.aftertaste += rating.afterTaste;
      allRatingsUpdated.chugability += rating.chugability;
      allRatingsUpdated.value += rating.value;
      allRatingsUpdated.firstImpression += rating.firstImpression
    })
    allRatingsUpdated.taste = allRatingsUpdated.taste / ratings.length;
    allRatingsUpdated.aftertaste  = allRatingsUpdated.aftertaste / ratings.length;
    allRatingsUpdated.chugability = allRatingsUpdated.chugability / ratings.length;
    allRatingsUpdated.value = allRatingsUpdated.value / ratings.length;
    allRatingsUpdated.firstImpression = allRatingsUpdated.firstImpression / ratings.length;
    setAllRatings(allRatingsUpdated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {averageRating &&
        <Box width="100%" textAlign="center" marginBottom=".7em">
          <Typography variant="h6" style={{ marginBottom: ".5em" }}>Average ratings</Typography>
          <Box display="flex" justifyContent="space-evenly">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Typography variant="h2">{averageRating}</Typography>
              <Rating size="medium" max={5} precision={0.1} readOnly name="averageRating" value={averageRating} />
              <Typography>{ratings.length}</Typography>
            </Box>
            <VerticalLine />
            <Box width="55vw">
              {allRatings && 
                <Box display="flex" flexDirection="column" marginLeft=".5em">
                  <RatingAverageInSpecific name="Taste" value={allRatings.taste}/>
                  <RatingAverageInSpecific name="After taste" value={allRatings.aftertaste}/>
                  <RatingAverageInSpecific name="Chugability" value={allRatings.chugability}/>
                  <RatingAverageInSpecific name="First impression" value={allRatings.firstImpression}/>
                  <RatingAverageInSpecific name="Value" value={allRatings.value}/>
                </Box>
              }
            </Box>
          </Box>
        </Box>
      }
    </>
  )
}