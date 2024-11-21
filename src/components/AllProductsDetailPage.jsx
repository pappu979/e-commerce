import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWishlist } from "../provider/WishlistProvider";
import useWishlistHandler from "../provider/useWishlistHandler";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useQuery } from "@tanstack/react-query";
import Rating from "./Rating";
import { fetchProducts } from "../utils/api";
import "../styles/AllProducts.css";

const categorizeProducts = (products) => {
  return products?.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});
};


export default function AllProductsDetailPage() {

  const { addToWishList, wishlistItem, removeFromWishList } = useWishlist();
  const { handleWishlistClick } = useWishlistHandler(wishlistItem, addToWishList, removeFromWishList);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"], 
    queryFn: fetchProducts,
  });

  const categorizedProducts = React.useMemo(() => {
    return products ? categorizeProducts(products) : {};
  }, [products])

  if (isError) {
    return <div>Error fetching products. Please try again later.</div>;
  }

  return (
    <div className="products-container" style={{ color: "#e1997e" }}>
      <div className="container">
        <h1 className="text-center mb-5">All Products</h1>
        {Object.keys(categorizedProducts)?.map((category) => (
          <div className="category-row" key={category}>
            <h2 className="category-title mb-4">{category}</h2>
            <div className="row justify-content-center">
              {isLoading ? (
                <>
                  <div className="col-md-4 mb-4 shimmer-card" />
                  <div className="col-md-4 mb-4 shimmer-card" />
                  <div className="col-md-4 mb-4 shimmer-card" />
                </>
              ) : (
                categorizedProducts[category]?.map((product) => (
                  <div className="col-md-4 mb-4" key={product.id}>

                    <Card
                      className="product-card"
                      style={{
                        height: "100%",
                        border: "2px solid #e1997e",
                      }}
                    >
                      <div className="image-container">
                        <button onClick={() => handleWishlistClick(product)} className="btn" data-tooltip-id="wishlistItem-tooltip">
                          {
                            wishlistItem.some((item) => item?.id === product?.id) ?
                              <FavoriteIcon color="error" />
                              : <FavoriteBorderIcon />
                          }
                        </button>
                        <ReactTooltip
                          id="wishlistItem-tooltip"
                          place="top"
                          key={wishlistItem.some((item) => item?.id === product?.id) ? 'in-wishlist' : 'not-in-wishlist'}
                          content={wishlistItem.some((item) => item?.id === product?.id)
                            ? "Remove From Wishlist"
                            : "Add Item to Wishlist"}

                        />
                        <Card.Img
                          className="product-image"
                          variant="top"
                          src={product.thumbnail}
                        />
                      </div>
                      <Card.Body className="mt-2">
                        <Card.Title className="product-title">
                          {product.title}
                        </Card.Title>

                        <Rating product={product}></Rating>

                        <Card.Text>
                          <span
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              paddingRight: "8px"
                            }}
                          >
                            ₹{(product?.price).toFixed(2)}
                          </span>

                          <span
                            style={{
                              textDecoration: 'line-through',
                              color: '#888',
                            }}
                          >
                            ₹{(product?.price + ((product?.price * product?.discountPercentage) / 100)).toFixed(2)}
                          </span>
                          <span
                            style={{
                              fontSize: "18px",
                              position: "relative",
                              color: "#26a541",
                              fontWeight: "bold",
                              paddingLeft: "8px"
                            }}
                          >
                            {product?.discountPercentage}% off
                          </span>
                        </Card.Text>
                        <div className="mt-auto mb-2">
                          <Link to={`/products/${product.id}`}
                            className="btn"
                            style={{ backgroundColor: "rgb(225, 153, 126)" }}
                            data-tooltip-id="viewProduct-tooltip"
                          >
                            View Product Details
                          </Link>
                          <ReactTooltip id="viewProduct-tooltip" place="top" content="View Product Details" />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}