import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class GoalForm extends Component {
  state = {};

  handleSubmit = () => {
    this.props
      .createGoal({
        variables: {
          name: this.name.value,
          resolutionId: this.props.resolutionId,
        },
      })
      .then(() => {
        this.name.value = "";
      })
      .catch((err) => {
        err && alert(err.message);
      });
  };

  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.name = input)} />
        <button onClick={this.handleSubmit}>Goal +</button>
      </div>
    );
  }
}

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`;

export default graphql(createGoal, {
  name: "createGoal",
  options: {
    refetchQueries: ["Resolutions"],
  },
})(GoalForm);
