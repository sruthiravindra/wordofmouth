import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import { selectReviewsByUserId } from "./reviewsSlice";
import Loading from "../../components/Loading";
import ReviewPreview from "./ReviewPreview";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ReviewCarousel = ({ userId }) => {
    const reviews = useSelector(selectReviewsByUserId(userId));
    const isLoading = useSelector((state) => state.reviews.isLoading);
    const errMsg = useSelector((state) => state.reviews.errMsg);
    const renderArrowPrev = (onClickHandler, hasPrev, label) => {
        <button 
            type="button" 
            onClick={onClickHandler} 
            title={label}
            className='carousel-arrow-prev'
        >
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    }

    return isLoading ? (
        <Loading />
    ) : errMsg ? (
        <>ERROR</>
    ) : !reviews.length ? (
        <></>
    ) : (
        <div>
            <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                transitionTime={500}
                className='review-carousel'
            >
                {
                    reviews.map((review, idx) => (
                        <div key={idx}>
                            <ReviewPreview review={review}/>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
};

export default ReviewCarousel;