/* global chrome */

import uuidv4 from 'uuid';
import React, { Component } from 'react';
import TemplateList from './template_list';
import CreateSnippet from './create_snippet';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: [],
      editing: false
    };
  }

  componentWillMount() {
    chrome.storage.sync.get(['templates'], (result) => {
      if (result.templates) {
        this.loadTemplates(result);
      } else {
        chrome.storage.local.get(['templates'], (resultLocal) => {
          if (resultLocal.templates) {
            this.loadTemplates(resultLocal);
          }
        });
      }
    });
  }

  loadTemplates = (result) => {
    const templates = JSON.parse(result.templates);
    this.setState({ templates });
  }

  updateTemplates = (templates) => {
    this.setState({ templates });
    const serializedTemplates = JSON.stringify(templates);
    chrome.storage.sync.set({ templates: serializedTemplates });
    chrome.storage.local.set({ templates: serializedTemplates });
  }

  createTemplate = (subject, message) => {
    const newTemplate = { id: uuidv4(), subject, message };
    const templates = [...this.state.templates, newTemplate];
    this.updateTemplates(templates);
  }

  removeTemplate = (id) => {
    const templates = this.state.templates.filter(i => i.id !== id);
    this.updateTemplates(templates);
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  render() {
    return (
      <div className="dropdown">
        <p>Personal Snippets</p>
        <TemplateList
          composeView={this.props.composeView}
          templates={this.state.templates}
          removeTemplate={this.removeTemplate}
          editing={this.state.editing}
        />
        <div className="edit">
          <CreateSnippet
            composeView={this.props.composeView}
            createTemplate={this.createTemplate}
            tabIndex={this.state.templates.length}
          />
          <a className="manage" onClick={this.toggleEdit} tabIndex={this.state.templates.length + 1} role="button">
            <img src={chrome.runtime.getURL('baseline-settings-20px.svg')} alt="" />
            { this.state.editing ? "I'm done!" : 'Manage Snippets' }
          </a>
        </div>
      </div>
    );
  }
}

export default App;
