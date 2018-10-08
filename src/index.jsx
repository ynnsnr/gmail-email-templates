/* global InboxSDK, chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';

InboxSDK.load(1, 'sdk_basic-templates_ff7b2af477').then((sdk) => {
  sdk.Compose.registerComposeViewHandler((composeView) => {
    composeView.addButton({
      title: "Personal Snippets",
      iconUrl: chrome.runtime.getURL('list-256x256.png'),
      hasDropdown: true,
      onClick: (event) => {
        ReactDOM.render(<App composeView={event.composeView} />, event.dropdown.el);
      }
    });
  });
});
