import { useEffect, useState } from "react";
import axios from "axios";
let API = "http://localhost:3000/api";
import AddItemPopUp from "./AddItemPopUp";
import EditItemPopUp from "./EditItemPopUp";
import DeleteItemPopUp from "./DeleteItemPopUp";

function InventoryTable({ admin, token }) {
  const [inventory, setInventory] = useState([]);

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

  if (admin) {
    return (
      <>
        <div className="col-11 col-sm-11 col-md-11 col-lg-11 m-5">
          <h1 id="invTitle">Inventory</h1>
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
                  <th scope="col">
                    <AddItemPopUp
                      token={token}
                      fetchAllInventory={fetchAllInventory}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{item.stock}</td>
                      <td>
                        <EditItemPopUp
                          token={token}
                          fetchAllInventory={fetchAllInventory}
                          item={item}
                        />
                      </td>
                      <td>
                        <DeleteItemPopUp
                          token={token}
                          fetchAllInventory={fetchAllInventory}
                          item={item}
                        />
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
    return (
      <h1 class="needSignIn">You must have admin rights to view this page.</h1>
    );
  }
}

export default InventoryTable;
