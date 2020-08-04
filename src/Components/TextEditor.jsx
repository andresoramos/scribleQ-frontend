import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor(props) {
  const handleEditorChange = (content, editor) => {
    props.changeQuestion(content);
  };

  return (
    <Editor
      apiKey="azhtw07duepqjg6pkppxh0hxrmna7jrezo4jws3e47kklf24"
      outputFormat="html"
      initialValue={props.initialValue}
      init={{
        height: 250,
        width: "60%",
        menubar: false,

        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help",
      }}
      onEditorChange={handleEditorChange}
    />
  );
}
