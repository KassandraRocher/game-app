/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html, css } from 'lit';
import 'fa-icons';
import { Router } from '@vaadin/router';

export class Home extends LitElement {
  static get styles() {
    return css`
      * {
        padding: 0px;
        margin: 0px;
      }
      .home {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        height: 100vh;
        width: 40vw;
      }
      .title {
        font-size: 2.2vw;
        color: #fff;
      }
      .circle .fa-mouse {
        margin: 25% 0 2% 0;
        height: 32px;
        padding: 15px;
        border-radius: 50%;
        background-color: #c987d5;
      }
      .form {
        position: relative;
        top: 5vh;
        width: 22vw;
        height: 3.5rem;
        left: 9vw;
      }
      .input {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border: 2px solid #727172;
        border-radius: 0.3rem;
        font-family: inherit;
        font-size: inherit;
        outline: none;
        padding: 1.25rem;
        background: none;
        color: #fff;
      }
      .input:hover,
      .input:focus {
        border-color: #86c2fa;
      }
      .label {
        position: absolute;
        left: 0.5rem;
        top: 0.8rem;
        padding: 0.2rem 0.55rem;
        color: #919191;
        font-size: 1.2rem;
        cursor: text;
        transition: top 200ms ease-in, left 200ms ease-in,
          font-size 200ms ease-in;
        background-color: black;
      }
      .input:focus ~ .label,
      .input:not(:placeholder-shown).input:not(:focus) ~ .label {
        top: -0.5rem;
        font-size: 0.8rem;
        left: 0.8rem;
        color: #86c2fa;
      }
      .button {
        background-color: #86c2fa;
        width: 22vw;
        margin-top: 12%;
        height: 50px;
        border-radius: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 9vw;
      }
    `;
  }

  render() {
    return html`
      <div class="home">
        <div class="circle">
          <fa-icon class="fas fa-mouse" size="2em"></fa-icon>
        </div>
        <p class="title">Create a new player</p>
        <div class="form">
          <input type="text" class="input" autocomplete="off" placeholder=" " />
          <label class="label">Name *</label>
        </div>
        <div class="button" @click=${() => this.play()}>
          <p>JOIN</p>
        </div>
      </div>
    `;
  }

  play() {
    const name = this.shadowRoot.querySelector('.input').value;
    if (name) {
      Router.go({
        pathname: `/game/${name}`,
      });
    } else {
      // eslint-disable-next-line no-alert
      alert('Introduce un nombre');
    }
  }
}
customElements.define('view-home', Home);
