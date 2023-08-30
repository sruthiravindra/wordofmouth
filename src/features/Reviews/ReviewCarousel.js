import {
     Carousel, 
     CarouselItem, 
     CarouselControl, 
     CarouselIndicators,
     CarouselCaption
} from "reactstrap";
import { useSelector } from "react-redux";
import { selectReviewsByUserId } from "./reviewsSlice";
import { useState } from "react";
import Loading from "../../components/Loading";
import ReviewPreview from "./ReviewPreview";

const ReviewCarousel = ({ userId }) => {
    const reviews = useSelector(selectReviewsByUserId(userId));
    const isLoading = useSelector((state) => state.reviews.isLoading);
    const errMsg = useSelector((state) => state.reviews.errMsg);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const next = () => {
        const nextIndex = activeIndex === reviews.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const prev = () => {
        const nextIndex = activeIndex === 0 ? reviews.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    return isLoading ? (
        <Loading />
    ) : errMsg ? (
        <>ERROR</>
    ) : !reviews.length ? (
        <></>
    ) : (
        <div className='text-center'>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={prev}
            >
                {
                    reviews.map((review, idx) => (
                        <CarouselItem key={idx}>
                            <ReviewPreview review={review}/>
                        </CarouselItem>
                    ))
                }
            </Carousel>
        </div>
    )
};

export default ReviewCarousel;