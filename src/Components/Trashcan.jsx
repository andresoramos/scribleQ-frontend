import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDrop } from "react-dnd";

function Trashcan({
  findQuestion,
  newDisplayArray,
  fixProperties,
  questionOut,
  name,
  ...props
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "question",
    drop: (item) => {
      props.deleteQuestion(
        item.id,
        findQuestion,
        newDisplayArray,
        fixProperties,
        questionOut,
        name
      );
    },
  });
  return (
    <DeleteForeverIcon
      ref={drop}
      fontSize="large"
      style={{ marginTop: "10em" }}
    />
  );
}

export default Trashcan;
