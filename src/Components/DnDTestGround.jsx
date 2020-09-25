import React from "react";
import styled from "styled-components";
import Draggable from "../Components/DragAndDrop/Draggable/index";
import Droppable from "../Components/DragAndDrop/Droppable/index";

//ask Jose how this bullshit
const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: center;
`;
const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
`;
const droppableStyle = {
  backgroundColor: "#555",
  width: "250px",
  height: "400px",
  margin: "32px",
};

export default class DndTest extends React.Component {
  render() {
    return (
      <Wrapper>
        <Droppable id="dr1" style={droppableStyle}>
          <Draggable id="Item1" style={{ margin: "8px" }}>
            Text
          </Draggable>
          <Draggable id="Item2" style={{ margin: "8px" }}>
            More Text
          </Draggable>
        </Droppable>

        <Droppable id="dr2" style={droppableStyle}></Droppable>
      </Wrapper>
    );
  }
}
