import { LitElement, html } from 'lit-element';

class AirplaneApp extends LitElement {
  render() {
    return html`
    <airplane-list></airplane-list>
    <new-airplane-form></new-airplane-form>
    `;
  }
}

export default AirplaneApp;