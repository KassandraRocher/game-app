import { html, fixture, expect } from '@open-wc/testing';
import { spy } from 'sinon';
import '../src/views/Home/Home.js';

describe('Home', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<view-home></view-home>`);
  });

  it('render mouse icon', () => {
    const mouseIcon = element.shadowRoot.querySelector('fa-icon');
    expect(mouseIcon).to.exist;
  });
  it('render input', () => {
    const userInput = element.shadowRoot.querySelector('.input');
    expect(userInput).to.exist;
  });
  it('render button', () => {
    const button = element.shadowRoot.querySelector('.button');
    expect(button).to.exist;
  });
  it('should call play function', () => {
    const play = spy(element, 'play');
    expect(play.called);
  });
});
