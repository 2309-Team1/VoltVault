import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ItemDetails({ token, cart, setCart, setItems, setTotalCart, user }) {
  const [item, setItem] = useState(null);
  const { itemid } = useParams();
  const API = "http://localhost:3000/api";

  useEffect(() => {
    console.log("Item ID:", itemid);

    if (itemid) {
      fetchSingleItemDetail();
    }
  }, [itemid]);

  async function fetchSingleItemDetail() {
    try {
      const response = await axios.get(`${API}/items/${itemid}`);
      setItem(response.data);
    } catch (err) {
      console.error(err);
      setItem(null);
    }
  }

  const handleAddToCart = async () => {
    try {
      if (!cart) {
        const newCartResponse = await axios.post(`${API}/orders`, {
          order_total: 0,
          items: [],
          isOpen: true,
        });
        const newCart = newCartResponse.data;
        setCart(newCart);
      }

      console.log("Adding item to cart:", item);

      const response = await axios.post(
        `${API}/orders/${cart.id}/items`,
        {
          item_id: item.id,
          quantity: 1,
          isOpen: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Item added to cart successfully!");

      // Fetch the updated cart data
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  async function fetchCart() {
    try {
      if (user && user.id) {
        let response = await axios.get(`${API}/orders/open_orders/${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        let json = response.data;

        setItems(json[0].items);

        const totalItemAmount = json[0].items.map((item) => item.price * item.quantity);
        const overallTotalAmount = totalItemAmount.reduce((acc, cur) => acc + cur, 0);
        setTotalCart(overallTotalAmount);
      }
    } catch (error) {
      console.error("ERROR! in fetchCart", error);
    }
  }

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