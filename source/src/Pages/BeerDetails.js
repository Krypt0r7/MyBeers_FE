import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useQueryApi } from "../Services/MyBeersService";
import config from "../config";
import { ErrorContext } from "../Components/Context/ErrorContext";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Button,
  CircularProgress,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
// import Rating from '@material-ui/lab/Rating';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VerticalLine from "../Components/Generic/VerticalLine";
import { Link } from "react-router-dom";
import AddToListModal from "../Components/BeerDetails/AddToListModal";

const BeerDetails = () => {
  const contentStyle = {
    height: "50vh",
    backgroundSize: "cover",
    marginBottom: "1em",
  };

  const sectionStyle = {
    marginBottom: ".5em",
  };

  const [queryState, executeQuery] = useQueryApi();
  const [listsState, executeListQuery] = useQueryApi();
  const [beer, setBeer] = useState();
  const [addToListModal, setAddToListModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [lists, setLists] = useState(null);
  const { setError } = useContext(ErrorContext);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();

  useEffect(() => {
    executeQuery(
      `${config.myBeerApiUrl}/beer/withLists?id=${id}&userId=${user.id}`
    );
    executeListQuery(
      `${config.myBeerApiUrl}/list/ListsFromUser?UserId=${user.id}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBeer(queryState.data);
    queryState.error && setError(queryState.error.response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryState]);

  useEffect(() => {
    listsState.data && setLists(listsState.data);
  }, [listsState]);

  // const priceFormatter = (price) =>
  // {

  //   if (price.toString().includes('.'))
  //   {
  //     return String(price).split('.').join(':') + '0 kr'
  //   }
  //   return price + " kr";
  // }

  return (
    <>
      {beer ? (
        <Card className="details-card" style={{ position: "relative" }}>
          <CardMedia
            image={
              beer.imageUrl
                ? beer.imageUrl
                : `${process.env.PUBLIC_URL}/beerExampleImage.jpg`
            }
            style={contentStyle}
          ></CardMedia>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography style={sectionStyle} variant="overline">
              {beer.style}
            </Typography>
            <IconButton onClick={(e) => setMenuOpen(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Typography variant="h5">{beer.name}</Typography>
          <Typography style={sectionStyle} variant="caption">
            Brewed in {beer.country}, {beer.state}, {beer.city}
          </Typography>
          <Box
            margin=".5em 0"
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
          >
            {/* <Typography variant="h5">{priceFormatter(beer.price)}</Typography> */}
            <VerticalLine />
            <Typography variant="h5">{beer.volume} ml</Typography>
            <VerticalLine />
            <Typography variant="h5">{beer.alcoholPercentage} %</Typography>
          </Box>
          {/* <Typography style={sectionStyle} variant="body1">{beer.taste}</Typography> */}
          <CardActions>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Button variant="outlined">
                <Link to={`/ratings/${beer.id}`}>See ratings</Link>
              </Button>
              <Button
                onClick={() => setAddToListModal(true)}
                variant="outlined"
                color="primary"
              >
                Add to list
              </Button>
            </Box>
          </CardActions>
        </Card>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="90vh"
        >
          <CircularProgress color="secondary" size="100" />
        </Box>
      )}
      <AddToListModal
        open={addToListModal}
        lists={lists}
        close={setAddToListModal}
      />
      <Menu
        anchorEl={menuOpen}
        open={Boolean(menuOpen)}
        onClose={() => setMenuOpen(null)}
      >
        <MenuItem>
          <Link to={`${id}/edit`}>Propose changes</Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default BeerDetails;
