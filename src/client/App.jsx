import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import chalk from "chalk";
import Login from "./components/Login";
import Navigations from "./components/Navigation";
import Register from "./components/Register";
import AllItems from "./components/Allitems";
import UserAccount from "./components/UserAccount";
import FilterForComputer from "./components/ComputerFilter";
import FilterForPhone from "./components/PhoneFilter";
import ItemDetails from "./components/SingleItemDetail";
import AllUsers from "./components/AllUsers";
import Cart from "./components/Cart";
import InventoryTable from "./components/InventoryTable";
import Checkout from "./components/Checkout";
import ThankYou from "./components/ThankYou";

// import Orders from './components/Orders';

function App() {
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [quantity, setQuantity] = useState(0);

  return (
    <>
      <Navigations
        token={token}
        setToken={setToken}
        admin={admin}
        setCart={setCart}
      />
      <div className="App">
        {/* <h1>VoltVault</h1> */}
        {/* <img id='comp-img' src='./computer.png'></img> */}

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
                cart={cart}
                setCart={setCart}
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
                setCart={setCart}
              />
            }
          />
          <Route path="/" element={<AllItems token={token} />} />
          <Route
            path="account"
            element={<UserAccount token={token} admin={admin} user={user} />}
          />
          <Route path="/computer" element={<FilterForComputer />} />
          <Route path="/phones" element={<FilterForPhone />} />
          <Route
            path="/items/:itemid"
            element={
              <ItemDetails token={token} cart={cart} setCart={setCart} />
            }
          />
          <Route
            path="/inventory"
            element={<InventoryTable admin={admin} token={token} />}
          />
          <Route
            path="users"
            element={<AllUsers token={token} admin={admin} />}
          />
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
                quantity={quantity}
                setQuantity={setQuantity}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                token={token}
                setToken={setToken}
                cart={cart}
                setCart={setCart}
                user={user}
                items={items}
                setItems={setItems}
                totalCart={totalCart}
                setTotalCart={setTotalCart}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            }
          />
          <Route path="/thankyou" element={<ThankYou />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
