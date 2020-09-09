import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  root: {
    objectFit: "cover",
    display: "flex",
    justifyContent: "center",
    // width: 500,
    // width: 500,
  },
  media: {
    maxWidth: 500,
    maxHeight: 500,
    objectFit: "cover",
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <img
        className={classes.media}
        src={props.imgAddress}
        alt="uploadedImage"
      />
    </Card>
  );
}
