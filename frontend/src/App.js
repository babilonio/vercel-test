import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get('/api/items');
    setItems(res.data);
  };

  const addItem = async () => {
    const res = await axios.post('/api/items', { name: newItem });
    setItems([...items, res.data]);
    setNewItem('');
  };

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default App;
