import { Card, Row, Col } from 'reactstrap';
import StarRating from './StarRating';
import {selectUserById} from '../Users/UsersSlice';
import { formatDate } from '../../utils/formatDate';

const Review = ({ review }) => {
    const author = selectUserById(review.authorId) 

    return (
        <Card className='pt-2'>
            <div className='d-flex align-items-center'>
                <div class='flex-shrink-0 m-2'>
                    <img 
                        src={author.profilePic}
                        alt='user profile picture'
                        width='50px'
                    />
                </div>
                <div class='flex-grow-1'> 
                    <Row>
                        <Col>
                            <p className='d-inline'>{review.title}</p>
                            <StarRating />
                            <p className='d-inline'>({review.rating})</p>
                            <p>{review.description}</p>
                        </Col>                   
                        <Col>
                            <p className='d-inline'>- {author.firstName} {author.lastName}</p>
                            <p className='d-inline ms-2'>{formatDate(review.date)}</p>
                        </Col>
                    </Row>  
                </div>
            </div>
        </Card>
    )
};

export default Review;