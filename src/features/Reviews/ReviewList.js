import { Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectReviewsByUserId } from './reviewsSlice';
import Review from './Review';
import Loading from '../../components/Loading';

const ReviewList = ({ userId }) => {
    const reviews = useSelector(selectReviewsByUserId(userId));
    const isLoading = useSelector((state) => state.reviews.isLoading);
    const errMsg =useSelector((state) => state.reviews.errMsg);
    const pageSize = 4;
    const pageCount = Math.ceil(reviews.length / pageSize);
    const [currentPage, setCurrentPage] = useState(0);

    const changePage = (e, idx) => {
        e.preventDefault();
        setCurrentPage(idx);
    }

    return (isLoading) ? (
        <Loading />
    ) : errMsg ? (
        <div>
            ERROR
        </div>
    ) : (
        <Container>
            {
                reviews.slice(
                    currentPage * pageSize,
                    (currentPage + 1) * pageSize
                )
                .map((review) => {
                    return (
                        <Review review={review} key={review.id}/>
                    )
                })
            }
            <div className='d-flex justify-content-center mt-5'>
                <Pagination>
                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink first href='#reviews'/>
                    </PaginationItem>
                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink 
                            previous 
                            href='#'
                            onClick={e => changePage(e, currentPage - 1)}    
                        />
                    </PaginationItem>
                    {
                        [...Array(pageCount)].map((page, idx) => (
                            <PaginationItem active={idx === currentPage} key={idx}>
                                <PaginationLink onClick={e => changePage(e, idx)} href='#reviews'>
                                    {idx + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                
                    <PaginationItem disabled={currentPage >= (pageCount - 1)}> 
                        <PaginationLink 
                            next 
                            href='#reviews'
                            onClick={e => changePage(e, currentPage + 1)}    
                        />
                    </PaginationItem>
                </Pagination>
            </div>
        </Container>

    )
};

export default ReviewList;