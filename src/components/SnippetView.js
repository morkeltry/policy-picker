import React, { Component } from 'react';
import Snippet from './Snippet';
import policies from '../data/policies.json';
import ModalSnippet from './ModalSnippet';
import ModalInfograph from './ModalInfograph';
import IconSnippet from './IconSnippet';
import voteTypeOf from '../helpers/convert-direction';
import '../css/SnippetView.css';

import Swing from 'react-swing';

class SnippetView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: null,
      megaphone: null,
      bin: null
    };
  }

  arrayOfSnippetComponents = snippets => {
    return Object.keys(snippets)
      .reverse()
      .map(key => {
        const snippet = snippets[key];
        return (
          <div key={key}>
            <Snippet
              title={snippet.title}
              desc={snippet.desc}
              id={snippet.id}
            />
          </div>
        );
      });
  };

  render() {
    const config = {
      allowedDirections: [Swing.DIRECTION.DOWN, Swing.DIRECTION.UP]
    };
    return (
      <div id="viewport">
        <ModalSnippet />
        <ModalInfograph />
        <IconSnippet cssImg="megaphone" />
        <Swing
          config={config}
          className="stack"
          tagName="div"
          setStack={stack => this.setState({ stack: stack })}
          ref="stack"
          throwout={e => {
            e.target.remove();
            let voteObj = {};
            voteObj[e.target.firstChild.id] = voteTypeOf(e.throwDirection);
            this.props.updateSnippetVote(voteObj);
          }}>
          {this.arrayOfSnippetComponents(policies.EC[this.props.currentPolicy].snippets)}
        </Swing>
        <IconSnippet cssImg="bin" />
      </div>
    );
  }
}

export default SnippetView;
