import React from "react";
import { useEffect } from "react";

function Wishlist({ wishlist }) {
  console.log("Received wishlist:", wishlist);
  
  useEffect(() => {
    console.log("Received wishlist:", wishlist);
  }, [wishlist]);

  return (
    <>
      <h2>Wishlist</h2>
      {wishlist && wishlist.length > 0 ? (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id}>
              {item.name} 
              Price: ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </>
  );
}

export default Wishlist;