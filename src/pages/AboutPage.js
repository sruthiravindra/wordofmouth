import { Container, Row, Col, Button } from "reactstrap";
import SubHeader from "../components/SubHeader";
import banner1 from '../app/assets/img/aboutus_banner_1.jpg';
import TeamsList from '../features/teams/TeamsList';
import effieHeadshot from '../app/assets/img/effie-headshot.png'

const AboutPage = () => {
    return (
        <Container>
            <SubHeader current='About Us' />
            <Row className='text-center mb-2'>
                <h2>About Us</h2>
            </Row>
            <Row className='team-member'>
                <Col xs='3' md='2'>
                    <img 
                        src={effieHeadshot}
                        alt='effie'
                        className='img-fluid headshot'
                    />
                </Col>
                <Col>
                    <p>Coming from a design background, Effie has brought much of the aesthetic detail to this project. Her favorite contributions are the responsive navigation bar, worker summary cards, and the 'distance away' feature using Google Geolocation API. After spending 5 months in Nepal, she has a personal connection to the concept and a unique insight into the user experience.</p>
                </Col>
            </Row>
            <Row className='team-member'>
                <Col xs='3' md='2'>
                    <img 
                        src=''
                        alt='sruthi'
                        className='img-fluid'
                    />
                </Col>
                <Col>
                    <p>With 10+ years of experience as a backend developer, Sruthi has been vital to managing the data within this project. Her favorite contributions are the login/register modals, search bar functionality, and the edit profile page. Originally from Bangalore, India, she is very familiar with the ecosystem of freelance workers which is prominent in Southeast Asia that inspired the website.</p>
                </Col>
            </Row>
            <h3 className='mb-4 text-center'>Read Me</h3>
            <Row className=''>
                <h4 className='my-4'>Active Features</h4>
                <p><span className='feature'>User Login:</span> A user is able to login through a button in the header. Their information is handled through Firebase Authentication. After they successfully log in, the login button becomes their profile picture which is also a dropdown menu of user options (my account, my contacts, logout)</p>
                <p><span className='feature'>User Register:</span> A user is able to register through a button in the login modal. They type their information into a form, and a new user account is created with Firebase Authentication. This triggers the cloud function createUser, which creates a new document in the userData collection in Firestore. The application waits for the new document to exist, and then the cloud function updateUser is called from within the app to fill the new document with the user-provided data. Finally, the state is updated with Redux.</p>

                <p><span className='feature'>Upload Profile Pic:</span> From the account page, the user can upload a new profile picture. This is sent to the Firebase profile-pictures collection, and stored with a name of the current user id. After that, the downloadURL is retrieved, and the cloud function updateUser is called to update the user document ( profilePic: downloadURL ). Redux updates the state, and a useState hook is utilized to display the new profile picture in real time.</p>

                <p><span className='feature'>Logout:</span> From the dropdown in the header, the user can logout.</p>

                <p><span className='feature'>Star Rating:</span> The star rating display is filled according to the user's rating. For example, if the worker has a rating of 3.5, only 3.5 of the 5 stars will be filled in.</p>

                <p><span className='feature'>Pagination:</span> Worker cards on the service page, as well as reviews on the worker profile page are paginated.</p>

                <p><span className='feature'>Responsive Navbar:</span> The nav elements in the header display as dropdown lists which open on mouse enter and close on mouse out. If the screen size is sm or smaller, it collapses and changes to an accordion. When collapsed, the nav menu will open/close with the toggle button, and close on its own on mouse out.</p>

                <p><span className='feature'>Services Page:</span> From the home page, the user types something into the search bar and clicks 'Go' which takes them to the services page. Alternatively, the user clicks an option from the navbar categories. Worker data is pulled from the Redux store as an array and rendered dynamically with the .map() method. Each user is displayed in a card with a summary of their information.</p>

                <p><span className='feature'>Review Carousel:</span> On the worker summary cards, their reviews are pulled from the Redux store and rendered dynamically with the .map() method. Each review is rendered as a card within a carousel item. We use the react-responsive-carousel here instead of the bootstrap carousel due to bugs and limited customization (leandrowd.github.io/react-responsive-carousel/).</p>

                <p><span className='feature'>Worker Profile Page:</span> From the worker summary card, the user can click on the worker's name/rating to navigate to the worker's profile page. From here, the user can see additional information about the worker such as worker-uploaded images, and other info TBD.</p>

                <p><span className='feature'>Add Review:</span> If a user is logged in, they can leave a review on a worker profile page. The review is added to the Firestore collection reviewData, and then Redux updates the state. The review list will display a loading icon while the new review is being uploaded, and then the new review is displayed in real time.</p>

                <p><span className='feature'>Distance from user displayed on worker card:</span> If a user is logged in, their address is geocoded to a set of longitude and latitude coordinates via Google Geocoding API. The current user's location is passed down to the worker cards. Here, the worker's address is also converted to coordinates, then the distance between the two locations is calculated and displayed in the worker card header. If a user is not logged in, the distance just displays as '...'</p>


                <h4 className='my-4'>Future Features</h4>

                <p><span className='feature'>Services Search bar:</span> From the home page as well as the services page, the user can type a keyword into the search bar. The workers are the filtered based on the keyword.</p>

                <p><span className='feature'>Limited data fetched to improve performance:</span> Instead of fetching all of the data when the page first loads, the user/review/request data is fetched only where it is needed and in small chunks at a time.</p>

                <p><span className='feature'>Contacts Page:</span> From the dropdown menu in the header, the user can go to this page to view their contacts, as well as their pending requests.</p>

                <p><span className='feature'>Request Contact:</span> When the user clicks the 'request contact' button from the worker card or profile page, the request data is added to the Firestore collection contactRequestData. The user can optionally attach a message to their request. This request will then appear on the contacts page, for both the user that requested and the worker whose info has been requested.</p>

                <p><span className='feature'>Add Contact:</span> From the worker's contacts page, they can either approve or deny contact requests. If approved, in Firestore userData, the user's id is added to the worker's contacts array, and the worker's id is added to the user's contacts array. Then, the request data is removed from the Firestore contactRequestData collection.</p>

                <p><span className='feature'>Contacts indicated in worker card:</span> If a user is logged in and the worker is in the user's contacts, the worker card will display a different color and the 'request contact' button is replaced with a 'leave a review' button. If a user is logged in and the user has requested the contact, the worker card will also display a different color, and the 'request contact' button is replaced with a message stating 'contact requested.'</p>

                <p><span className='feature'>Delete Account:</span> From the account page, the user has the option to delete their account. A modal will pop up to ask the user if they are absolutely sure, and they must provide a reason before deleting the account.</p>

                <p><span className='feature'>Email/text sent on account creation:</span></p>

                <p><span className='feature'>Email/text on account deletion:</span></p>

                <p><span className='feature'>Password recovery:</span></p>

                <p><span className='feature'>Email/text sent on contact request:</span></p>

                <p><span className='feature'>Email/text sent on new contact:</span></p>

                <p><span className='feature'>Contact Us functionality:</span></p>
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