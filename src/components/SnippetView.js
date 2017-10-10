import React, { Component } from 'react';
import Snippet from './Snippet';
import policies from '../data/policies.json';

import '../css/SnippetView.css';

import Swing from 'react-swing';

class SnippetView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: null,
    };
  }

  arrayOfSnippetComponents = snippets => {
    return Object.keys(snippets).map(key => {
      const snippet = snippets[key];
      return (
        <div key={key}>
          <Snippet title={snippet.title} desc={snippet.desc} id={snippet.id} />
        </div>
      );
    });
  };

  render() {
    const config = {
      minThrowOutDistance: 300,
      maxThrowOutDistance: 10000,
      allowedDirections: [Swing.DIRECTION.DOWN, Swing.DIRECTION.UP]
    };
    return (
      <div id="viewport">
        <Swing
          config={config}
          className="stack"
          tagName="div"
          setStack={stack => this.setState({ stack: stack })}
          ref="stack"
          throwout = { (e)=> {
            console.log(e);
            e.target.remove();
            let voteObj = {};
            voteObj[e.target.firstChild.id] = e.throwDirection;
            this.props.updateSnippetVote(voteObj)
          }}
        >
        {this.arrayOfSnippetComponents(policies.EC[1].snippets)}
        </Swing>
      </div>
    );
  }
}

export default SnippetView;
