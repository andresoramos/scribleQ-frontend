import React from "react";
import htmlToText from "../Services/htmlToText";
import { useDrag } from "react-dnd";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";

function QuestionSlot(props) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "question", id: props.dragIndex },
    begin: () => {
      props.fixProperties([["currentIndex", props.dragIndex]]);
    },
    collect: (monitor) => ({
      isDragging: () => {},
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
        localStorage.setItem("divPressed", "true");
        setTimeout(() => {
          props.setIndex(props.item.i);
        }, 500);
      }}
      ref={drag}
      style={{ minHeight: "25px", width: "100%", background: "red" }}
    >
      {props.question === ""
        ? null
        : `${props.questionNumber}) ${cutQuestion(props.question)}`}
      {props.question === "" || props.name === "" ? null : (
        <Button
          onClick={() => {
            setTimeout(() => {
              localStorage.setItem("divPressed", "false");
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
