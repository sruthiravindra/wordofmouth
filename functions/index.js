const admin = require("firebase-admin")
admin.initializeApp();

const functions = require("firebase-functions")

exports.getUser = functions.https.onCall(async (data) => {
 try {
    const { id } = data;
    if (!id) {throw new Error("Missing id")};

    const doc_snapshot = await admin.firestore().doc(`userData/${id}`).get();
    const doc = doc_snapshot.data()
    return ({success: true, user: doc});
 } catch (error) {
    throw new functions.https.HttpsError(error.message);
 }
});

exports.createUser = functions.auth.user().onCreate(async (user) => {
   try {
      const {email, uid} = user;
      const new_doc_ref = await admin.firestore().collection("userData").doc(uid).set({
         email: email,
         profilePic: 'profile-pictures/profile-default.png',
         phone: '',
         address: '',
         firstName: '',
         lastName: '',
         gender: '',
         rating: 0,
         contacts: [],
         worker: false,
         services: []
      });
      const new_doc_snapshot = await new_doc_ref.get();
      const new_doc = {...new_doc_snapshot.data(), id: uid};
      console.log ({success: true, user: new_doc});
   } catch (error) {
      console.error(error.message);
   }
});

exports.updateUser = functions.https.onCall(async (data) => {
   try {
      const { id } = data;
      if (!id) {throw new Error("Missing id")};

       const doc_ref = admin.firestore().doc(`userData/${id}`);
       await doc_ref.update(data);
       const doc_snapshot = await doc_ref.get();
       const updated_doc = doc_snapshot.data();
       return ({success: true, user: updated_doc});
   } catch (error) {
      throw new functions.https.HttpsError(error.message);
   }
});

exports.deleteUser = functions.https.onCall(async (data) => {
   try {
      const { id } = data;
      if (!id) {throw new Error("Missing id")};

      const doc_ref = admin.firestore().doc(`userData/${id}`);
      await doc_ref.delete({exists: true});
      return ({success: true})
   } catch (error) {
      throw new functions.https.HttpsError(error.message);
   }
});

exports.autoDeleteUser = functions.auth.user().onDelete(async (user) => {
   try {
      const { uid } = user;
      if (!uid) {throw new Error("Missing id")};

      const doc_ref = admin.firestore().doc(`userData/${uid}`);
      await doc_ref.delete({exists: true});
      return ({success: true})
   } catch (error) {
      throw new functions.https.HttpsError(error.message);
   }
});

exports.uploadProfilePic = functions.https.onCall(async (data) => {
   try {
      const { image, uid } = data;
      if (!uid) {throw new Error("Missing uid")};
      if (!file) {throw new Error("Missing file")};

      const bucket = admin.storage().bucket();
      const fileRef = bucket.file(`profile-pictures/${uid}`)
      //delete the current profile pic
      await fileRef.delete();
      //upload the new one
      await fileRef.save(image.buffer, {
         metadata: {
            contentType: image.mimetype
         }
      });
      //ensure profilePic in userData matches the new file location
      const doc_ref = admin.firestore().doc(`userData/${id}`);
      const doc_snapshot = await doc_ref.get();
      const doc = doc_snapshot.data();
      if (doc.profilePic !== `profile-pictures/${uid}`) {
         await doc_ref.update({
            profilePic: `profile-pictures/${uid}`
         });
      }
      return { success: true, path: `profile-pictures/${uid}`};
      
   } catch (error) {
      throw new functions.https.HttpsError(error.message);
   }
});