
# Active Features

### User Login
A user is able to login with the [UserLoginForm.js](/src/features/user/UserLoginForm.js) component, a modal which is accessed through a button in the header. Their username and password is sent to the 'users/login' server endpoint via a Redux async thunk in [userSlice.js](/src/features/user/userSlice.js). In the server, we utilize the passport library to authenticate with a local strategy. Then, a JWT token is generated and sent in the body of the response, along with the user's profile. The response is sent back to the async thunk function, and if the response is ok, an action is dispatched called setCurrentUser. The setCurrentUser action stores the user's profile with Redux and the isLoading state of the user slice is set to false. Now, the async thunk is fulfilled, and the userLogin.fulfilled reducer stores the JWT token in local storage so that it can be accessed for all subsequent requests. Finally, in the UserLoginForm.js component, the Log In button is conditionally rendered depending on the value of the Redux variable state.user.currentUser. Now that state.user.currentUser has value, the UserMenu.js component will be displayed in place of the Log In button.

### User Register
A user is able to register with the [UserRegisterForm.js](/src/features/user/UserRegisterForm.js) component, a modal which is accessed through a button in the login modal. The user fills out a form which is controlled and validated with the Formik library. Their information is sent to the 'users/signup' server endoint via a Redux async thunk in [userSlice.js](/src/features/user/userSlice.js). In the server, we utilize the passport library method .register() to create a new User document. This document only stores information which is relevant to authentication. After the User document is created, a corresponding Profile document is created for the user. The Profile document stores all other user information such as address, profile picture, contacts, and rating. A response is sent back to async thunk function, and if the response is ok, the async thunk userLogin is dispatched to log in the newly registered user. 

### My Account
After a user has logged in, the [UserMenu.js](/src/features/user/UserMenu.js) becomes visible in the header. From the dropdown menu, the 'My Account' option will take them to the [AccountPage.js](/src/pages/AccountPage.js) page. The route is created with the react-router-dom library in [App.js](/src/App.js). From here, they can edit and save their information. A useState hook creates a local state variable called 'editProfile'. If true, the UserEditProfile.js component is displayed, and if false, the UserAccountInfo.js component is displayed. Each of these components has a toggleEdit prop which passes down the setState function for 'editProfile'. [UserAccountInfo.js](/src/features/user/UserAccountInfo.js) simply utilizes Redux's useSelector function to pull the current users's profile from state.user.currentUser. There is also an 'Edit Profile' button, which toggles the editProfile variable on the AccountPage.js component.  

### Edit Profile
From the account page, the [UserEditProfile.js](/src/features/user/UserEditProfile.js) component allows the user to update their information. It mainly consists of a form controlled by Formik which is initialized to the values which already exist in the user's profile. The user can click the 'Cancel' button, which will toggle the 'editProfile' variable in AccountPage.js and void any changes that might have been made. If the user is satisfied with the changes, they can click the 'Submit' button, which dispatch the updateUserDetails Redux thunk in [userSlice.js](/src/features/user/userSlice.js). The information is sent to the 'profiles/:profileId' endpoint in the server. In the server, the profile is located and updated, and the response is sent back to the Redux thunk. If the response is ok, an action is dispatched called setCurrentUser. The setCurrentUser action stores the user's updated profile with Redux and the isLoading state of the user slice is set to false. Back in EditUserProfile.js, the 'editProfile' variable is set to false, and the UserAccountInfo.js will now be displayed in the account page with the updated information.

### Upload Profile Pic
From within [UserEditProfile.js](/src/features/user/UserEditProfile.js), the user can upload a new profile picture with the [UserProfileUpload.js](/src/features/user/UserProfileUpload.js) component. When the 'Upload File' button is clicked, the user selects a file from their computer which must be an image, and an async function is called to handle the upload. The image is stored with Firebase storage inside the profile-pictures collection and given a name of the current user's profile id. The Firebase API function uploadBytesResumable is utilized to upload the file. After that, another Firebase API function getDownloadURL is used to retreive a URL which has the authentication embedded so the picture can be downloaded accessed any origin. After that, a Redux thunk is dispatched from the [userSlice.js](/src/features/user/userSlice.js) file. In the server, the profile is located and updated, and the response is sent back to the Redux thunk. If the response is ok, an action is dispatched called setCurrentUser. The setCurrentUser action stores the user's updated profile with Redux and the isLoading state of the user slice is set to false. Since the profile picture which is displayed on the screen is pulling from Redux state.user.currentUser.profile_pic, when the thunk is finished, the new profile picture will be displayed.   

### Logout
After a user has logged in, the [UserMenu.js](/src/features/user/UserMenu.js) becomes visible in the header. From the dropdown menu, the 'Logout' option will dispatch a Redux thunk within the [userSlice.js](/src/features/user/userSlice.js) file. The thunk will send a request to the 'users/logout' endpoint in the server, which will destroy the JWT token associated with the user. Regardless of whether or not the token was destroyed on the server, the token will be removed from the users's local storage on their browser. Now, the async thunk is fulfilled, and the userLogout.fulfilled reducer sets the currentUser to null, isLoading to false, and for an extra layer of certainty, the token is removed from local storage again.

### Star Rating
The [StarRating.js](/src/features/reviews/StarRating.js) component contains 5 star icons which can be filled, half-filled, or empty depending on the user's rating. For example, if the worker has a rating of 3.5, the first 3 stars will be filled, the 4th star will be half-filled, and the 5th star will be empty. The user's rating is passed into the component as prop 'rating'. 

### Pagination
In [WorkerList.js](/src/features/workers/WorkerList.js), the list of worker profiles is accessed from Redux state.users.workerSearchArray. Only 10 profiles are displayed at a time through pagination. The useState hook creates the currentPage variable. The workerSearchArray is rendered dynamically, first through a .slice() using the currentPage and pageSize variables, and then a .map(). The navigation is rendered using the Reactstrap component library for Pagination. This same pagination logic is also being used in [ReviewList.js](/src/features/reviews/ReviewList.js) with the state.reviews.reviewsArray. 

### Responsive Navbar
In the header, the [NavMenu.js](/src/features/nav/NavMenu.js) component contains a navbar which toggles between dropdown lists and a collapsed accordion depending on the screen size. On larger sceen sizes, the dropdown lists are rendered with Reactstrap Dropdown components, and they are customized to open on mouse enter and close on mouse out. On small screen sizes, the navbar collapses and changes to an accordion which is rendered using Reactstrap Accordion components. When collapsed, the nav menu will open/close with the toggle button, and close on mouse out.

### Services Page 
From [HomePage.js](/src/pages/HomePage.js), the user can type something into the search bar and click 'Go' which takes them to the [ServicesPage.js](/src/pages/ServicesPage.js) at the route '/services/:keyword'. The value which is typed into the searchbar will be accessible with the react-router-dom function useParams(). Alternatively, the user can click an option from the navbar categories, which will take the same route, except the nav menu option which was clicked will be accessible with useParams(). A useEffect hook will run when the Redux state.services slice is finished loading which will dispatch a thunk in [usersSlice.js](/src/features/users/usersSlice.js). 
- If the params keyword matches a service, fetchWorkersByServiceId is dispatched. A GET request is sent to the server endpoint '/workers/:serviceId', which will find and return an array of all the worker profiles who offer the specified service. 
- If the params keyword does not match any service, a broader search will be made with fetchWorkersByKeyword. First, a GET request is sent to the server endpoint '/services/search/:keyword'. The server will find any services which partial match the keyword and return an array of those service ids. Then, the serviceIds are sent with a POST request to the server endpoint '/workers/search/:keyword'. The server will find any workers whose first/last name are partial matches with the keyword, AND workers who offer the any of the services which were sent in the serviceIds array, then return an array of the profiles found.  

Both fetchWorkersByServiceId.fulfilled and fetchWorkersByKeyword.fulfilled will set the isLoading property of the users slice to false, and update the state.users.workerSearchArray with the array of profiles from the server response.

### Worker Search bar
From the [ServicesPage.js](/src/pages/ServicesPage.js), a search bar will continously search every time the user types. To prevent searches from overlapping, a useState hook creates the variable actionInProgress. Before any action is dispatched, actionInProgress must be false. Additionally, to prevent a search from executing on every keystroke, a timeout of 0.5 seconds is created and renewed on every keystroke. Therefore, a search will only execute if there is a 0.5 second pause between keystrokes. If there is a 0.5 second pause, the fetchWorkersByKeyword action will be dispatched from the [usersSlice.js](/src/features/users/usersSlice.js) file. 

### Worker Card Indicates Contact vs. Non-Contact

### Request Contact

### Contacts Page

### Approve/Decline Contact Request

### Worker Profile Page

### Add Review


# Future Features

### Review Carousel
In the [WorkerCard.js](/src/features/workers/WorkerCard.js) component, the worker's reviews are fetched from within a React useEffect. A filter_reviewed_user_id is passed with the value of the worker profile id. A POST request is made to the endpoint 'reviews/fetchReviews' in the server, which searches reviews based on the id and returns an array of reviews. The reviews array is passed as a prop into the [ReviewCarousel.js](/src/features/reviews/ReviewCarousel.js) component, which will render the reviews as carousel items with a .map() method. We use the react-responsive-carousel here instead of the bootstrap carousel due to bugs and limited customization (leandrowd.github.io/react-responsive-carousel/). Each review is passed as a prop into the [ReviewPreview.js](/src/features/reviews/ReviewPreview.js) component which neatly displays a summary of the the review information as a Reactstrap Card component.

### Calculate Rating When Review is Posted

### Delete Account

### Email/text sent on account creation

### Email/text on account deletion

### Password recovery

### Email/text sent on contact request

### Email/text sent on new contact

### Contact Us functionality


# TO DO

- move updateUserDetails and updateUserProfilePic from usersSlice.js to userSlice.js
- clean up usage of 'profile' vs 'user'
- display loading icon while user profile is updating
- convert all HTTP requests to use axios
- eliminate the updateUserProfilePic thunk? It essentially just updates the profile_pic field which can be accomplished with updateUserDetails
- instead of storing the profile in local storage, dispatch userLogin when the application is first loaded. In userLogin, check to see if there's a token in local storage. If so, send a request to a new endpoint on the server 'users/restore' which will fetch the user's profile with the token. 
- add functionality to the 'leave a review' button in ContactCard.js
- prevent a user from requesting a contact if a request has already been sent
- replace 'request contact' button on WorkerProfilePage.js with contact info if in current user's contacts
- rework the geocode and distance away feature which is displayed on WorkerCard.js and WorkerProfilePage.js
- remove WorkerFilteredList.js ? The data is now being filtered as it is fetched
- rename ServicesPage.js to WorkerSearchPage.js ?
- instead of fetching all reviews when the app loads, fetch reviews in a useEffect from within WorkerCard.js and WorkerProfilePage.js. I don't think the reviews will be kept anywhere in the Redux store, so do even need a reviews slice? 


## Cloud Functions -- DEPRECATED AFTER SWITCH TO MONGODB

**getUser:** onCall function which receives a user id and returns a user

**createUser:** onCreate function which creates a document in "userData" when a new user is registered in authentication

**updateUser:** onCall function which receives a user id and user fields to update, updates the user, and returns the udpated user

**deleteUser:** onCall function which receives a user id, deletes the user, and returns {success: true}

**autoDeleteUser:** onDelete function which deletes the associated document in "userData" when a user is deleted in authentication