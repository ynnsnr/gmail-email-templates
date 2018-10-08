import React from 'react';
import Template from './template';

const TemplateList = (props) => {
  return (
    <ul>
      {
        props.templates.map((template, index) =>
          (
            <Template
              key={template.id}
              template={template}
              tabIndex={index}
              composeView={props.composeView}
              removeTemplate={props.removeTemplate}
              editing={props.editing}
            />
          )
        )
      }
    </ul>
  );
};

export default TemplateList;
