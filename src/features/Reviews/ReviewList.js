import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectReviewsByUserId } from './reviewsSlice';
import Review from './Review';

const ReviewList = ({ userId }) => {
    const reviewsState = useSelector((state) => state.reviews);
    const reviews = useSelector(selectReviewsByUserId(userId));
    
    if (reviewsState.isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    } 
    
    if (reviewsState.errMsg) {
        return (
            <div>
                ERROR
            </div>
        )
    }

    return (
        <Container>
            {
                reviews.map((review) => {
                    return (
                        <Review review={review} key={review.id}/>
                    )
                })
            }
        </Container>
    )
};

export default ReviewList;