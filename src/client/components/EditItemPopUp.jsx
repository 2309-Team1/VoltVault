import { useState } from "react";
import axios from "axios";
let API = "http://localhost:3000/api";
import Popup from "reactjs-popup";

function EditItemPopUp({ token, fetchAllInventory, item }) {
  const [name, setName] = useState(item.name || "");
  const [description, setDescription] = useState(item.description || "");
  const [price, setPrice] = useState(item.price || "");
  const [stock, setStock] = useState(item.stock || "");

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

  return (
    <Popup
      trigger={<button className="btn btn-primary s-1">Edit</button>}
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
                onChange={(e) => setDescription(e.target.value)}
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
            <button type="submit" className="btn btn-success">
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
  );
}

export default EditItemPopUp;
