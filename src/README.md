# Cloud Functions

getUser: onCall function which receives a user id and returns a user

createUser: onCreate function which creates a document in "userData" when a new user is registered in authentication

updateUser: onCall function which receives a user id and user fields to update, updates the user, and returns the udpated user

deleteUser: onCall function which receives a user id, deletes the user, and returns {success: true}
