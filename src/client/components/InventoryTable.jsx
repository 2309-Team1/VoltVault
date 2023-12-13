import { useEffect, useState } from "react";
import axios from "axios";
let API = "http://localhost:3000/api";
import Popup from "reactjs-popup";

function InventoryTable({ admin, token }) {
  const [inventory, setInventory] = useState([]);

  // EDIT ITEMS CONSTS
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();

  // CREATE ITEM CONSTS
  const [newItemName, setNewItemName] = useState("");
  const [newItemDetails, setNewItemDetails] = useState("");
  const [newItemPrice, setNewItemPrice] = useState();
  const [newItemImg, setNewItemImg] = useState("");
  const [newItemCat, setNewItemCat] = useState("");
  const [newItemStock, setNewItemStock] = useState();

  useEffect(() => {
    fetchAllInventory();
  }, []);

  async function fetchAllInventory() {
    try {
      let { data } = await axios.get(`${API}/items/inventory`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setInventory(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addItem() {
    try {
      const { data } = await axios.post(
        `${API}/items`,
        {
          name: newItemName,
          price: newItemPrice,
          details: newItemDetails,
          img: newItemImg,
          category: newItemCat,
          stock: newItemStock,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("POST SENT: ", data);
      console.log(data.img);
      fetchAllInventory();
      setNewItemName("");
      setNewItemDetails("");
      setNewItemPrice();
      setNewItemImg("");
      setNewItemCat("");
      setNewItemStock();
    } catch (err) {
      console.error(err.message);
    }
  }

  async function editItem(id) {
    try {
      const { data } = await axios.patch(
        `${API}/items/${id}`,
        { name, description, price, stock },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("PATCH SENT: ", data);
      fetchAllInventory();
      setName("");
      setDescription("");
      setPrice();
      setStock();
    } catch (err) {
      console.error(err.message);
    }
  }

  async function destroyItem(id) {
    try {
      await axios.delete(`${API}/items/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllInventory();
    } catch (err) {
      console.error(err);
    }
  }

  if (admin) {
    return (
      <>
        <div className="col-11 col-sm-11 col-md-11 col-lg-11 m-5">
          <h1 id="invTitle">Inventory</h1>
          <Popup
            trigger={
              <button type="button" className="btn btn-outline-success s-1">
                Add User
              </button>
            }
            position="center"
            modal
            nested
          >
            {(close) => (
              <div className="p-3 bg-light rounded border border-dark">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addItem();
                    close();
                  }}
                >
                  <h3>Add New Item</h3>
                  <label>
                    Item Name
                    <input
                      type="text"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                    />
                  </label>
                  <label>
                    Item Details
                    <textarea
                      value={newItemDetails}
                      onChange={(e) => setNewItemDetails(e.target.value)}
                    />
                  </label>
                  <label>
                    Category
                    <select
                      value={newItemCat}
                      onChange={(e) => setNewItemCat(e.target.value)}
                    >
                      <option value="Phone">Phone</option>
                      <option value="Computer">Computer</option>
                    </select>
                  </label>
                  <label>
                    Price
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                    />
                  </label>
                  <label>
                    Stock
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newItemStock}
                      onChange={(e) => setNewItemStock(e.target.value)}
                    />
                  </label>
                  <label>
                    Image
                    <input
                      type="file"
                      onChange={(e) => setNewItemImg(e.target.value)}
                      accept="image/png, image/jpeg"
                    />
                  </label>
                  <button type="submit" className="btn btn-success">
                    Create Item
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </Popup>
          <div className="table-responsive">
            <table className="table table-striped shadow table-hover table-light">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td></td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{item.stock}</td>
                      {/* ON CLICK -- NAV TO SINGLE ITEM PAGE AND EDIT THERE?  */}
                      <td>
                        <Popup
                          trigger={
                            <button className="btn btn-primary s-1">
                              Edit
                            </button>
                          }
                          position="center"
                          modal
                          nested
                        >
                          {(close) => (
                            <div className="p-3 bg-light rounded border border-dark">
                              <form
                                id="itemEditPopUp"
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  editItem(item.id);
                                  close();
                                }}
                              >
                                <label>
                                  Item Name
                                  <input
                                    type="text"
                                    placeholder={item.name}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </label>
                                <label>
                                  Item Description
                                  <textarea
                                    placeholder={item.description}
                                    value={description}
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  />
                                </label>
                                <label>
                                  Price
                                  <input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    placeholder={item.price}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                  />
                                </label>
                                <label>
                                  Stock
                                  <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    placeholder={item.stock}
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                  />
                                </label>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Submit Changes
                                </button>
                                <button
                                  type="button"
                                  onClick={() => close()}
                                  className="btn btn-outline-primary"
                                >
                                  Close
                                </button>
                              </form>
                            </div>
                          )}
                        </Popup>
                      </td>
                      <td>
                        <Popup
                          trigger={
                            <button className="btn btn-danger s-1">
                              Delete
                            </button>
                          }
                          position="center"
                          modal
                          nested
                        >
                          {(close) => (
                            <div className="p-3 bg-light rounded border border-dark">
                              <div>Permanently delete {item.name}?</div>
                              <div>
                                <button
                                  onClick={() => {
                                    destroyItem(item.id);
                                  }}
                                  className="btn btn-danger p-1"
                                >
                                  Delete Item
                                </button>
                                <button
                                  onClick={() => close()}
                                  className="btn btn-light p-1"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </Popup>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>You must have admin rights to view this page.</h1>;
  }
}

export default InventoryTable;
