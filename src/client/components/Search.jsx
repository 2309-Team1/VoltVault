import { useEffect, useState } from "react";
import AllItems from "./Allitems";
import axios from "axios";

function ItemSearch() {
  const [items, setItems] = useState([]);
  const [query, setQuery ] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    let API = "http://localhost:3000/api";

    try {
      const response = await axios.get(`${API}/items/`);
      } catch (err){
        console.log ('Error searching items')
      }
    }

    
  }

  