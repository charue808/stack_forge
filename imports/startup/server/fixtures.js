import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/Documents/Documents';
import Features from '../../api/Features/Features';

const documentsSeed = userId => ({
  collection: Documents,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 5,
  model(dataIndex) {
    return {
      owner: userId,
      title: `Document #${dataIndex + 1}`,
      body: `This is the body of document #${dataIndex + 1}`,
    };
  },
});

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {
        first: 'Andy',
        last: 'Warhol',
      },
    },
    roles: ['admin'],
    data(userId) {
      return documentsSeed(userId);
    },
  }],
  modelCount: 5,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user+${userCount}@test.com`,
      password: 'password',
      profile: {
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
      },
      roles: ['user'],
      data(userId) {
        return documentsSeed(userId);
      },
    };
  },
});

const treeData = [
  {
    title: 'Dog', subtitle: 'Main type', detail: 'Animal genus', parent: null, nodeType: 'Feature Dog',
  },
  {
    title: 'Shiba Inu', subtitle: 'Doge coin', detail: 'much cool', parent: null, nodeType: 'Feature Dog',
  },
];

treeData.forEach((doc) => {
  const docExists = Features.findOne({ title: doc.title });
  if (!docExists) {
    if (doc.title === 'Shiba Inu') {
      doc.parent = Features.findOne({ title: 'Dog' })._id;
    }
    Features.insert(doc)
  }
});
