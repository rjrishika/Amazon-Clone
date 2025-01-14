import React from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider/StateProvider";
function Product(props) {
  const theme = window.localStorage.getItem("theme-azclone")
    ? window.localStorage.getItem("theme-azclone")
    : "light";
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        rating: props.rating,
      },
    });
  };
  return (
    <div className={theme === "light" ? "product" : "product__dark product"}>
      <div className="product__info">
        <p>{props.title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{props.price}</strong>
        </p>
        <div className="product__rating">
          {Array(props.rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={props.image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
