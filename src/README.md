# Cloud Functions

**getUser:** onCall function which receives a user id and returns a user

**createUser:** onCreate function which creates a document in "userData" when a new user is registered in authentication

**updateUser:** onCall function which receives a user id and user fields to update, updates the user, and returns the udpated user

**deleteUser:** onCall function which receives a user id, deletes the user, and returns {success: true}

**autoDeleteUser:** onDelete function which deletes the associated document in "userData" when a user is deleted in authentication


# Active Features

**User Login:** A user is able to login through a button in the header. Their information is handled through Firebase Authentication. After they successfully log in, the login button becomes their profile picture which is also a dropdown menu of user options (my account, my contacts, logout)

**User Register:** A user is able to register through a button in the login modal. They type their information into a form, and a new user account is created with Firebase Authentication. This triggers the cloud function createUser, which creates a new document in the userData collection in Firestore. The application waits for the new document to exist, and then the cloud function updateUser is called from within the app to fill the new document with the user-provided data. Finally, the state is updated with Redux.

**My Account:**: From the dropdown in the header, the user can access their account page. From here, they can edit and save their information. The updateUser cloud function is called to update Firestore, and Redux updates the state. 

**Upload Profile Pic:** From the account page, the user can upload a new profile picture. This is sent to the Firebase profile-pictures collection, and stored with a name of the current user id. After that, the downloadURL is retrieved, and the cloud function updateUser is called to update the user document { profilePic: downloadURL }. Redux updates the state, and a useState hook is utilized to display the new profile picture in real time.

**Logout:** From the dropdown in the header, the user can logout.

**Star Rating:** The star rating display is filled according to the user's rating. For example, if the worker has a rating of 3.5, only 3.5 of the 5 stars will be filled in.

**Pagination:** Worker cards on the service page, as well as reviews on the worker profile page are paginated. 

**Responsive Navbar:** The nav elements in the header display as dropdown lists which open on mouse enter and close on mouse out. If the screen size is sm or smaller, it collapses and changes to an accordion. When collapsed, the nav menu will open/close with the toggle button, and close on its own on mouse out.

**Services Page:** From the home page, the user types something into the search bar and clicks 'Go' which takes them to the services page. Alternatively, the user clicks an option from the navbar categories. Worker data is pulled from the Redux store as an array and rendered dynamically with the .map() method. Each user is displayed in a card with a summary of their information.

**Review Carousel:** On the worker summary cards, their reviews are pulled from the Redux store and rendered dynamically with the .map() method. Each review is rendered as a card within a carousel item. We use the react-responsive-carousel here instead of the bootstrap carousel due to bugs and limited customization (leandrowd.github.io/react-responsive-carousel/).

**Worker Profile Page:** From the worker summary card, the user can click on the worker's name/rating to navigate to the worker's profile page. From here, the user can see additional information about the worker such as worker-uploaded images, and other info TBD.

**Add Review:** If a user is logged in, they can leave a review on a worker profile page. The review is added to the Firestore collection reviewData, and then Redux updates the state. The review list will display a loading icon while the new review is being uploaded, and then the new review is displayed in real time.



# Future Features

**Services Search bar:** From the home page as well as the services page, the user can type a keyword into the search bar. The workers are the filtered based on the keyword. 

**Limited data fetched to improve performance:** Instead of fetching all of the data when the page first loads, the user/review/request data is fetched only where it is needed and in small chunks at a time.

**Contacts Page:** From the dropdown menu in the header, the user can go to this page to view their contacts, as well as their pending requests. 

**Request Contact:** When the user clicks the 'request contact' button from the worker card or profile page, the request data is added to the Firestore collection contactRequestData. The user can optionally attach a message to their request. This request will then appear on the contacts page, for both the user that requested and the worker whose info has been requested. 

**Add Contact:** From the worker's contacts page, they can either approve or deny contact requests. If approved, in Firestore userData, the user's id is added to the worker's contacts array, and the worker's id is added to the user's contacts array. Then, the request data is removed from the Firestore contactRequestData collection. 

**Contacts indicated in worker card:** If a user is logged in and the worker is in the user's contacts, the worker card will display a different color and the 'request contact' button is replaced with a 'leave a review' button. If a user is logged in and the user has requested the contact, the worker card will also display a different color, and the 'request contact' button is replaced with a message stating 'contact requested.' 

**Distance from user displayed on worker card:** Instead of displaying the worker's address on the worker card, the worker's distance from the user's current location is displayed. 

**Delete Account:** From the account page, the user has the option to delete their account. A modal will pop up to ask the user if they are absolutely sure, and they must provide a reason before deleting the account. 

**Email/text sent on account creation:**

**Email/text on account deletion:**

**Password recovery:**

**Email/text sent on contact request:**

**Email/text sent on new contact:**

**Contact Us functionality:**