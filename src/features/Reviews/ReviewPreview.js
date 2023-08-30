import { Card, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import StarRating from './StarRating';
import {selectUserById} from '../users/usersSlice';
import { formatDate } from '../../utils/formatDate';

const ReviewPreview = ({ review }) => {
    const author = useSelector(selectUserById(review.authorId));

    return (
            <Card className='p-2 mx-1 mt-3 review-preview'>
                <Row>
                    <Col xs='12 text-start'>
                        <p className='d-inline'>{review.title}</p>
                        <StarRating rating={review.rating}/>
                        <p className='d-inline'>({review.rating})</p>
                        <hr />
                        <p>{review.reviewText}</p>
                    </Col>                   
                </Row>
                <Row className='text-end my-1 d-inline'>
                    <p className='d-inline'>- {author.firstName} {author.lastName}</p>
                    <p className='d-inline'>|</p>
                    <p className='d-inline me-3'>{formatDate(review.date)}</p>
                </Row>
        </Card>
    );
};

export default ReviewPreview;