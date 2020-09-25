import React from "react";
import PropTypes from "prop-types";

export default class Draggable extends React.Component {
  drag = (e) => {
    e.dataTransfer.setData("transfer", e.target.id);
    const data = e.dataTransfer.getData("transfer");
    e.target.appendChild(document.getElementById(data));
  };

  noAllowDrop = (e) => {
    e.stopPropagation();
  };
  render() {
    return (
      <div
        style={this.props.style}
        id={this.props.id}
        draggable={"true"}
        onDragStart={this.drag}
        onDragOver={this.noAllowDrop}
      >
        {this.props.children}
      </div>
    );
  }
}

Draggable.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
