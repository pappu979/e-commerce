import React from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactStars from "react-stars";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useLocation } from "react-router-dom";

const ReviewPage = () => {

    const [review, setReview] = React.useState("");
    const [ratingStar, setRatingStar] = React.useState(0);
    const [reviews, setReviews] = React.useState([]);
    const [userName, setUserName] = React.useState([]);
    const location = useLocation();
    const { product, productID } = location?.state || {};

    const ratingChanged = (newRating) => {
        setRatingStar(newRating);
    };

    React.useEffect(() => {
        const userData = localStorage.getItem("userData");
        const storedReviews = localStorage.getItem("reviews");

        if (userData) {
            const parsedData = JSON.parse(userData);
            setUserName(parsedData?.username || "Unknown User");
        }

        if (storedReviews) {
            const allReviews = JSON.parse(storedReviews);
            setReviews(allReviews[productID] || []);
        }
    }, [productID]);

    const submitReview = () => {
        if (ratingStar <= 0 || !review.trim()) {
            alert("Please leave a rating and write a review!")
        } else {
            const currentDate = new Date().toLocaleDateString("en-GB");
            const payload = {
                review: review,
                rating: ratingStar,
                date: currentDate,
                userName: userName,
            };

            // Fetch all reviews from localStorage
            const storedReviews = JSON.parse(localStorage.getItem("reviews")) || {};
            const productReviews = storedReviews[productID] || [];  // check the any review inside the storedReviews object 

            const updatedReviews = [...productReviews, payload];
            storedReviews[productID] = updatedReviews; // update the storedReviews object for this particular productId...

            // Add the new review to the reviews array
            setReviews(updatedReviews);

            localStorage.setItem("reviews", JSON.stringify(storedReviews))
            Swal.fire({
                title: "Successfully Submitted!",
                text: "Thanks for reviewing our product",
                icon: "success",
                confirmButtonText: "Continue Shopping",
            })
        }

        setReview("");
        setRatingStar(0);
    }


    const deleteReview = (index) => {
        const updateReviews = reviews.filter((_, i) => i !== index);

        const storedReviews = JSON.parse(localStorage.getItem("reviews")) || {};
        storedReviews[productID] = updateReviews;

        setReviews(updateReviews);
        localStorage.setItem("reviews", JSON.stringify(storedReviews));

        Swal.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
            confirmButtonText: "Okay",
        });
    }

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
            <label htmlFor="" className="mb-2">Leave your review here</label>
            <div className="form-floating mb-3">

                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: 100 }}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>

            <div>
                <button className="btn btn-dark"
                    onClick={submitReview}
                    style={{
                        position: "relative",
                        backgroundColor: "#ff9f00",
                        border: "none",
                        padding: "11px 16px",
                        borderRadius: "0px"
                    }}>
                    Submit Review
                </button>
            </div>

            <div className="mt-4 container">
                <h4>Customer Reviews</h4>
                {reviews?.length > 0 ? (
                    reviews.map((item, index) => (
                        <div className="row mt-4"
                            key={index}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                backgroundColor: "#f9f9f9",
                            }}>
                            <div
                                className="review-card col-md-11"
                            >
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
                                >
                                </FontAwesomeIcon>
                                <ReactTooltip id="delete-tooltip" place="top" content="Remove review" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews submitted yet.</p>
                )}
            </div>
        </div>
    )
};

export default ReviewPage;