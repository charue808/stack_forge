import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Features = new Mongo.Collection('Features');

Features.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Features.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Features.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of this feature',
  },
  subtitle: {
    type: String,
    label: 'The subtitle of this feature',
  },
  detail: {
    type: String,
    label: 'The detailed description of this feature',
  },
  parent: {
    type: String,
    label: 'parent title if child node, else null if parent/root node',
    optional: true,
  },
  nodeType: {
    type: String,
    label: 'Type of feature',
  },
});

Features.attachSchema(Features.schema);

export default Features;
