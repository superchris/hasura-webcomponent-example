import gql from 'graphql-tag'
import { ApolloMutation } from '@apollo-elements/lit-apollo';
import { html, LitElement } from 'lit-element';
import client from './client';

// Compute graphql documents statically for performance
const mutation = gql`
mutation($airplane: airplanes_insert_input!) {
  insert_airplanes(objects: [$airplane]) {
    returning {
      id
    }
  }
}
`;

class NewAirplaneForm extends ApolloMutation {
  render() {
    return html`
      <form @submit="${this.onSubmit}">
        <label>Registration number: <input name="registration_number"/></label>
        <label>Make: <input name="make"/></label>
        <label>Model: <input name="model"/></label>
        <input type="submit" value="Save" />
      </form>
    `;
  }

  get registrationNumber() {
    return this.shadowRoot.querySelector('input[name=registration_number]').value;
  }

  get model() {
    return this.shadowRoot.querySelector('input[name=model]').value;
  }

  get make() {
    return this.shadowRoot.querySelector('input[name=make]').value;
  }

  onCompletedMutation(response) {
    console.log(response);
  }

  onMutationError(error) {
    console.error(error);
  }

  onSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    const variables = {
      airplane: {
        model: this.model,
        make: this.make,
        registration_number: this.registrationNumber,
      }
    }
    this.mutate({
      variables
    });
    return false;
  }

  constructor() {
    super();
    this.client = client;
    this.mutation = mutation;
  }
};

export default NewAirplaneForm