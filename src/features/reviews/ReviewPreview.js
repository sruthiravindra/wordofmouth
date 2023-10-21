import { Card, Row, Col } from 'reactstrap';
import StarRating from './StarRating';
import { formatDate } from '../../utils/formatDate';

const ReviewPreview = ({ review }) => {
    const author = review.author_id;

    return (
        <Card className='review-preview'>
            <Row>
                <Col xs='12 text-start'>
                    <div className='mb-1'>
                        <p className='d-inline review-title'>{review.review_title}</p>
                        <StarRating rating={review.rating}/>
                        <p className='d-inline'>({review.rating})</p>
                    </div>
                    <p className=''>{review.review_text}</p>
                </Col>                   
            </Row>
            <Row className='review-signature d-inline'>
                <p>- {author.first_name} {author.last_name}</p>
                <p>|</p>
                <p>{formatDate(review.createdAt)}</p>
            </Row>
        </Card>
    );
};

export default ReviewPreview;