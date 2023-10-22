import { Card, Row, Col } from 'reactstrap';
import StarRating from './StarRating';
import { formatDate } from '../../utils/formatDate';

const Review = ({ review }) => {
    const author = review.author_id;

    return (
        <Card className='p-2 mb-1'>
            <Row>
                <Col xs='2' lg='1'>
                    <img 
                        src={author.profile_pic}
                        alt={`${author.first_name} ${author.last_name}`}
                        className='img-fluid profile-pic-small'
                    />
                </Col>
                <Col>
                    <Row>
                        <Col xs='12'>
                            <p className='d-inline'>{review.review_title}</p>
                            <StarRating rating={review.rating}/>
                            <p className='d-inline'>({review.rating})</p>
                            <p>{review.review_text}</p>
                        </Col>                   
                        <Col xs='12' className='text-end my-1'>
                            <p className='d-inline'>- {author.first_name} {author.last_name}</p>
                            <p className='d-inline mx-2'>|</p>
                            <p className='d-inline me-3'>{formatDate(review.createdAt)}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
};

export default Review;