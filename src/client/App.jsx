import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navigations from "./components/Navigation";
import Register from "./components/Register";
import AllItems from "./components/AllItems"; // Adjusted the component name
import UserAccount from "./components/UserAccount";
import FilterForComputer from "./components/ComputerFilter";
import FilterForPhone from "./components/PhoneFilter";
import ItemDetails from "./components/SingleItemDetail";
import AllUsers from "./components/AllUsers";
import Cart from "./components/Cart";

function App() {
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [admin, setAdmin] = useState(false);

  return (
    <>
      <h1>{user.id}</h1>
      <Navigations token={token} setToken={setToken} admin={admin} />
      <div className="App">
        <Routes>
          <Route
            path="login"
            element={
              <Login
                token={token}
                setToken={setToken}
                user={user}
                setUser={setUser}
                setAdmin={setAdmin}
              />
            }
          />
          <Route
            path="register"
            element={
              <Register
                token={token}
                setToken={setToken}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route path="/" element={<AllItems token={token} />} />
          <Route
            path="account"
            element={<UserAccount token={token} admin={admin} />}
          />
          <Route path="/computer" element={<FilterForComputer />} />
          <Route path="/phones" element={<FilterForPhone />} />
          <Route
            path="/items/:itemid"
            element={<ItemDetails token={token} cart={cart} setCart={setCart} />}
          />
          <Route path="users" element={<AllUsers token={token} admin={admin} />} />
          <Route
            path="/cart"
            element={
              <Cart
                token={token}
                setToken={setToken}
                cart={cart}
                setCart={setCart}
                user={user}
                items={items}
                setItems={setItems}
                totalCart={totalCart}
                setTotalCart={setTotalCart}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
