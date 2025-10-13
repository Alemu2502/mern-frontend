import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import Reviews from './reviews';
import ReviewForm from './reviewForm'; 
import { isAuthenticated } from '../auth'; 

const Product = () => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const { productId } = useParams();
  const { token } = isAuthenticated(); // Get user and token from authentication

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

 
  useEffect(() => {
    loadSingleProduct(productId);
  }, [productId]);

  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0, 100)}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {error && <h2 className="text-danger">{error}</h2>}
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}

          <h4 className="mt-4 text-success">Leave a Review</h4>
          {product._id && <ReviewForm productId={product._id} onReviewSubmit={() => loadSingleProduct(productId)} token={token} />} {/* Pass token here */}
          <h4 className="mt-4 text-primary">Reviews</h4>
          {product._id && <Reviews productId={product._id} />}
        </div>

        <div className="col-4">
          <h4 className="text-info">Related products</h4>
          {relatedProduct.map((p) => (
            <div className="mb-3" key={p._id}>
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
