// // frontend/src/components/ItemList.js
// import React, { useEffect, useState } from 'react';

// function ItemList() {
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/items');
//             const data = await response.json();
//             setItems(data);
//         } catch (err) {
//             console.error('Error:', err);
//         }
//     };

//     const deleteItem = async (id) => {
//         try {
//             await fetch(`http://localhost:5000/api/items/${id}`, {
//                 method: 'DELETE',
//             });
//             fetchItems();
//         } catch (err) {
//             console.error('Error:', err);
//         }
//     };

//     return (
//         <ul>
//             {items.map((item) => (
//                 <li key={item._id} className="border-b p-2 flex justify-between">
//                     <div>
//                         <p className="font-bold">{item.name}</p>
//                         <p>{item.description}</p>
//                     </div>
//                     <button
//                         onClick={() => deleteItem(item._id)}
//                         className="bg-red-500 text-white p-1 rounded"
//                     >
//                         Delete
//                     </button>
//                 </li>
//             ))}
//         </ul>
//     );
// }

// export default ItemList;





import React, { useEffect, useState } from 'react';

function ItemList() {
    const [items, setItems] = useState([]); // State to hold the list of items
    const [editingItemId, setEditingItemId] = useState(null); // State to track which item is being edited
    const [editName, setEditName] = useState(''); // State to hold the edited name
    const [editDescription, setEditDescription] = useState(''); // State to hold the edited description

    useEffect(() => {
        fetchItems(); // Fetch items when the component mounts
    }, []);

    // Fetch items from the backend
    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/items');
            const data = await response.json();
            setItems(data); // Update the state with fetched items
        } catch (err) {
            console.error('Error:', err); // Error handling
        }
    };

    // Function to delete an item
    const deleteItem = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/items/${id}`, {
                method: 'DELETE',
            });
            fetchItems(); // Refresh the list after deletion
        } catch (err) {
            console.error('Error:', err); // Error handling
        }
    };

    // Function to handle the start of editing an item
    const startEditing = (item) => {
        setEditingItemId(item._id); // Set the item being edited
        setEditName(item.name); // Set the current name in the input
        setEditDescription(item.description); // Set the current description in the input
    };

    // Function to handle updating an item
    const updateItem = async (id) => {
        try {
            // Send PUT request to update the item
            await fetch(`http://localhost:5000/api/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editName, description: editDescription }),
            });
            setEditingItemId(null); // Exit editing mode
            fetchItems(); // Refresh the list of items
        } catch (err) {
            console.error('Error:', err); // Error handling
        }
    };

    // Function to cancel editing
    const cancelEditing = () => {
        setEditingItemId(null); // Exit editing mode
    };

    return (
        <ul>
            {items.map((item) => (
                <li key={item._id} className="border-b p-2 flex justify-between items-center">
                    {editingItemId === item._id ? (
                        // Edit form for the item being edited
                        <div className="flex-1">
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border p-1 mb-2 w-full"
                                placeholder="Edit Name"
                            />
                            <input
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="border p-1 w-full"
                                placeholder="Edit Description"
                            />
                            <button
                                onClick={() => updateItem(item._id)}
                                className="bg-green-500 text-white p-1 rounded mt-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={cancelEditing}
                                className="bg-gray-500 text-white p-1 rounded mt-2 ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        // Display item details if not editing
                        <div className="flex-1">
                            <p className="font-bold">{item.name}</p>
                            <p>{item.description}</p>
                        </div>
                    )}
                    <div>
                        {editingItemId !== item._id && (
                            <button
                                onClick={() => startEditing(item)}
                                className="bg-yellow-500 text-white p-1 rounded mr-2"
                            >
                                Edit
                            </button>
                        )}
                        <button
                            onClick={() => deleteItem(item._id)}
                            className="bg-red-500 text-white p-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default ItemList;
