const { CENTRAL_COLLECTION } = require('radiks-server/app/lib/constants');
const { getDB } = require('radiks-server');
const notifier = require('../common/lib/notifier');

const sendTestNotifier = async () => {
  const mongoURI = 'mongodb://localhost:27017/radiks-server-scripting';
  const db = await getDB(mongoURI);
  const central = db.collection(CENTRAL_COLLECTION);
  const username = 'hankstoever.id';
  const key = 'UserSettings';
  const email = 'testemail@example.com';
  const _id = `${username}-${key}`;
  const value = {
    email,
    notifyMentioned: true,
  };
  await central.updateOne({ _id }, { $set: value }, { upsert: true });
  const message = {
    radiksType: "Message",
    content: "Hello, @hankstoever.id",
    _id: "fakeID",
    createdBy: 'hank.blockstack',
  };
  await notifier(db, message);
};

sendTestNotifier().then(() => {
  console.log('done');
  process.exit();
}).catch((e) => {
  console.error(e);
  process.exit();
});
