import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import PictureCard from "./PictureCard";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

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

function Upload(props) {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);

  const [imgAddress, setImgAddress] = useState(null);
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append("file", selectedFile);

    const postTest = await axios.post("/api/imgTest/uploadfile", fd);
    // .then((res) => console.log(res.statusText, "this is res"));
    const fileName = postTest.data.filename;

    setImgAddress(fileName);
    props.imgName(fileName, props.indexVal);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <br></br>
      <Input type={"file"} name={"file"} onChange={fileSelectedHandler} />
      <br></br>
      <Button onClick={fileUploadHandler}>Upload</Button>
      <br></br>
      {imgAddress === null ? null : <PictureCard imgAddress={imgAddress} />}
    </div>
  );
}

export default Upload;
