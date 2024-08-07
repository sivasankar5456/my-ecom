import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { RouteConstants } from "../constants/RouteConstants";
import { Link } from "react-router-dom";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Endpoints } from "../constants/Endpoints";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/redux/actions";

export default function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCart, setIsCart] = useState(false);

  // Fetch product data from API
  useEffect(() => {
    dispatch(actions.getProducts());
  }, []);
  useEffect(() => {
    if(products.data===null){
      setTimeout(() => {
        setLoading(false)
      }, 5000);
    }
  }, []);

  const handleFavoriteClick = () => {
    // Add product to wishlist logic here
    // Example: localStorage.setItem('wishList', JSON.stringify([...wishList, productId]));
    toast.success("Added to wishlist successfully!");
    setIsFavorite(!isFavorite);
  };

  const addToCart = () => {
    // Add product to cart logic here
    // Example: localStorage.setItem('cart', JSON.stringify([...cart, productId]));
    toast.success("Added to cart successfully!");
  };

  return (
    <>
      { !products.data && loading? <div className="text-center">Loading...</div>: products.data===null ?<div className="text-center">{products.message}</div>:''}
      <div className="product-styles">
        {products.data && (
          products?.data?.map((item, index) =>{ 
            return(
            <div key={index} className="product-card">
              <Link to={RouteConstants.PRODUCT_DETAILS + item.id}>
                <img
                  src={item.thumbnail}
                  height="150"
                  className="prod-img"
                  width="300"
                  alt="Product Image"
                />
                <h2 className="text-black">{item.title}</h2>
              </Link>
              <div className="like">
                <div onClick={handleFavoriteClick}>
                  {isFavorite ? (
                    <FavoriteIcon className="filled" />
                  ) : (
                    <FavoriteBorderOutlinedIcon className="outlined" />
                  )}
                </div>
              </div>
              <p className="desc">{item.description}</p>
              <div className="d-flex price-sec">
                <p className="price mb-0">${item.price}</p>
                {/* <p>4.9</p> */}
                {isCart ? (
                  <button className="add-cart-btn">Remove</button>
                ) : (
                  <button onClick={addToCart} className="add-cart-btn">
                    Add to Cart
                  </button>
                )}
{/* <button className="add-cart-btn btn-icon">
                <CachedOutlinedIcon/> Adding to Cart
                Added to Cart
              </button> */}          
              </div>
            </div>
          )})
        )}
      </div>
      <ToastContainer theme="colored" />
    </>
  );
}
