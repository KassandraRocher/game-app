import { html, fixture, expect } from '@open-wc/testing';
import { spy } from 'sinon';
import '../src/views/Game/Game.js';

describe('Game', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<view-game></view-game>`);
  });

  it('render header', () => {
    const header = element.shadowRoot.querySelector('.header');
    expect(header).to.exist;
  });
  it('render hands icons', () => {
    const hands = element.shadowRoot.querySelector('.hands');
    expect(hands).to.exist;
  });
  it('the user should click an option and execute the function chooseUser', () => {
    element.shadowRoot.querySelector('.rock').click();
    expect(spy(element, 'chooseUser').calledWith('rock'));
  });
  it('should call the chooseBot method when the user chooses', () => {
    element.shadowRoot.querySelector('.paper').click();
    expect(spy(element, 'chooseUser').calledWith('paper'));
    expect(spy(element, 'chooseBot').called);
  });
  it('should call the choose Winner method when the player and bot choices are ready', () => {
    element.shadowRoot.querySelector('.scissors').click();
    expect(spy(element, 'chooseUser').calledWith('scissors'));
    expect(spy(element, 'chooseBot').called);
    expect(spy(element, 'chooseWinner').called);
  });
  it('should call play function', () => {
    element.shadowRoot.querySelector('.sign-out').click();
    const signOut = spy(element, 'signOut');
    expect(signOut.called);
  });
});
