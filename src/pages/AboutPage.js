import { Container, Row, Col, Button } from "reactstrap";
import SubHeader from "../components/SubHeader";
import '../css/pages/AboutPage.css';

const AboutPage = () => {
    return (
        <Container>
            <SubHeader current='Read Me' />
            <h3 className='mb-4 text-center'>Read Me</h3>
            <p className='text-center'><b>This website is still in testing and development. All the workers you see here were created with randomly generated data, and do not represent real people. The Login modal is pre-populated with a test user if you wish to explore the full range of available features. You are welcome to create your own account, but it may be deleted as testing continues. Please do not provide any personal details or confidential information!</b></p>
            <Row>
                <h4 className='my-4'>Active Features</h4>
                <p>
                    <span className='feature'>User Login: </span>
                    A user is able to login with the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/UserLoginForm.js">UserLoginForm.js</a> component, a modal which is accessed through a button in the header. Their username and password is sent to the 'users/login' server endpoint via a Redux async thunk in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/userSlice.js">userSlice.js</a>. In the server, we utilize the passport library to authenticate with a local strategy. Then, a JWT token is generated and sent in the body of the response, along with the user's profile. The response is sent back to the async thunk function, and if the response is ok, an action is dispatched called setCurrentUser. The setCurrentUser action stores the user's profile with Redux and the isLoading state of the user slice is set to false. Now, the async thunk is fulfilled, and the userLogin.fulfilled reducer stores the JWT token in local storage so that it can be accessed for all subsequent requests. Finally, in the UserLoginForm.js component, the Log In button is conditionally rendered depending on the value of the Redux variable state.user.currentUser. Now that state.user.currentUser has value, the UserMenu.js component will be displayed in place of the Log In button.
                </p>

                <p>
                    <span className='feature'>User Register: </span>
                    A user is able to register with the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/UserRegisterForm.js">UserRegisterForm.js</a> component, a modal which is accessed through a button in the login modal. The user fills out a form which is controlled and validated with the Formik library. Their information is sent to the 'users/signup' server endpoint via a Redux async thunk in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/userSlice.js">userSlice.js</a>. In the server, we utilize the passport library method .register() to create a new User document. This document only stores information which is relevant to authentication. After the User document is created, a corresponding Profile document is created for the user. The Profile document stores all other user information such as address, profile picture, contacts, and rating. A response is sent back to async thunk function, and if the response is ok, the async thunk userLogin is dispatched to log in the newly registered user.
                </p>

                <p>
                    <span className='feature'>My Account: </span>
                    After a user has logged in, the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/UserMenu.js">UserMenu.js</a> becomes visible in the header. From the dropdown menu, the 'My Account' option will take them to the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/pages/AccountPage.js">AccountPage.js</a> page. The route is created with the react-router-dom library in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/App.js">App.js</a>. From here, they can edit and save their information. A useState hook creates a local state variable called 'editProfile'. If true, the UserEditProfile.js component is displayed, and if false, the UserAccountInfo.js component is displayed. Each of these components has a toggleEdit prop which passes down the setState function for 'editProfile'. <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/UserAccountInfo.js">UserAccountInfo.js</a> simply utilizes Redux's useSelector function to pull the current users's profile from state.user.currentUser. There is also an 'Edit Profile' button, which toggles the editProfile variable on the AccountPage.js component.
                </p>
  
                <p>
                    <span className='feature'>Edit Profile: </span>
                    From the account page, the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/UserEditProfile.js">UserEditProfile.js</a> component allows the user to update their information. It mainly consists of a form controlled by Formik which is initialized to the values which already exist in the user's profile. The user can click the 'Cancel' button, which will toggle the 'editProfile' variable in AccountPage.js and void any changes that might have been made. If the user is satisfied with the changes, they can click the 'Submit' button, which dispatch the updateUserDetails Redux thunk in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/userSlice.js">userSlice.js</a>. The information is sent to the 'profiles/:profileId' endpoint in the server. In the server, the profile is located and updated, and the response is sent back to the Redux thunk. If the response is ok, an action is dispatched called setCurrentUser. The setCurrentUser action stores the user's updated profile with Redux and the isLoading state of the user slice is set to false. Back in EditUserProfile.js, the 'editProfile' variable is set to false, and the UserAccountInfo.js will now be displayed in the account page with the updated information.
                </p>

                <p>
                    <span className='feature'>Upload Profile Pic: </span>
                    From within <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/UserEditProfile.js">UserEditProfile.js</a>, the user can upload a new profile picture with the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/UserProfileUpload.js">UserProfileUpload.js</a> component. When the 'Upload File' button is clicked, the user selects a file from their computer which must be an image, and an async function is called to handle the upload. The image is stored with Firebase storage inside the profile-pictures collection and given a name of the current user's profile id. The Firebase API function uploadBytesResumable is utilized to upload the file. After that, another Firebase API function getDownloadURL is used to retreive a URL which has the authentication embedded so the picture can be downloaded accessed any origin. After that, a Redux thunk is dispatched from the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/userSlice.js">userSlice.js</a> file. In the server, the profile is located and updated, and the response is sent back to the Redux thunk. If the response is ok, an action is dispatched called setCurrentUser. The setCurrentUser action stores the user's updated profile with Redux and the isLoading state of the user slice is set to false. Since the profile picture which is displayed on the screen is pulling from Redux state.user.currentUser.profile_pic, when the thunk is finished, the new profile picture will be displayed.
                </p>

                <p>
                    <span className='feature'>Logout: </span>
                    After a user has logged in, the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/UserMenu.js">UserMenu.js</a> becomes visible in the header. From the dropdown menu, the 'Logout' option will dispatch a Redux thunk within the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/userSlice.js">userSlice.js</a> file. The thunk will send a request to the 'users/logout' endpoint in the server, which will destroy the JWT token associated with the user. Regardless of whether or not the token was destroyed on the server, the token will be removed from the users's local storage on their browser. Now, the async thunk is fulfilled, and the userLogout.fulfilled reducer sets the currentUser to null, isLoading to false, and for an extra layer of certainty, the token is removed from local storage again.
                </p>

                <p>
                    <span className='feature'>Star Rating: </span>
                    The <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/reviews/StarRating.js">StarRating.js</a> component contains 5 star icons which can be filled, half-filled, or empty depending on the user's rating. For example, if the worker has a rating of 3.5, the first 3 stars will be filled, the 4th star will be half-filled, and the 5th star will be empty. The user's rating is passed into the component as prop 'rating'.
                </p>

                <p>
                    <span className='feature'>Pagination: </span>
                    In <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/workers/WorkerList.js">WorkerList.js</a>, the list of worker profiles is accessed from Redux state.users.workerSearchArray. Only 10 profiles are displayed at a time through pagination. The useState hook creates the currentPage variable. The workerSearchArray is rendered dynamically, first through a .slice() using the currentPage and pageSize variables, and then a .map(). The navigation is rendered using the Reactstrap component library for Pagination. This same pagination logic is also being used in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/reviews/ReviewList.js">ReviewList.js</a> with the state.reviews.reviewsArray.
                </p>

                <p>
                    <span className='feature'>Responsive Navbar: </span>
                    In the header, the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/nav/NavMenu.js">NavMenu.js</a> component contains a navbar which toggles between dropdown lists and a collapsed accordion depending on the screen size. On larger screen sizes, the dropdown lists are rendered with Reactstrap Dropdown components, and they are customized to open on mouse enter and close on mouse out. On small screen sizes, the navbar collapses and changes to an accordion which is rendered using Reactstrap Accordion components. When collapsed, the nav menu will open/close with the toggle button, and close on mouse out.
                </p>

                <p>
                    <span className='feature'>Worker Search Page: </span>
                    From <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/pages/HomePage.js">HomePage.js</a>, the user can type something into the search bar and click 'Go' which takes them to the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/pages/WorkerSearchPage.js">WorkerSearchPage.js</a> at the route '/search/:keyword'. The value which is typed into the search bar will be accessible with the react-router-dom function useParams(). Alternatively, the user can click an option from the navbar categories, which will take the same route, except the nav menu option which was clicked will be accessible with useParams(). A useEffect hook will run when the Redux state.services slice is finished loading which will dispatch a thunk in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/workers/workersSlice.js">workersSlice.js</a>.
                    <ul>
                        <li>If the params keyword matches a service, fetchWorkersByServiceId is dispatched. A GET request is sent to the server endpoint '/workers/:serviceId', which will find and return an array of all the worker profiles who offer the specified service.</li>
                        <li>If the params keyword does not match any service, a broader search will be made with fetchWorkersByKeyword. First, a GET request is sent to the server endpoint '/search/:keyword'. The server will find any services which partial match the keyword and return an array of those service ids. Then, the serviceIds are sent with a POST request to the server endpoint '/workers/search/:keyword'. The server will find any workers whose first/last name are partial matches with the keyword, AND workers who offer the any of the services which were sent in the serviceIds array, then return an array of the profiles found.</li>
                    </ul>
                    Both fetchWorkersByServiceId.fulfilled and fetchWorkersByKeyword.fulfilled will set the isLoading property of the users slice to false, and update the state.users.workerSearchArray with the array of profiles from the server response.
                </p>

                <p>
                    <span className='feature'>Worker Search bar: </span>
                    From the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/pages/WorkerSearchPage.js">WorkerSearchPage.js</a>, a search bar will continuously search every time the user types. To prevent searches from overlapping, a useState hook creates the variable actionInProgress. Before any action is dispatched, actionInProgress must be false. Additionally, to prevent a search from executing on every keystroke, a timeout of 0.5 seconds is created and renewed on every keystroke. Therefore, a search will only execute if there is a 0.5 second pause between keystrokes. If there is a 0.5 second pause, the fetchWorkersByKeyword action will be dispatched from the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/workers/workersSlice.js">workersSlice.js</a> file.
                </p>

                <p>
                    <span className='feature'>Request Contact: </span>
                    Within the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/workers/WorkerCard.js">WorkerCard.js</a> component, a 'request button' is displayed in the card header. After a user has logged in, they can click the button, which dispatches the createRequest Redux thunk within the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/requestsSlice.js">requestsSlice.js</a> file. The thunk makes a POST request to the server endpoint '/requests', and from there the server creates a new request document. Nothing more is done after the thunk is fulfilled. This feature is also available in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/pages/WorkerProfilePage.js">WorkerProfilePage.js</a>.
                </p>

                <p>
                    <span className='feature'>Worker Card Indicates Contact vs. Non-Contact: </span>
                    The <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/workers/WorkerCard.js">WorkerCard.js</a> component initializes an inContacts variable to false. Then, it accesses the currentUser with a Redux useSelector. If the current user exists, a .find() method is called on currentUser.contacts with the worker's id to set the inContacts variable to truthy or falsy. If the worker is in the current user's contacts, two things are rendered differently in the worker card. First, the Card component className is set to 'worker-card-in-contacts' instead of 'worker-card', which applies different CSS styling. Then, the RequestContactButton component renders buttons to represent the worker's contact information instead of a 'request contact' button. This feature is also available in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/pages/WorkerProfilePage.js">WorkerProfilePage.js</a>.
                </p>

                <p>
                    <span className='feature'>Worker Card Indicates when Request is Pending: </span>
                    The <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/workers/WorkerCard.js">WorkerCard.js</a> component indicates if a request has been sent by the current user - this is achieved with a few things. First, in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/App.js">App.js</a>, if a current user exists, a useEffect will dispatch the fetchRequests thunk from <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/requestsSlice.js">requestsSlice.js</a>. The thunk sends a GET request to the server endpoint 'requests'. The server will use the JWT token to decode the user's id and return any requests in which the to_id or from_id match the current user's id. The fetchRequests.fulfilled reducer will set the state.requests.requestsArray to the array of requests. Back in WorkerCard.js, a variable called requestSent is either true or false depending on the result of the Redux selector findRequetyByToId. If a request exists in state.requests.requestsArray in which the to_id matches that of the worker, this means the current user has sent a request to the worker, and the selector returns true. With conditional rendering, if requestSent is true, the message 'request sent' will appear in place of a 'request contact'. This feature is also available in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/pages/WorkerProfilePage.js">WorkerProfilePage.js</a>.
                </p>

                <p>
                    <span className='feature'>Contacts Page: </span>
                    After a user has logged in, the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/user/UserMenu.js">UserMenu.js</a> becomes visible in the header. From the dropdown menu, the 'My Contacts' option will navigate to the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/pages/ContactsPage.js">ContactsPage.js</a>. When this component first loads, a React useEffect dispatches the fetchRequests thunk within the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/requestsSlice.js">requestsSlice.js</a> file. The thunk sends a GET request to the server endpoint 'requests', which will use the JWT token to extract the user's id and search for requests. Both requests which the user has sent and received will be selected, the to and from profiles are populated, and an array of requests is returned. When the thunk has finished, state.requests.requestsArray is populated with the returned requests. Now, before any other components are mounted, the request data exists. The contacts page has a tabbed interface which was built using Reactstrap Tab components.
                    <ul>
                        <li>The 'Contacts' tab displays any contacts which are listed in the current user's contacts with the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/ContactRequestList.js">ContactRequestList.js</a>. The contacts already exist as an array of profiles in the state.user.currentUser.contacts, so all that's needed to access this data is a useSelector from Redux. The contacts array is rendered with a .map() method, and each contact object is passed as a prop into <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/ContactCard.js">ContactCard.js</a>.</li>
                        <li>The 'Requests' tab displays any requests which exist in state.requests.requestsArray, which will be populated before this component is rendered. The array is retrieved with a useSelector from Redux, and rendered with a .map() method. Within the .map(), we check if the request.to_id === currentUser._id. If so, the request has been sent to the current user, and the request is passed as a prop to <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/ContactRequestCard.js">ContactRequestCard.js</a>. If the ids do not match, then the request has been sent BY the current user, and the request is passed as a prop to <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/ContactRequestSentCard.js">ContactRequestSentCard.js</a>.</li>
                    </ul>
                </p>

                <p>
                    <span className='feature'>Approve/Decline Contact Request: </span>
                    From within the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/ContactRequestCard.js">ContactRequestCard.js</a> component, the current user has the option to approve or decline a contact request. Both the 'Approve' and 'Decline' buttons dispatch the updateRequest thunk from the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/requestsSlice.js">requestsSlice.js</a> file - the only difference is if the status is 'Approved' or 'Declined'. The thunk sends a PUT request to the server endpoint 'requests/:requestId' and updates the specified request's status from 'Pending' to either 'Approved' or 'Declined'. Both the to and from users' profile ids are added to each other's contacts arrays. After the thunk has been fulfilled, the state.requests.requestsArray is filtered to remove the request which was just approved or declined.
                </p>

                <p>
                    <span className='feature'>Worker Profile Page: </span>
                    From the Worker Search Page, the user can click on the name/rating of any worker card to navigate to the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/pages/WorkerProfilePage.js">WorkerProfilePage.js</a> at the route of 'worker/:profileId'. This is essentially an expanded version of the worker card, which includes any worker-uploaded images, a full list of the worker's reviews, and the option to leave a review for the worker. The id is extracted with react-router-dom useParams(), and a React useEffect executes when the component is first rendered to dispatch the redux thunk fetchWorkerProfile, located in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/workersSlice.js">workersSlice.js</a>. The thunk sends a GET request to the server endpoint 'profiles/:profileId'. The server uses the id to find the worker's profile and send it back in the response body. The fetchWorkerProfile.fulfilled reducer stores the retrieved profile in state.users.workerProfile. Back in WorkerProfilePage.js, the worker is retrieved with a Redux useSelector and displayed on the page.
                </p>

                <p>
                    <span className='feature'>Add Review: </span>
                    From the worker's profile page, there's a button at the bottom called 'Add Review'. When a user clicks on this button, the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/reviews/ReviewForm.js">ReviewForm.js</a> modal appears. The form is controlled with the Formik library and validated with <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/utils/validateReviewForm.js">validateReviewForm.js</a>. When the 'Submit' button is clicked, the addReview thunk action is dispatched from <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/reviews/reviewsSlice.js">reviewsSlice.js</a>. The thunk sends a POST request to the 'reviews' endpoint in the server. The server creates the review document and sends a response back to the thunk. The addReview.fulfilled reducer sets the slice's isLoading state to false, pushes the new review to state.reviews.reviewsArray, and recalculates the worker's rating average. Since the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/reviews/ReviewList.js">ReviewList.js</a> component pulls its data from state.reviews.reviewsArray, the new review will appear on the page without an additional call to fetchReviews.
                </p>

                <p>
                    <span className='feature'>Calculate Rating When Review is Posted: </span>
                    The addReview.fulfilled reducer in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/reviews/reviewsSlice.js">reviewsSlice.js</a> sets the slice's isLoading to false, pushes the new review to state.reviews.reviewsArray, and calculates the worker's new rating average. It stores this value in state.reviews.ratingAverage. In the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/reviews/ReviewForm.js">ReviewForm.js</a> component, a useEffect will run whenever this ratingAverage changes. This is achieved with an additional variable called ratingChange, which is set to boolean true/false depending on if it matches the rating which is currently stored in state.users.workerProfile. If the ratingChange variable is true, the updateWorkerProfile thunk is dispatched with the new average in <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/requests/workersSlice.js">workersSlice.js</a>. In the thunk, a PUT request is sent to the server endpoint 'profiles/:profileId'. The server updates the specified profile document, and returns the updated document. The updateWorkerProfile.fulfilled reducer then stores the updated profile in state.users.workerProfile. Back in WorkerProfilePage.js, the profile data is pulled from the Redux state so the most up-to-date value is displayed.
                </p>

                <p>
                    <span className='feature'>Review Carousel: </span>
                    In the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/workers/WorkerCard.js">WorkerCard.js</a> component, the worker's reviews are fetched from within a React useEffect. A filter_reviewed_user_id is passed with the value of the worker profile id. A POST request is made to the endpoint 'reviews/fetchReviews' in the server, which searches reviews based on the id and returns an array of reviews. The reviews array is passed as a prop into the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/reviews/ReviewCarousel.js">ReviewCarousel.js</a> component, which will render the reviews as carousel items with a .map() method. We use the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/masterleandrowd.github.io/react-responsive-carousel/">react-responsive-carousel</a> here instead of the bootstrap carousel due to bugs and limited customization. Each review is passed as a prop into the <a target="_blank" href="https://github.com/sruthiravindra/wordofmouth/tree/master/src/features/reviews/ReviewPreview.js">ReviewPreview.js</a> component which neatly displays a summary of the review information as a Reactstrap Card component.
                </p>


                <h4 className='my-4'>Future Features</h4>

                <p><span className='feature'>Delete Account:</span></p>
                <p><span className='feature'>'Leave a Review' Button in Contact Card:</span></p>
                <p><span className='feature'>Distance Away displayed on worker cards:</span></p>
                <p><span className='feature'>Register as a Worker:</span></p>
                <p><span className='feature'>Email/text sent on account creation:</span></p>
                <p><span className='feature'>Email/text on account deletion:</span></p>
                <p><span className='feature'>Password recovery:</span></p>
                <p><span className='feature'>Email/text sent on contact request:</span></p>
                <p><span className='feature'>Email/text sent on new contact:</span></p>
                <p><span className='feature'>Contact Us functionality:</span></p>
                <p><span className='feature'></span></p>

            </Row>
        </Container>
    )
}
export default AboutPage;


{/* <Row>
<Col>
    <div
        className='text-center bg-image'
        style={{ backgroundImage: "url('" + banner1 + "')", height: 400 }}
    >
        <div className='mask h-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='text-white'>
                    <h1 className='mb-3'>Revolutionizing Everyday Work</h1>
                    <h4 className='mb-3'>Get More Done In Less Time</h4>

                </div>
            </div>
        </div>
    </div>
</Col>
</Row>
<Row className="row-content">
<Col>
    <h3 className="text-center">
        Our Mission
    </h3>
    <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique molestias ipsam porro, harum
        commodi recusandae facere odit corrupti quisquam velit sunt officia exercitationem voluptate, ad
        excepturi vitae labore cupiditate reiciendis?
    </p>
</Col>
</Row>
<Row className="row-content bg-light">
<Col>
    <h3 className="text-center">Our Leadership</h3>
    <TeamsList />
</Col>
</Row>
<Row className="row-content border-bottom-0">
<Col className="text-center">
    <h3 className="text-center">Want to be part of our journey?</h3>
    <br></br>
    <Button className="fs-1 btn btn-success">Join Us</Button>
</Col>
</Row> */}