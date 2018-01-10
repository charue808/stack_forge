import React from 'react';
import PropTypes from 'prop-types';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import FeaturesCollection from '../../../api/Features/Features';
import FeaturesUserPreferencesCollection from '../../../api/FeaturesUserPreferences/FeaturesUserPreferences';
import Loading from '../../components/Loading/Loading';
import Tree from '../../components/Tree/Tree';

import './Features.scss';

const Features = ({ loading, features, authenticatedId }) => (!loading ? (
  <div className="Features">
    <div className="page-header clearfix">
      <h4>Features</h4>
    </div>
    <Tree features={features} userId={authenticatedId} />
  </div>
) : <Loading />);

Features.propTypes = {
  loading: PropTypes.bool.isRequired,
  authenticatedId: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(() => {
  const featuresHandle = Meteor.subscribe('features');
  const featuresUserPreferencesHandle = Meteor.subscribe('featuresUserPreferences');
  const loading = !featuresHandle.ready() && !featuresUserPreferencesHandle.ready();
  const featuresExist = !loading;
  const authenticatedId = Meteor.userId();

  const flatTreeData = FeaturesCollection.find({}, {
    transform: (treeNode) => {
      console.log('Looking for node: ', treeNode);
      let expandedNode = FeaturesUserPreferencesCollection.findOne({ userId: authenticatedId, featureId: treeNode._id, expanded: true });

      if (expandedNode) {
        treeNode.expanded = true;
      } else {
        console.log('did not find expanded node');
      }

      return treeNode;
    },
  }).fetch();

  return {
    loading,
    featuresExist,
    authenticatedId,
    features: featuresExist ? (getTreeFromFlatData(
      {
        flatData: flatTreeData,
        getKey: node => node._id,
        getParentKey: node => node.parent,
        rootKey: null,
      },
    )) : [],
  };
})(Features);
