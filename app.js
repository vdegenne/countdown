import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-formfield';
import '@material/mwc-radio';
import '@material/mwc-snackbar';

import {css, html, LitElement} from 'lit-element';
import {nothing} from 'lit-html';


class AppContainer extends LitElement {
  static get properties() {
    return {
      startValue: {type: Number},
      _countdown: {type: Number},
    };
  }

  constructor() {
    super();
    this.startValue = 10;

    this.bell = new Audio('bell.wav');
  }

  static get styles() {
    return [css`
    :host {
      /* height: 100vh; */
      display: flex;
      flex-direction: column;
      /* justify-content: center; */
      /* align-items: center; */
      max-width: 500px;
      margin: 0 auto;
      padding: 10px;

      --mdc-theme-primary: black;

      font-family: Roboto;
    }

    #feedback {
      display: flex;
      /* justify-content: center; */
      align-items: baseline;
      font-size: 120%;
      padding: 50px 0 50px 10px;
    }
    #feedback > b {
      font-size: 120%;
      margin:0 8px 0 0;
    }
  `]
  }

  render() {
    return html`
    <mwc-textfield
      type=number
      label=time
      value=${this.startValue}
      @change=${e => this.startValue = e.target.value}
      step=1
      autofocus>
    </mwc-textfield>

    <div style="margin:10px">
      <mwc-formfield label="seconds">
        <mwc-radio></mwc-radio>
      </mwc-formfield>
      <mwc-formfield label="minutes">
        <mwc-radio checked></mwc-radio>
      </mwc-formfield>
    </div>

    <mwc-button raised
        @click=${this.onStartButtonClick}>
      start
    </mwc-button>

    <div id="feedback">
    ${
        this._countdown ? html`<b>${this._countdown}</b> ticks remaining` :
                          nothing}
    </div>

    <mwc-snackbar></mwc-snackbar>
    `
  }

  onStartButtonClick() {
    this._countdown = this.startValue;
    const formfield =
        this.shadowRoot.querySelector('mwc-radio[checked]').parentElement;
    if (formfield.label === 'minutes') {
      this._countdown *= 60;
    }

    let interval = setInterval(() => {
      this._countdown -= 1;
      if (this._countdown === 0) {
        this.bell.play();
        this.openSnackbar('gucci 👍');
        clearInterval(interval);
      }
    }, 1000);
  }

  openSnackbar(message) {
    const snackbar = this.shadowRoot.querySelector('mwc-snackbar');
    snackbar.labelText = message;
    snackbar.open();
  }
}

window.customElements.define('app-container', AppContainer);