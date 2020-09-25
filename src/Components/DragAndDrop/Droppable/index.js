import React from "react";
import PropTypes from "prop-types";

export default class Droppable extends React.Component {
  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    e.target.appendChild(document.getElementById(data));
  };

  allowDrop = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div
        style={this.props.style}
        id={this.props.id}
        onDragOver={this.allowDrop}
        onDrop={this.drop}
      >
        {this.props.children}
      </div>
    );
  }
}

Droppable.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
