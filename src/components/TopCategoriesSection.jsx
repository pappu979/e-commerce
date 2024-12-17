import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProductsByCategory } from "../utils/api";
import CheckWishlistItemButton from "./CheckWishListButton";
import Rating from "./Rating";
import image1 from "../images/m1.jpg";
import "../styles/cardStyle.css";
import "../styles/best-seller.css";

const TopCategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("beauty");

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: relatedProducts,
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProductsByCategory(selectedCategory),
    enabled: !!selectedCategory,
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container">
      <div className="title mb-4">
        <p>Best Sale</p>
        <h2>
          Top <span>Categories</span>
        </h2>
      </div>

      <div className="d-flex products-items-home">
        <div className="col-md-3 mt-5 products-items-list">
          {isCategoriesLoading ? (
            <p>Loading categories...</p>
          ) : (
            categories?.map((product, key) => (
              <div className="col-md-12 my-2" key={key}>
                <Card
                  className="h-100 text-dark"
                  style={{ border: "2px solid #e1997e", cursor: "pointer" }}
                  onClick={() => handleCategoryClick(product.slug || product)}
                >
                  <Card.Body>
                    <Card.Title>
                      {key + 1} -{" "}
                      {typeof product === "string"
                        ? product.toUpperCase().replace("-", " ")
                        : product.slug?.toUpperCase().replace("-", " ")}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))
          )}
        </div>

        <div className="col-md-9 mx-3">
          <h3 className="mb-3 text-center">{selectedCategory} Products</h3>
          {isProductsLoading ? (
            <p>Loading products...</p>
          ) : productsError ? (
            <p>Error loading products: {productsError?.message}</p>
          ) : (
            <div className="row">
              {relatedProducts?.map((product) => (
                <div className="col-md-4 mb-4" key={product?.id}>
                  <Card className="product-card" style={{ height: "100%" }}>
                    <CheckWishlistItemButton product={product} />
                    <Card.Img
                      variant="top"
                      src={product?.thumbnail || image1}
                      style={{ objectFit: "contain" }}
                    />
                    <Card.Body>
                      <Card.Title>{product?.title}</Card.Title>
                      <Rating product={product}></Rating>
                      <Card.Text>
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            paddingRight: "8px",
                          }}
                        >
                          ₹{product?.price.toFixed(2)}
                        </span>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                          }}
                        >
                          ₹
                          {(
                            product?.price +
                            (product?.price * product?.discountPercentage) / 100
                          ).toFixed(2)}
                        </span>
                        <span
                          style={{
                            fontSize: "18px",
                            position: "relative",
                            color: "#26a541",
                            fontWeight: "bold",
                            paddingLeft: "8px",
                          }}
                        >
                          {product?.discountPercentage}% off
                        </span>
                      </Card.Text>
                      <Link
                        to={`/products/${product?.id}`}
                        className="btn btn-primary mb-2"
                      >
                        View Product
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCategoriesSection;
