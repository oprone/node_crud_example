// frontend/src/components/ItemForm.js
import React, { useState } from 'react';

function ItemForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description }),
            });
            setName('');
            setDescription('');
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Item
            </button>
        </form>
    );
}

export default ItemForm;
