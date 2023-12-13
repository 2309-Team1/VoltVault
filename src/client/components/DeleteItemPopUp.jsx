import axios from "axios";
import Popup from "reactjs-popup";
import { useState } from "react";
let API = "http://localhost:3000/api";

function DeleteItemPopUp({ token, fetchAllInventory, item }) {
  const [name, setName] = useState(item.name || "");
  const [id, setId] = useState(item.id || "");

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

  return (
    <Popup
      trigger={<button className="btn btn-danger s-1">Delete</button>}
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
            <button onClick={() => close()} className="btn btn-light p-1">
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default DeleteItemPopUp;
