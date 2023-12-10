import React from "react";

function Wishlist({ wishlist, removeFromWishlist }) {
  return (
    <>
      <h2>Wishlist</h2>
      {wishlist && wishlist.length > 0 ? (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id}>
              {item.name} - Price: ${item.price}
              <button onClick={() => removeFromWishlist(item.id)}>
                Remove from Wishlist
              </button>
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