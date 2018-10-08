/* global chrome */

import React, { Component } from 'react';

class Template extends Component {
  handleClick = () => {
    this.props.composeView.setSubject(this.props.template.subject);
    this.props.composeView.setBodyHTML(this.props.template.message);
  }

  delete = () => {
    this.props.removeTemplate(this.props.template.id);
  }

  renderControls = () => {
    if (this.props.editing) {
      return (
        <a onClick={this.delete} tabIndex={this.props.tabIndex} role="button">
          <img src={chrome.runtime.getURL('baseline-close-24px.svg')} alt="Close" />
        </a>
      );
    }
    return null;
  }

  render() {
    return (
      <li id="template">
        <a onClick={this.handleClick} tabIndex={this.props.tabIndex} role="button" >
          <span className="subject">
            {this.props.template.subject.length > 12 ?
              this.props.template.subject.substr(0, 12).concat('...') :
              this.props.template.subject}
          </span>
          <span className="message">{this.props.template.message.substr(0, 23)}...</span>
        </a>
        {this.renderControls()}
      </li>
    );
  }
}

export default Template;
