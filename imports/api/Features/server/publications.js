import { Meteor } from 'meteor/meteor';
import Features from '../Features';

// disregard linting errors, arrow function do not work with publish method
Meteor.publish('features', function publishAllFeatures() {
  return Features.find({});
});
