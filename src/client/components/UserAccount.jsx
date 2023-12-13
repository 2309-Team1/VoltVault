import axios from "axios";
import { useEffect, useState } from "react";
let API = "http://localhost:3000/api";
import { Link } from "react-router-dom";

function UserAccount({ token, admin, user }) {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [itemsHistory, setItemsHistory] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  async function fetchUser() {
    if (token) {
      try {
        let { data } = await axios.get(`${API}/users/account`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setFirstName(data.firstname);
        setUsername(data.username);
        setEmail(data.email);
        setLastName(data.lastname);
        setAddress(data.address);
        setAddress2(data.address2);
        setCity(data.city);
        setState(data.state);
        setZip(data.zip);
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function fetchOrders() {
    if (token) {
      try {
        let { data } = await axios.get(`${API}/users/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setFirstName(data.firstname);
        setUsername(data.username);
        setEmail(data.email);
        setLastName(data.lastname);
        setAddress(data.address);
        setAddress2(data.address2);
        setCity(data.city);
        setState(data.state);
        setZip(data.zip);
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function fetchOrders() {
    try {
      let response = await fetch(`${API}/orders/complete_orders/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let orderHistory = await response.json();
      console.log(orderHistory);
      setOrdersHistory(orderHistory);
      const itemsInOrder = json.map((order) => order.items);
      const itemArrays = itemsInOrder.map((itemArray) => itemArray);
      console.log(itemArrays);
      console.log(itemsInOrder);
      setItemsHistory(itemsInOrder);
      console.log(itemsHistory);
    } catch (error) {
      console.error("error in fetching order history", error);
    }
  }

  // async function fetchOrders() {
  //   try {
  //     let { data } = await axios.get(`${API}/`);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  // if (!token) {
  //   return <h2>Please login or create an account.</h2>;
  // } else {
  //   return (
  //     <>
  //       <h1>Hi, {firstName}</h1>
  //       <h2>Your Username: {username}</h2>
  //       <h2>Your Email: {email}</h2>
  //     </>
  //   );
  // }

  if (!token) {
    return (
      <h2 class="needSignIn">
        Please <Link to="/login">login</Link> or{" "}
        <Link t="/register">create an account</Link>.
      </h2>
    );
  } else if (token && admin) {
    return (
      <>
        <div id="admin-account-background">
          <h1>Hi, {firstName}</h1>
          <h2>Your Username: {username}</h2>
          <h2>Your Email: {email}</h2>
          <h2>Your First Name: {firstName}</h2>
          <h2>Your Last Name: {lastName}</h2>
          <h2>Your Address: {address}</h2>
          <h2>Your Address 2: {address2}</h2>
          <h2>Your City: {city}</h2>
          <h2>Your State: {state}</h2>
          <h2>Your Zipcode: {zip}</h2>
        </div>
        <form>
          <label>
            {" "}
            User
            <input type="radio" name="adminAccess" value="user" />
          </label>
          <label>
            {" "}
            Admin
            <input type="radio" name="adminAccess" value="Admin" />
          </label>
        </form>
        {ordersHistory.length ? (
          ordersHistory.map((order) => {
            return (
              <div>
                <div>Order ID: {order.id}</div>
                <div>Order Date: {order.order_date.slice(0, 10)}</div>
                <div>Order Total: {order.order_total}</div>
              </div>
            );
          })
        ) : (
          <h2>no order history</h2>
        )}
      </>
    );
  } else {
    return (
      <>
        <div id="account-background">
          <h1>Hi, {firstName}</h1>
          <h2>Your Username: {username}</h2>
          <h2>Your Email: {email}</h2>
          <h2>Your First Name: {firstName}</h2>
          <h2>Your Last Name: {lastName}</h2>
          <h2>Your Address: {address}</h2>
          <h2>Your Address 2: {address2}</h2>
          <h2>Your City: {city}</h2>
          <h2>Your State: {state}</h2>
          <h2>Your Zipcode: {zip}</h2>
        </div>
        {ordersHistory.length ? (
          ordersHistory.map((order) => {
            return (
              <div>
                <div>Order ID: {order.id}</div>
                <div>Order Date: {order.order_date.slice(0, 10)}</div>
                <div>Order Total: {order.order_total}</div>
              </div>
            );
          })
        ) : (
          <h2>no order history</h2>
        )}
      </>
    );
  }
}

export default UserAccount;
