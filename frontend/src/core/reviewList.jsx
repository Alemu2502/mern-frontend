import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const ReviewList = ({ reviews }) => {
    return (
        <div className="container">
            <div className="row">
                {reviews.map(review => (
                    <div key={review._id} className="col-12 col-md-6 col-lg-4 mb-4 review-item">
                        <div className="card h-100">
                            <div className="card-body">
                                <StarRating rating={review.rating} />
                                <p>{review.comment}</p>
                                <small>By {review.user.name} on {new Date(review.createdAt).toLocaleDateString()}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ReviewList.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            comment: PropTypes.string.isRequired,
            user: PropTypes.shape({
                name: PropTypes.string.isRequired
            }).isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ReviewList;
