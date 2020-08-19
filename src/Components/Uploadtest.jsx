import React, { useState } from "react";
import axios from "axios";
function Uploadtest(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("testName", selectedFile);
    axios
      .post("/api/imgTest/uploadfile", fd)
      .then((res) => console.log(res.statusText, "this is res"));
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
      <input name="testName" type="file" onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Upload</button>
    </div>
  );
}

export default Uploadtest;
