import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

let API = 'http://localhost:3000/api'

function Cart({ token, setToken, cart, setCart, user, items, setItems, totalCart, setTotalCart, quantity, setQuantity }) {

  useEffect(() => {
    if (token) {
      fetchCart()
    }
  }, [token])

  const navigate = useNavigate()

  async function fetchCart() {
    try {
      let response = await fetch(`${API}/orders/open_orders/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
      let json = await response.json()
      if (json.id) {
        setItems(json.items)
        setCart(json)

        const totalItemAmount = items.map(item => item.price * item.quantity)
        const overallTotalAmount = totalItemAmount.reduce((acc, cur) => acc + cur, 0)
        setTotalCart(overallTotalAmount)
      }
      else {
        setItems([])
        setCart({})
      }
    }
    catch (error) {
      console.error('ERROR! in fetchCart', error)
    }
  }

  const totalItemAmount = items.map(item => item.price * item.quantity)
  const overallTotalAmount = totalItemAmount.reduce((acc, cur) => acc + cur, 0)

  async function addItem(item) {
    try {
      const response = await fetch(`${API}/order_items/${item.orderItemsId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: item.quantity + 1
          })
        })
      let json = await response.json()

      fetchCart()


    } catch (error) {
      console.error('error in adding item quantity', error)
    }
  }

  async function reduceItem(item) {
    try {
      const response = await fetch(`${API}/order_items/${item.orderItemsId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: item.quantity <= 1 ? 1 : item.quantity - 1
          })
        })
      let json = await response.json()

      fetchCart()


    } catch (error) {
      console.error('error in adding item quantity', error)
    }
  }

  async function deleteItem(item) {
    try {
      const response = await fetch(`${API}/order_items/${item.orderItemsId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
      let json = await response.json()

      fetchCart()

    } catch (error) {
      console.error('error in deleting item in cart', error)
    }
  }

  async function checkOut(cart) {
    try {
      const response = await fetch(`${API}/orders/${cart.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          isOpen: true
        })
      })
      let json = await response.json()
      fetchCart()
      navigate('/checkout')
    }
    catch (error) {
      console.error('error in checking out items', error)
    }
  }

  if (token) {
    return (

      <>
        <div id="cartPage" >
          <h2 className="mt-5 mb-4">Welcome {user.firstname} {user.lastname} to your cart!</h2>
          {
            items.length ?
              items.map(item => {
                const orderItemsId = item.orderItemsId
                return (
                  <div>
                    <div className="card m-1 mb-3 mx-auto p-2 col-12 col-sm-12 col-md-12 col-lg-12 shadow p-3 mb-5 bg-body-tertiary rounded" key={item.id}>
                      <div className="card-body">
                        <img className="card-img-top" src={item.img} />
                        <h3 className="card-title">{item.name}</h3>
                        <div className="text-body-secondary">price {item.price}</div>
                        <div className="text-body-secondary">quantity {item.quantity}</div>
                        <button type="button" className="btn btn-success" onClick={() => addItem(item)}>add item</button>
                        <button type="button" className="btn btn-danger m-1" onClick={() => reduceItem(item)}>reduce item</button>
                        <button type="button" className="btn btn-danger" onClick={() => deleteItem(item)}>DELETE</button>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <h3 id="cartEmpty" className="card-title">Cart is empty</h3>
          }
          {
            items.length ? 
            <div id="totalAmount">
              <h3 className="card-title mb-3">TOTAL AMOUNT {overallTotalAmount}</h3>
              <button type="button" className="btn btn-primary mb-5" onClick={() => checkOut(cart)}>Check Out</button>
            </div>
            : 
            <div></div>
          }
        </div>
      </>
    );
  }
  else return <div id="noItemCart" className="mt-5"><h1>You have no item in your cart</h1></div>
};


export default Cart;
