import { Meteor } from 'meteor/meteor';
import FeaturesUserPreferences from '../FeaturesUserPreferences';

Meteor.publish('featuresUserPreferences', function publishAllFeaturesUserPreferences() {
  return FeaturesUserPreferences.find({});
});
