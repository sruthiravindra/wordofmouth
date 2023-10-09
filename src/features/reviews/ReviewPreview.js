import { Card, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import StarRating from './StarRating';
import {selectUserById} from '../users/usersSlice';
import { formatDate } from '../../utils/formatDate';

const ReviewPreview = ({ review }) => {
    const author = useSelector(selectUserById(review.authorId));

    return (
            <Card className='review-preview'>
                <Row>
                    <Col xs='12 text-start'>
                        <div className='mb-1'>
                            <p className='d-inline review-title'>{review.title}</p>
                            <StarRating rating={review.rating}/>
                            <p className='d-inline'>({review.rating})</p>
                        </div>
                        <p className=''>{review.reviewText}</p>
                    </Col>                   
                </Row>
                <Row className='review-signature d-inline'>
                    <p>- {author.firstName} {author.lastName}</p>
                    <p>|</p>
                    <p>{formatDate(review.date)}</p>
                </Row>
        </Card>
    );
};

export default ReviewPreview;