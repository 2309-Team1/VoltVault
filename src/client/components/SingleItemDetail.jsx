import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function ItemDetails({ token, cart, setCart }) {
  const [item, setItem] = useState(null);
  const { itemid } = useParams();

  useEffect(() => {
    console.log("Item ID:", itemid);

    if (itemid) {
      fetchSingleItemDetail();
    }
  }, [itemid]);

  async function fetchSingleItemDetail() {
    let API = "http://localhost:3000/api";

    try {
      const response = await axios.get(`${API}/items/${itemid}`);
      setItem(response.data);
    } catch (err) {
      console.error(err);
      setItem(null);
    }
  }

  const handleAddToCart = async () => {
    let API = "http://localhost:3000/api";

    try {
      if (!cart) {
        const newCartResponse = await axios.post(`${API}/orders`);
        const newCart = newCartResponse.data;
        setCart(newCart);
      }

      console.log("Adding item to cart:", item);

      await axios.post(
        `${API}/orders/add-to-cart`,
        {
          item_id: item.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Item added to cart successfully!");

    } catch (err) {
      console.error(err);
    }
  };

  if (!item) {
    return (
      <p>
        Loading... <br />
        <br />
        A wizard is never late, nor is he early, he arrives precisely when he means to. 🧙‍♂️
      </p>
    );
  }

  return (
    <div id="singleItem">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={item.img} alt={`Image of ${item.name}`} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title pb-2">{item.name} details </h2>
            <p>{item.details}</p>
            <p className="card-text"><small>Stock: {item.stock}</small></p>
            <p className="card-text"><small>Price: ${item.price}</small></p>
            <br />
            <button type="button" className="btn btn-outline-success" onClick={handleAddToCart}>
              Add item to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
