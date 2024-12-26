import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { fetchCategories } from "../utils/api";
import "../styles/cardStyle.css";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

export default function HomeCategoriesSection() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div className="container">
      <div className="my-5 text-center text-dark">
        <h1>Categories</h1>
        <p className="text-dark categories-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          illum, laudantium earum sit saepe dolore aperiam vitae ullam iusto
          deserunt
        </p>
      </div>

      <div className="row ">
        {isLoading ? (
          <Loader></Loader>
        ) : (
          categories.map((val, key) => (
            <div className="col-md-3" key={key}>
              <Link
                className="text-decoration-none"
                to={`/products/category/${val.slug}`}
              >
                <Card className="h-100 text-danger">
                  <Card.Body>
                    <Card.Title>
                      {key + 1} - {val.slug.toUpperCase().replace("-", " ")}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))
        )}
      </div>
      {isError && <p>Error fetching products. Please try again later.</p>}
    </div>
  );
}
