import React from "react";
import BasicModal from "../Generic/BasicModal/BasicModal";
import { CardContent, Card, Box, TextField } from "@material-ui/core";

const AddContainerModal = ({ open, handleCLose, handleSave }) => {
  return (
    <BasicModal
      open={open}
      backAction={handleCLose}
      fullScreen
      handleClose={handleSave}
      title="Add container"
      handleSave={handleSave}
    >
      <Box padding=".5em">
          <Card>
              <CardContent>
                <TextField title="Type"/>
                <TextField title="Volume"/>
                <TextField title="Type"/>
                <TextField title="Type"/>
              </CardContent>
          </Card>
      </Box>
    </BasicModal>
  );
};

export default AddContainerModal;
