/* eslint-disable no-else-return */
/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { handPaper, handRock, handScissors, signOut } from '../../../sources/constants.js'

export class Game extends LitElement {
  static get styles() {
    return css`
      * {
        padding: 0px;
        margin: 0px;
      }
      .result {
        margin-top: 5vh;
        font-size: 5.5vh;
        color: white;
      }
      .game {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        height: 100vh;
        width: 35vw;
      }
      .header {
        padding: 2.5vh;
        background-color: #232123;
        color: #fff;
        display: flex;
        font-size: 4vh;
        justify-content: space-between;
      }
      .score {
        margin: 10vh 0 5vh 0;
        color: white;
        font-size: 5.5vh;
      }
      .hands {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .background {
        background-color: #86c2fa;
        font-size: 5vh;
        transition: background-color 1s;
      }
      .paper {
        padding: 1.3vh 2.5vh 1.3vh 2.5vh;
      }
      .rock {
        padding: 2vh;
        border-right: 0.5vh solid #5aa2e2;
        border-radius: 10px 0 0 10px;
      }
      .scissors {
        padding: 2vh;
        border-left: 0.5vh solid #5aa2e2;
        border-radius: 0 10px 10px 0;
      }
      .background fa-icon {
        padding: 2vh 5vh 2vh 5vh;
      }
      .sign-out {
        cursor: pointer;
      }
      .disabled {
        border: 0px;
        background-color: #232123;
        color: #646364;
        transition: background-color 1s;
        transition: color 1s;
        transition: border 1s;
        pointer-events: auto;
        cursor: not-allowed;
      }

      .fa-sign-out-alt{
        width: 1.3em;
      }

      .fa-hand-rock, .fa-hand-paper, .fa-hand-scissors{
        width: 2em;
        padding: 10px;
      }
    `;
  }

  static get properties() {
    return {
      score: { type: Number },
    };
  }

  constructor() {
    super();
    this.score = 0;
  }

  render() {
    return html` <div class="game">
      <div class="header">
        <div>Hi ${window.location.pathname.split('/').pop()}</div>
        <div class="sign-out" @click=${() => this.signOut()}>
          <img
              
            alt="signOut"
            src="${signOut}"
            class="fas fa-sign-out-alt"
          />
        </div>
      </div>
      <p class="score">Score: ${this.score}</p>
      <div class="hands">
        <div class="background rock" @click=${() => this.chooseUser('rock')}>
          <img
            alt="handRock"
            src="${handRock}"
            class="far fa-hand-rock"
          />
        </div>
        <div class="background paper" @click=${() => this.chooseUser('paper')}>
        <img
            alt="handPaper"
            src="${handPaper}"
            class="far fa-hand-paper"
          />
        </div>
        <div
          class="background scissors"
          @click=${() => this.chooseUser('scissors')}
        >
        <img
            alt="handScissors"
            src="${handScissors}"
            class="far fa-hand-scissors"
          />
        </div>
      </div>
      <p class="result"></p>
    </div>`;
  }

  // eslint-disable-next-line class-methods-use-this
  chooseBot() {
    return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
  }

  chooseUser(option) {
    if (this.score < 0) this.score = 0;
    if (option) {
      const bot = this.chooseBot();
      this.changeColors('grey');
      const text = this.shadowRoot.querySelector('.result');
      text.innerHTML = `You: ${option} - ...`;
      setTimeout(() => {
        text.innerHTML = `You: ${option} - Bot: ${bot} <br> ${this.chooseWinner(
          option,
          bot
        )}`;
        this.changeColors('default');
      }, 1500);
    }
  }

  // eslint-disable-next-line consistent-return
  chooseWinner(user, bot) {
    const result = ["It's a tie", 'You win!', 'You lose!'];
    if (user === bot) {
      return result[0];
    } else if (user === 'rock') {
      if (bot === 'paper') {
        // eslint-disable-next-line no-plusplus
        this.score--;
        return result[2];
      }
      if (bot === 'scissors') {
        // eslint-disable-next-line no-plusplus
        this.score++;
        return result[1];
      }
    } else if (user === 'paper') {
      if (bot === 'scissors') {
        // eslint-disable-next-line no-plusplus
        this.score--;
        return result[2];
      }
      if (bot === 'rock') {
        // eslint-disable-next-line no-plusplus
        this.score++;
        return result[1];
      }
    } else if (user === 'scissors') {
      if (bot === 'rock') {
        // eslint-disable-next-line no-plusplus
        this.score--;
        return result[2];
      }
      if (bot === 'paper') {
        // eslint-disable-next-line no-plusplus
        this.score++;
        return result[1];
      }
    }
  }

  changeColors(option) {
    if (option === 'grey') {
      Object.values(this.shadowRoot.querySelectorAll('.background')).map(
        color => color.classList.add('disabled')
      );
    } else {
      Object.values(this.shadowRoot.querySelectorAll('.background')).map(
        color => color.classList.remove('disabled')
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  signOut() {
    Router.go({
      pathname: `/`,
    });
  }
}
customElements.define('view-game', Game);
