import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import ResolutionForm from "./ResolutionForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { withApollo } from "react-apollo";
import GoalForm from "./GoalForm";
import Goal from "./resolutions/Goal";

const App = ({ loading, resolutions, client, user }) => {
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user?._id ? (
        <div>
          <button
            onClick={() => {
              Meteor.logout();
              client.resetStore();
            }}
          >
            Logout
          </button>
          <h1>Resolutions!</h1>
          <ResolutionForm client={client} />
          {resolutions?.map((resolution) => (
            <ul key={resolution._id}>
              <span
                style={{
                  textDecoration: resolution.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {resolution.name}
              </span>
              <ul>
                {resolution.goals?.map((goal) => (
                  <Goal key={goal._id} goal={goal} />
                ))}
              </ul>
              <GoalForm resolutionId={resolution._id} />
            </ul>
          ))}
        </div>
      ) : (
        <div>
          <RegisterForm />
          <LoginForm client={client} />
        </div>
      )}
    </div>
  );
};

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      completed
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
    }
  }
`;

export default graphql(resolutionsQuery, {
  props: ({ data }) => ({ ...data }),
})(withApollo(App));
