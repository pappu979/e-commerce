import React from "react";
import Swal from "sweetalert2";
import ReactStars from "react-stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";
import { storedReviews } from "../utils/helperFunction/authKeys";
import { useSelector } from "react-redux";

const ReviewPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [newReview, setNewReview] = React.useState("");
  const [ratingStar, setRatingStar] = React.useState(0);
  const [totalReviews, setTotalReviews] = React.useState([]);
  const location = useLocation();
  const { product, productID } = location?.state || {};

  const ratingChanged = (newRating) => {
    setRatingStar(newRating);
  };

  React.useEffect(() => {
    if (storedReviews) {
      setTotalReviews(storedReviews[productID] || []);
    }
  }, [productID]);

  const submitReview = () => {
    if (ratingStar <= 0 || !newReview.trim()) {
      alert("Please leave a rating and write a review!");
    } else {
      const currentDate = new Date().toLocaleDateString("en-GB");
      const payload = {
        review: newReview,
        rating: ratingStar,
        date: currentDate,
        userName: currentUser.username,
      };

      // check the any review inside the storedReviews object
      const productReviews = storedReviews[productID] || [];
      const updatedReviews = [...productReviews, payload];

      // update the storedReviews object for this particular productId...
      storedReviews[productID] = updatedReviews;

      // Add the new review to the reviews array
      setTotalReviews(updatedReviews);

      localStorage.setItem("reviews", JSON.stringify(storedReviews));
      Swal.fire({
        title: "Successfully Submitted!",
        text: "Thanks for reviewing our product",
        icon: "success",
        confirmButtonText: "Continue Shopping",
      });
    }

    setNewReview("");
    setRatingStar(0);
  };

  const deleteReview = (index) => {
    const updateReviews = totalReviews.filter((_, i) => i !== index);

    storedReviews[productID] = updateReviews;

    setTotalReviews(updateReviews);
    localStorage.setItem("reviews", JSON.stringify(storedReviews));

    Swal.fire({
      title: "Deleted!",
      text: "Your review has been deleted.",
      icon: "success",
      confirmButtonText: "Okay",
    });
  };

  return (
    <div className="mt-4 container" style={{ color: "#e1997e" }}>
      <h3 className="mb-2">Create Reviews for {product.title}</h3>
      <p>Overall Rating</p>
      Rate Us:
      <ReactStars
        count={5}
        size={24}
        value={ratingStar}
        onChange={ratingChanged}
        color2={"#ffd700"}
      />
      <label htmlFor="" className="mb-2">
        Leave your review here
      </label>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style={{ height: 100 }}
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
      </div>
      <div>
        <button
          className="btn btn-dark"
          onClick={submitReview}
          style={{
            position: "relative",
            backgroundColor: "#ff9f00",
            border: "none",
            padding: "11px 16px",
            borderRadius: "0px",
          }}
        >
          Submit Review
        </button>
      </div>
      <div className="mt-4 container">
        <h4>Customer Reviews</h4>
        {totalReviews?.length > 0 ? (
          totalReviews.map((item, index) => (
            <div
              className="row mt-4"
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div className="review-card col-md-11">
                <p>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <i
                      className="fa fa-user-circle"
                      style={{
                        fontSize: "20px",
                        marginRight: "8px",
                        color: "#555",
                      }}
                    ></i>
                    {item.userName}
                  </span>
                </p>
                <p>
                  <ReactStars
                    count={5}
                    size={20}
                    value={item.rating}
                    edit={false}
                    color2={"#ffd700"}
                  />
                </p>
                <p>Reviewed at: {item.date}</p>
                <p>
                  <strong>Review:</strong> {item.review}
                </p>
              </div>
              <div className="col-md-1">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteReview(index)}
                  style={{ cursor: "pointer" }}
                  data-tooltip-id="delete-tooltip"
                ></FontAwesomeIcon>
                <ReactTooltip
                  id="delete-tooltip"
                  place="top"
                  content="Remove review"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No reviews submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
