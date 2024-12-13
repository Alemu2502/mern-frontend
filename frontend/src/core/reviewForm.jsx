import React, { useState, useEffect } from 'react';
import { addReview, getUserReview, updateReview, deleteReview, hasDelivered } from './apiCore';
import StarRating from './StarRating';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user, token } = isAuthenticated();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [reviewId, setReviewId] = useState('');
  const [hasCheckedReview, setHasCheckedReview] = useState(false);
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    const checkReviewExists = async () => {
      if (user && token && !hasCheckedReview) {
        try {
          const deliveryResponse = await hasDelivered(productId, user._id, token);
          
          if (deliveryResponse.delivered) {
            setDelivered(true);
            try {
              const data = await getUserReview(productId, user._id, token);

              if (data && !data.error) {
                setRating(data.rating);
                setComment(data.comment);
                setReviewId(data._id);
              }
            } catch (err) {
              setMessage('Failed to fetch user review.');
              setIsError(true);
            }
          } else {
            setDelivered(false);
            setMessage('Only customers who have received their order can leave a review.');
            setIsError(true);
          }
        } catch (err) {
          setMessage('Failed to check delivery status.');
          setIsError(true);
        } finally {
          setHasCheckedReview(true);
        }
      }
    };

    if (user && token && !hasCheckedReview) {
      checkReviewExists();
    }
  }, [productId, user, token, hasCheckedReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('Please sign in first to leave a review.');
      setIsError(true);
      return;
    }
    if (!delivered) {
      setMessage('Only customers who have received their order can leave a review.');
      setIsError(true);
      return;
    }
    if (rating === 0) {
      setMessage('Please select a star rating.');
      setIsError(true);
      return;
    }

    const review = { rating, comment };
    try {
      let response;
      if (reviewId) {
        response = await updateReview(reviewId, review, token, user._id);
      } else {
        response = await addReview(productId, user._id, review, token);
        if (!response.error) {
          setReviewId(response._id);
        }
      }

      if (!response.error) {
        onReviewSubmit();
        setMessage(reviewId ? 'Your review has been updated successfully!' : 'Thank you for your review!');
        setIsError(false);
      } else {
        setMessage('Failed to submit review. Please try again.');
        setIsError(true);
      }
    } catch (err) {
      setMessage('Error submitting review. Please try again.');
      setIsError(true);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteReview(reviewId, productId, user._id, token);

      if (!response.error) {
        onReviewSubmit();
        setRating(0);
        setComment('');
        setReviewId('');
        setMessage('Your review has been deleted.');
        setIsError(false);
      } else {
        setMessage('Failed to delete review. Please try again.');
        setIsError(true);
      }
    } catch (err) {
      setMessage('Error deleting review. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="container my-4">
      {message && (
        <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
          {message} {message === 'Please sign in first to leave a review.' && <Link to="/signin" className="alert-link">Sign in</Link>}
        </div>
      )}
      {delivered ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating</label>
              <StarRating
                count={5}
                value={rating}
                size={24}
                color="#ffd700"
                edit={true}
                onChange={setRating}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                className="form-control"
                rows="4"
                required
              />
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              <button type="submit" className="btn btn-primary mb-2 me-2">{reviewId ? 'Update Review' : 'Submit Review'}</button>
              {reviewId && (
                <button type="button" onClick={handleDelete} className="btn btn-danger mb-2">Delete Review</button>
              )}
            </div>
          </form>
        </>
      ) : (
        !isError && <div className="alert alert-info" role="alert">Only customers who have received their order can leave a review.</div>
      )}
    </div>
  );
};

export default ReviewForm;
