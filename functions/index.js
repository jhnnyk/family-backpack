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
