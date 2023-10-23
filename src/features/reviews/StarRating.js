<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

const StarRating = (props) => {
    const rate_weightage=[1,2,3,4,5];
    return (
        <div className='d-inline mx-2 star-rating'>
            {
                // updated by sruthi: start :: changed the star rating to display based on rating value
                rate_weightage.map((weight, idx)=>{
                    return (
                        (props.rating>=weight) ? <i className='fa fa-star' key={idx}></i> 
                        : (((weight-props.rating)<1) ? <i className='fa fa-star-half-o' key={idx}></i> 
                        : <i className='fa fa-star-o' key={idx}></i> )
                    );
                })
                // updated by sruthi: end :: changed the star rating to display based on rating value
            }
            {/* commented by sruthi <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i> */}
        </div>
    );
};

export default StarRating;