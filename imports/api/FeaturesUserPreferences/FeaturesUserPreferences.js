import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const FeaturesUserPreferences = new Mongo.Collection('FeaturesUserPreferences');

FeaturesUserPreferences.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

FeaturesUserPreferences.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

FeaturesUserPreferences.schema = new SimpleSchema({
  userId: {
    type: String,
    label: 'UserId of current user',
  },
  featureId: {
    type: String,
    label: '_id of Features collection document parent node',
  },
  expanded: {
    type: Boolean,
    label: 'user preference to save state of expanded parent nodes',
  },
});

FeaturesUserPreferences.attachSchema(FeaturesUserPreferences.schema);

export default FeaturesUserPreferences;
