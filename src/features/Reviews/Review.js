import { Card, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import StarRating from './StarRating';
import {selectUserById} from '../users/UsersSlice';
import { formatDate } from '../../utils/formatDate';

const Review = ({ review }) => {
    const author = useSelector(selectUserById(review.authorId));

    return (
        <Card className='p-2 mb-1'>
            <Row>
                <Col xs='2' lg='1'>
                    <img 
                        src={author.profilePic}
                        alt='user profile picture'
                        className='img-fluid'
                    />
                </Col>
                <Col>
                    <Row>
                        <Col xs='12'>
                            <p className='d-inline'>{review.title}</p>
                            <StarRating rating={review.rating}/>
                            <p className='d-inline'>({review.rating})</p>
                            <p>{review.reviewText}</p>
                        </Col>                   
                        <Col xs='12' className='text-end my-1'>
                            <p className='d-inline'>- {author.firstName} {author.lastName}</p>
                            <p className='d-inline mx-2'>|</p>
                            <p className='d-inline me-3'>{formatDate(review.date)}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
};

export default Review;