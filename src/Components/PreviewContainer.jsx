import React from "react";
import QuestionSlot from "./QuestionSlot";
import { useDrop } from "react-dnd";

function PreviewContainer(props) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "question",
    drop: (item) => {
      const selected = item.id;
      const landingLocation = props.containerIndex;
      props.dropHappened(selected, landingLocation);
    },
  });
  return (
    <div
      ref={drop}
      style={{
        minHeight: "25px",
        width: "100%",
        backgroundColor: "teal",
        border: "3px solid black",
      }}
    >
      <QuestionSlot
        item={props.item}
        name={props.name}
        questionNumber={props.questionNumber}
        setIndex={props.setIndex}
        fixProperties={props.fixProperties}
        addQuestion={props.addQuestion}
        dragIndex={props.containerIndex}
        question={props.question}
      />
    </div>
  );
}

export default PreviewContainer;
