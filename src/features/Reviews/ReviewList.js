import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectReviewsByUserId } from './reviewsSlice';
import Review from './Review';
import Loading from '../../components/Loading';

const ReviewList = ({ userId }) => {
    const reviews = useSelector(selectReviewsByUserId(userId));
    const isLoading = useSelector((state) => state.reviews.isLoading);
    const errMsg =useSelector((state) => state.reviews.errMsg);

    return (isLoading) ? (
        <Loading />
    ) : errMsg ? (
        <div>
            ERROR
        </div>
    ) : (
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