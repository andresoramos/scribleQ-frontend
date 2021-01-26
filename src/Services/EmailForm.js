import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      name: "TEST_NAME",
      email: "",
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.sendFeedback = this.sendFeedback.bind(this);
  }

  render() {
    return (
      <form className="test-mailing">
        <h1>Let's see if it works</h1>
        <div>
          <textarea
            id="test-mailing"
            name="test-mailing"
            onChange={this.handleChange}
            placeholder="Post some lorem ipsum here"
            required
            value={this.state.feedback}
            style={{ width: "100%", height: "150px" }}
          />
        </div>
        <input
          type="button"
          value="Submit"
          className="btn btn--submit"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}
