import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import CheckoutBook from "./Checkout";


function AllItems() {
  const [items, setItems] = useState([]);

  // const navigate = useNavigate()


  useEffect(() => {
    fetchBooks();
  }, [])

  async function fetchBooks() {

    let API = "http://localhost:3000/api"

    try {
      const response = await axios.get (`${API}/itemsRouter/`)

      setItems(response.data)
    }
    catch (err) {
      console.error(err.message)
    }
    

  }
  


  return (
    <>
    <ul className='ItemContainer'>
    
      {items.length ? 
        items.map(items => (
          <li key={items.id}>
            <h3>{items.name}</h3>
            <h3>{book.price}</h3>
            {/* <img src={items.img} alt={`Image of ${items.name}`} />  */}
            {/* <button className="goldButton" onClick={() => navigate(`/details/${items.id}`)}>Show Details</button> */}
          </li>
        ))
        :
        <h2>Loading Knowledge ... <br />
        <br />
  
       A wizard is never late, nor is he early, he arrives precisely when he means to. 🧙‍♂️ 
        </h2>
      }
    </ul>
    </>
  );
} 

export default AllItems;