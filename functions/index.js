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

exports.addContactRequest = functions.https.onCall(async (data) => {
   const {uid, rid} = data;

   const new_doc_ref = await admin.firestore().collection("contactRequests").add({
      uid: uid,
      rid: rid
   });
   const new_doc_snapshot = await new_doc_ref.get();
   const new_doc = {...new_doc_snapshot.data(), id: uid};
   console.log ({success: true, contactRequest: new_doc});
});

exports.approveContactRequest = functions.https.onCall(async (data) => {
   const {requestId, uid, rid} = data;

   const uid_ref = admin.firestore().doc(`userData/${uid}`);
   const rid_ref = admin.firestore().doc(`userData/${rid}`);
   const request_ref = admin.firestore().doc(`contactRequests/${requestId}`);

   await uid_ref.update({ contacts: [rid]});
   await rid_ref.update({ contacts: [uid]});
   await request_ref.delete();
});

exports.getContactRequests = functions.https.onCall(async (data) => {
   const { requestIds } = data;

   //const query = admin.firestore().
});


// this wasn't working -- I couldn't get the image formatted correctly. It was passed as a buffer, but received as an object

// exports.uploadProfilePic = functions.https.onCall(async (data) => {
//    try {
//       const { image, uid } = data;
//       if (!uid) {throw new Error("Missing uid")};
//       if (!image) {throw new Error("Missing image")};

//       const bucket = admin.storage().bucket();
//       const fileRef = bucket.file(`profile-pictures/${uid}`)
//       const [fileExists] = await fileRef.exists();
//       if (fileExists) {await fileRef.delete();}

//       const byteValues = Object.values(image);
//       const uint8Array = new Uint8Array(byteValues);
//       console.log(uint8Array);
//       await fileRef.save(uint8Array, {resumable: false});

//       const doc_ref = admin.firestore().doc(`userData/${uid}`);
//       let doc_snapshot = await doc_ref.get();
//       let doc = doc_snapshot.data();
//       if (doc.profilePic !== `profile-pictures/${uid}`) {
//          await doc_ref.update({
//             profilePic: `profile-pictures/${uid}`
//          });
//          doc_snapshot = await doc_ref.get();
//          doc = doc_snapshot.data()
//       }
//       return { success: true, user: doc };

//    } catch (error) {
//       throw new functions.https.HttpsError(error.message);
//    }
// });