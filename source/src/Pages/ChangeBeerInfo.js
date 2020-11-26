import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useQueryApi } from "../Services/MyBeersService";
import config from "../config";
import {
  Card,
  TextField,
  Box,
  AppBar,
  Tabs,
  Tab,
  Typography,
  CardHeader,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SystemetMoreInfo from "../Components/ChangeBeerInfo/SystemetMoreInfo";
import AddContainerModal from "../Components/ChangeBeerInfo/AddContainerModal";
import { useMyBeersCommandApi } from "../Services/MyBeersService";
import * as moment from "moment";

const ChangeBeerInfo = () => {
  const history = useHistory();
  const [queryState, executeQuery] = useQueryApi();
  const { myBeersState ,executeCommand } = useMyBeersCommandApi();
  const [beer, setBeer] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [addContainerModal, setAddContainerModal] = useState(false);
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const rowStyle = {
    margin: "0 .5em 0 0",
  };

  useEffect(() => {
    executeQuery(`${config.myBeerApiUrl}/beer/beer?id=${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setBeer(queryState.data);
  }, [queryState]);

  const handleProposalSend = () => {
    const payload = {
      userId: user.id,
      beerId: id,
      beerData: beer,
    };
    executeCommand(`${config.myBeerApiUrl}/beer/changeRequest`, payload);
    if (myBeersState.data) {
      history.goBack()
    }
  };

  const handleIndexChange = (value) => {
    setTabIndex(value);
  };

  const handleImageChange = (value) => {
    let fr = new FileReader();

    fr.readAsDataURL(value);
    fr.addEventListener("load", (e) => {
      const string = e.target.result;
      setBeer({ ...beer, image: string, imageUrl: string });
    });
  };

  const handlePropertyChange = (value, name) => {
    setBeer({ ...beer, [name]: value });
  };

  const imageStyle = {
    width: "150px",
    maxWidth: "200px",
    height: "auto",
  };

  const handleAddContainer = () => {
    const theArray = [
      ...beer.containers,
      {
        price: 0,
        productIdFromSystemet: 0,
        productionScale: "",
        recycleFee: 0,
        sellStartDate: new Date("yyyy-MM-dd"),
        type: "New",
        volume: 0,
        ypk: 0,
      },
    ];
    setBeer({ ...beer, containers: theArray });
  };

  const handleDeleteContainer = (type) => {
    const theArray = beer.containers.filter((c) => c.type !== type);
    setBeer({ ...beer, containers: theArray });
    setTabIndex(0);
  };

  const handleContainerPropertyChange = (value, name, index) => {
    const theObject = { ...beer.containers[index], [name]: value };
    const theArray = [...beer.containers];
    theArray.splice(index, 1, theObject);
    setBeer({ ...beer, containers: theArray });
  };

  const calculateYpk = (vol, alc, kr) => {
    const ypk = (vol * alc) / 40 / kr;
    return ypk.toFixed(2);
  };

  if (beer == null) return null;

  return (
    <>
      <Card style={{ margin: ".5em" }}>
        <CardHeader
          title={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5">Basics</Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={handleProposalSend}
              >
                Send proposal
              </Button>
            </Box>
          }
        />
        <Box padding=".5em">
          <Box marginBottom="1em" display="flex">
            <TextField
              style={rowStyle}
              label="Name"
              value={beer.name}
              fullWidth
              onChange={(e) => handlePropertyChange(e.target.value, "name")}
            />
            <TextField
              label="Producer"
              value={beer.producer}
              fullWidth
              onChange={(e) => handlePropertyChange(e.target.value, "producer")}
            />
          </Box>
          <Box marginBottom="1em" display="flex">
            <TextField
              style={rowStyle}
              label="Country"
              fullWidth
              value={beer.country}
              onChange={(e) => handlePropertyChange(e.target.value, "country")}
            />
            <TextField
              label="State"
              fullWidth
              value={beer.state}
              onChange={(e) => handlePropertyChange(e.target.value, "state")}
            />
          </Box>
          <Box marginBottom="1em" display="flex">
            <TextField
              style={rowStyle}
              label="City"
              fullWidth
              value={beer.city}
              onChange={(e) => handlePropertyChange(e.target.value, "city")}
            />
            <TextField
              type="number"
              label="Alcohol precentage"
              value={beer.alcoholPercentage}
              fullWidth
              onChange={(e) =>
                handlePropertyChange(e.target.value, "alcoholPercentage")
              }
            />
          </Box>
          <Box marginBottom="1em">
            <TextField
              style={rowStyle}
              fullWidth
              label="Type"
              value={beer.type}
              onChange={(e) => handlePropertyChange(e.target.value, "type")}
            />
          </Box>
          <Box marginBottom="1em">
            <TextField
              style={rowStyle}
              fullWidth
              label="Style"
              value={beer.style}
              onChange={(e) => handlePropertyChange(e.target.value, "style")}
            />
          </Box>
          <Box marginBottom="1em"></Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img
              style={imageStyle}
              alt="beer"
              src={
                beer.imageUrl
                  ? beer.imageUrl
                  : `${process.env.PUBLIC_URL}/no-photo-available.jpg`
              }
            />
            <Button
              style={{ height: "40px" }}
              variant="contained"
              component="label"
            >
              Upload image
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </Button>
          </Box>
        </Box>
      </Card>
      <Card style={{ margin: ".5em" }}>
        <CardHeader
          title={
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">Containers</Typography>
              <Button variant="outlined" onClick={handleAddContainer}>
                Add container
              </Button>
            </Box>
          }
        />
        <Box padding=".5em">
          <div>
            <AppBar position="static" color="default">
              <Tabs indicatorColor="primary" value={tabIndex}>
                {beer.containers.map((c, index) => (
                  <Tab
                    key={index}
                    value={index}
                    label={c.type}
                    onClick={() => handleIndexChange(index)}
                  />
                ))}
              </Tabs>
            </AppBar>
            {beer.containers.map(
              (c, index) =>
                tabIndex === index && (
                  <div key={index}>
                    <Box margin="1em 0">
                      <Box marginBottom="1em" display="flex">
                        <TextField
                          style={rowStyle}
                          label="Type"
                          value={c.type}
                          fullWidth
                          onChange={(e) =>
                            handleContainerPropertyChange(
                              e.target.value,
                              "type",
                              index
                            )
                          }
                        />
                        <TextField
                          label="Volume"
                          value={c.volume}
                          type="number"
                          fullWidth
                          onChange={(e) =>
                            handleContainerPropertyChange(
                              e.target.value,
                              "volume",
                              index
                            )
                          }
                        />
                      </Box>
                      <Box marginBottom="1em" display="flex">
                        <TextField
                          style={rowStyle}
                          label="Price"
                          fullWidth
                          type="number"
                          value={c.price}
                          onChange={(e) =>
                            handleContainerPropertyChange(
                              e.target.value,
                              "price",
                              index
                            )
                          }
                        />
                        <TextField
                          label="Recycle fee"
                          value={c.recycleFee}
                          fullWidth
                          type="number"
                          onChange={(e) =>
                            handleContainerPropertyChange(
                              e.target.value,
                              "recycleFee",
                              index
                            )
                          }
                        />
                      </Box>
                      <Box
                        display="flex"
                        alignItems="baseline"
                        marginBottom="1em"
                      >
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          style={{ marginRight: ".5em" }}
                          label="Sell start date"
                          value={moment(c.sellStartDate).format("YYYY-MM-DD")}
                          type="date"
                          fullWidth
                          onChange={(e) =>
                            handleContainerPropertyChange(
                              e.target.value,
                              "sellStartDate",
                              index
                            )
                          }
                        />
                        <TextField
                          title="YPK"
                          disabled
                          fullWidth
                          value={calculateYpk(
                            c.volume,
                            beer.alcoholPercentage,
                            c.price
                          )}
                        />
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={() => handleDeleteContainer(c.type)}
                    >
                      Delete container
                    </Button>
                  </div>
                )
            )}
          </div>
        </Box>
      </Card>

      <Card style={{ margin: ".5em" }}>
        <CardHeader
          title={
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">More info</Typography>
              <Button variant="outlined">
                {beer.moreInformationModel ? "Update info" : "Generate info"}
              </Button>
            </Box>
          }
        />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Information from systembolaget</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SystemetMoreInfo data={beer.moreInformationModel} />
          </AccordionDetails>
        </Accordion>
      </Card>
      <AddContainerModal
        handleCLose={() => setAddContainerModal(false)}
        handleSave={handleAddContainer}
        open={addContainerModal}
      />
    </>
  );
};

export default ChangeBeerInfo;
