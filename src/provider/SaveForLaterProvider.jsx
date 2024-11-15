
import Swal from 'sweetalert2';
import React, { createContext, useContext } from 'react';

const SaveForLaterContext = createContext();

export const useSaveForLater = () => useContext(SaveForLaterContext);

export const SaveForLaterProvider = ({ children }) => {

    const [saveForLaterItems, setSaveForLaterItems] = React.useState(() => {
        const savedItems = localStorage.getItem("saveForLaterItems");
        return savedItems ? JSON.parse(savedItems) : [];
    });

    React.useEffect(() => {
        localStorage.setItem("saveForLaterItems", JSON.stringify(saveForLaterItems));
    }, [saveForLaterItems]);

    const addToSave = (product) => {
        setSaveForLaterItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems; 
            } else {
                return [...prevItems, product]; 
            }
        });
    };

   
    const removeFromSaveForLater = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                
                setSaveForLaterItems((prevItems) => prevItems.filter((item) => item.id !== productId));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been removed from Save for Later.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <SaveForLaterContext.Provider value={{ saveForLaterItems, addToSave, removeFromSaveForLater }}>
            {children}
        </SaveForLaterContext.Provider>
    );
};
