import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import SortableTree from 'react-sortable-tree';

export default class Tree extends Component {
  constructor(props) {
    console.log('This is props', props);
    super(props);
    this.state = {
      treeData: props.features,
    };
  }

  render() {
    const alertNodeInfo = ({ node, path, treeIndex }) => {
      const objectString = Object.keys(node)
        .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
        .join(',\n  ');

      global.alert('Info passed to the button generator:\n\n' +
      `node: {\n ${objectString}\n}, \n` +
      `path: [${path.join(', ')}],\n` +
      `treeIndex: ${treeIndex}`);
    };
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          generateNodeProps={rowInfo => ({
            onClick: (event) => {
              const collapseClicked = event.target.className === 'rst__collapseButton';
              const expandClicked = event.target.className === 'rst__expandButton';
              if (collapseClicked) {
                Meteor.call('featuresUserPreferences.upsert', this.props.userId, { featureId: rowInfo.node._id, expanded: false });
              }
              if (expandClicked) {
                Meteor.call('featuresUserPreferences.upsert', this.props.userId, { featureId: rowInfo.node._id, expanded: true });
              }
            },
            buttons : [
              <button
                style={{
                  verticalAlign: 'middle',
                }}
                onClick={() => alertNodeInfo(rowInfo)}
              >
                i
              </button>
            ]
          })}
        />
      </div>
    );
  }
}
