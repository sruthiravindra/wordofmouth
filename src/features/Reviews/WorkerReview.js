import { Card, Row, Col } from 'reactstrap';
import StarRating from './StarRating';

const WorkerReview = ({ user, workerId}) => {
    return (
        <Card className='pt-2'>
            <div className='d-flex align-items-center'>
                <div class='flex-shrink-0 m-2'>
                    <img 
                        src='../../app/assets/img/profile-default.png'
                        alt='user profile picture'
                    />
                </div>
                <div class='flex-grow-1'>
                    <p className='d-inline'>Review Title</p>
                    <StarRating />
                    <p className='d-inline'>(*)</p>
                    <p>review description</p>
                </div>
            </div>
        </Card>
    )
};

export default WorkerReview;