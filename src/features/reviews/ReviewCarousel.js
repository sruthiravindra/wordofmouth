import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import { selectReviewsByUserId } from "./reviewsSlice";
import Loading from "../../components/Loading";
import ReviewPreview from "./ReviewPreview";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ReviewCarousel = ({ reviewsArray }) => {
    console.log('reviews array', reviewsArray);
        
    return (
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
                    reviewsArray.map((review, idx) => (
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