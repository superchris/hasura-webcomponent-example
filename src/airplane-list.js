import gql from 'graphql-tag'
import { ApolloSubscription } from '@apollo-elements/lit-apollo';
import { html } from 'lit-element';
import client from './client';

// Compute graphql documents statically for performance
const subscription = gql`
subscription {
  airplanes {
    registration_number
    make
    model
  }
}
`;

class AirplaneApp extends ApolloSubscription {
  render() {
    const { data, error, loading } = this;
    return (
        loading ? html`
          <what-spin></what-spin>`
      : error ? html`
          <h1>blah</h1>
          <div>${error ? error.message : 'Unknown Error'}</div>`
      : html`
        <ul>
          ${this.data.airplanes.map((airplane) => html`
            <li>${airplane.registration_number} - ${airplane.make} ${airplane.model}</li>
          `)}
        </ul>
      `
    );
   }

   constructor() {
     super();
     this.client = client;
     this.subscription = subscription;
   }
};

export default AirplaneApp