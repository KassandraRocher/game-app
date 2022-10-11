import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";

import "./views/Home/Home.js";
import "./views/Game/Game.js";

export class GameApp extends LitElement {
  static get styles() {
    return css`
      main {
        background-color: black;
      }
    `;
  }

  firstUpdated() {
    const router = new Router(this.renderRoot.querySelector("main"));
    router.setRoutes([
      { path: "/", component: "view-home"},
      { path: "/game/:name", component: "view-game"},
    ]);
  }

  render() {
    return html` <main></main> `;
  }
}
