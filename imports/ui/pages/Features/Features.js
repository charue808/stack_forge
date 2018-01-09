import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { Table, Alert, Button } from 'react-bootstrap';
// import { getTreeFromFlatData } from 'react-sortable-tree';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
// import { Bert } from 'meteor/themeteorchef:bert';
import FeaturesCollection from '../../../api/Features/Features';
import Loading from '../../components/Loading/Loading';
import Tree from '../../components/Tree/Tree';

import './Features.scss';

const Features = ({ loading, features }) => (!loading ? (
  <div className="Features">
    <div className="page-header clearfix">
      <h4>Features</h4>
    </div>
    <Tree features={features} />
  </div>
) : <Loading />);

Features.propTypes = {
  loading: PropTypes.bool.isRequired,
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('features');
  return {
    loading: !subscription.ready(),
    features: FeaturesCollection.find().fetch(),
  };
})(Features);
