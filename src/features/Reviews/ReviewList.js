import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import Review from './Review';
import { selectReviewsByUserId } from './reviewsSlice';

const ReviewList = ({ userId }) => {
    const reviews = useSelector(selectReviewsByUserId(userId));

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