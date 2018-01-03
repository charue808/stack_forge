import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import FeaturesUserPreferences from './FeaturesUserPreferences';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'featuresUserPreferences.upsert': function featuresUserPreferencesUpsert(usrId, prefs) {
    check(usrId, String);
    check(prefs, {
      featureId: String,
      expanded: Boolean,
    });

    if (!usrId) {
      throw new Meteor.Error('unauthorized');
    }

    FeaturesUserPreferences.upsert({ userId: usrId }, { $set: prefs });

    return true;
  },
});

rateLimit({
  methods: [
    'featuresUserPreferences.upsert',
  ],
  limit: 5,
  timeRange: 1000,
});
