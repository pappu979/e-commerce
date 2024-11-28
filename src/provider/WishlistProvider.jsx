// import React from 'react';
// import Swal from 'sweetalert2';

// const WishlistContext = React.createContext();

// export const useWishlist = () => React.useContext(WishlistContext);

// export const WishlistProvider = ({ children }) => {
    
//     const [wishlistItem, setWishlistItem] = React.useState(() => {
//         const savedWishListItem = localStorage.getItem("wishlistItem");
//         return savedWishListItem ? JSON.parse(savedWishListItem) : [];
//     });

//     React.useEffect(() => {
//         localStorage.setItem("wishlistItem", JSON.stringify(wishlistItem));
//     }, [wishlistItem]);

//     const addToWishList = (product) => {
//         setWishlistItem((prevItems) => {
//             const existingItem = prevItems.find((item) => item.id === product.id);
//             if (existingItem) {
//                 return prevItems;  
//             } else {
//                 return [...prevItems, product]; 
//             }
//         });
//     };

//     const removeFromWishList = (productId) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 setWishlistItem((prevItems) => prevItems.filter((item) => item.id !== productId));
//                 Swal.fire({
//                     title: "Deleted!",
//                     text: "Your item has been removed from the wishlist.",
//                     icon: "success"
//                 });
//             }
//         });
//     };

//     return (
//         <WishlistContext.Provider value={{ wishlistItem, addToWishList, removeFromWishList }}>
//             {children}
//         </WishlistContext.Provider>
//     );
// };
