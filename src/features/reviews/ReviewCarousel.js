import { Carousel } from "react-responsive-carousel";
import ReviewPreview from "./ReviewPreview";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const ReviewCarousel = ({ reviewsArray }) => {
            
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