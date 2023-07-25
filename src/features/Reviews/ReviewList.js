import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import Review from './Review';
import { selectReviewsByUserId } from './reviewsSlice';

const ReviewList = ({ userId }) => {
    const reviews = useSelector(selectReviewsByUserId(userId));
    console.log(reviews);

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