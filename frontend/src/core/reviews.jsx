import React, { useState, useEffect, useCallback } from 'react';
import { getReviews } from './apiCore';
import StarRating from './StarRating';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  const loadReviews = useCallback(() => {
    getReviews(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setReviews(data);
      }
    });
  }, [productId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {reviews.length === 0 && <p className="text-muted">No reviews yet.</p>}
      <div className="row">
        {reviews.map((review, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{review.user.name}</h5>
                <div className="card-text">
                  <StarRating count={5} value={review.rating} size={24} edit={false} />
                  <p className="mt-3">{review.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
