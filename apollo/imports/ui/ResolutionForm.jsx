import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

class ResolutionForm extends Component {
  state = {};

  handleSubmit = () => {
    this.props
      .createResolution({
        variables: {
          name: this.name.value,
        },
      }).then( () => {
        this.name.value = ""
      })
      .catch((err) => {
        err && alert(err.message)
      });
  };

  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.name = input)} />
        <button onClick={this.handleSubmit}>Resolution +</button>
      </div>
    );
  }
}

export default graphql(createResolution, {
  name: "createResolution",
  options:{
    refetchQueries:['Resolutions']
  }
})(ResolutionForm);
