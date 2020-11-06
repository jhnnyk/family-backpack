const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// find user by email
exports.findUserByEmail = functions.https.onCall(async (data, context) => {
  try {
    let userRecord = await admin.auth().getUserByEmail(data.email);
    return userRecord.toJSON();
  } catch (error) {
    return error;
  }
});

// current user add new parent
exports.addNewParent = functions.https.onCall(async (data, context) => {
  try {
    let userRecord = await admin.auth().createUser({
      email: data.email,
      password: data.password,
      displayName: data.displayName
    });
    return userRecord.toJSON();
  } catch (error) {
    return error;
  }
});
