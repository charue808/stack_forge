import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: props.features,
    };
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
