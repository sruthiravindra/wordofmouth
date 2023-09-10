import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import { selectReviewsByUserId } from "./reviewsSlice";
import Loading from "../../components/Loading";
import ReviewPreview from "./ReviewPreview";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ReviewCarousel = ({ userId }) => {
    const reviews = useSelector(selectReviewsByUserId(userId));
    const isLoading = useSelector((state) => state.reviews.isLoading);
    const errMsg = useSelector((state) => state.reviews.errMsg);

    return isLoading ? (
        <Loading />
    ) : errMsg ? (
        <>ERROR</>
    ) : !reviews.length ? (
        <></>
    ) : (
        <div className='mt-3'>
            <Carousel
                showArrows
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                transitionTime={500}
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