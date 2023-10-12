import { Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReviewsByUserId, fetchReviews } from './reviewsSlice';
import Review from './Review';
import Loading from '../../components/Loading';

const ReviewList = ({ userId }) => {
    // const reviews = useSelector(selectReviewsByUserId(userId));
    const dispatch = useDispatch();
    useEffect(()=>{
        const filterdata = {filter_reviewed_user_id:userId};
        console.log(filterdata);
        dispatch(fetchReviews(filterdata));
    },[])

    const reviews = useSelector((state)=> state.reviews.reviewsArray);
    const isLoading = useSelector((state) => state.reviews.isLoading);
    const errMsg =useSelector((state) => state.reviews.errMsg);
    const pageSize = 4;
    const pageCount = Math.ceil(reviews.length / pageSize);
    const [currentPage, setCurrentPage] = useState(0);

    const changePage = (e, idx) => {
        e.preventDefault();
        setCurrentPage(idx);
        const reviewsElement = document.getElementById('reviews');
        reviewsElement.tabIndex = -1;
        reviewsElement.focus();
    }

    return isLoading ? (
        <Loading />
    ) : errMsg ? (
        <div>
            ERROR
        </div>
    ) : !reviews.length ? (
        <Container className='text-center my-5'>
            <p>No reviews yet!</p>
        </Container>
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
                                <PaginationLink onClick={e => changePage(e, idx)}>
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