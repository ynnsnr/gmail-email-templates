/* global chrome */

import React, { Component } from 'react';

class CreateSnippet extends Component {
  handleClick = () => {
    const subject = this.props.composeView.getSubject();
    const message = this.props.composeView.getHTMLContent();
    this.props.createTemplate(subject, message);
  }

  render() {
    return (
      <a className="create" onClick={this.handleClick} tabIndex={this.props.tabIndex} role="button">
        <img src={chrome.runtime.getURL('baseline-add-24px.svg')} alt="Add" />
        Make this draft a Snippet
      </a>
    );
  }
}

export default CreateSnippet;
