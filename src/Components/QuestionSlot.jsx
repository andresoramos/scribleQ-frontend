import React from "react";
import htmlToText from "../Services/htmlToText";
import { useDrag } from "react-dnd";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";

function QuestionSlot(props) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "question", id: props.dragIndex },
    collect: (monitor) => ({
      isDragging: () => {
        console.log("dragging");
      },
    }),
  });

  const cutQuestion = (htmlQuestion) => {
    const question = htmlToText(htmlQuestion);
    let count = 0;
    let cutWord = "";
    for (var i = 0; i < question.length; i++) {
      if (count > 15) {
        cutWord += "...";
        break;
      }
      count += 1;
      cutWord += question[i];
    }
    return cutWord;
  };
  return (
    <div
      onClick={() => {
        // localStorage.setItem("divPressed", "true");
        console.log("The outer div ran");
        props.setIndex(props.item.i);
      }}
      ref={drag}
      style={{ minHeight: "25px", width: "100%", background: "red" }}
    >
      {props.question === "" ? null : cutQuestion(props.question)}
      {props.question === "" ? null : (
        <Button
          onClick={() => {
            // localStorage.setItem("divPressed", "false");
            setTimeout(() => {
              console.log("The button ran");
            }, 0);
            props.addQuestion(props.item.i);
          }}
          component={AddCircleOutlineIcon}
        />
      )}
    </div>
  );
}

export default QuestionSlot;
