import React, { useState, useEffect } from 'react';

import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import SearchItem from './SearchItem';

import './index.css';

function App() {

  const API_URL = 'http://localhost:3500/items ';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  // FETCH ITEMS
  useEffect(() => {

    const fetchItems = async () => {

      try {

        const response = await fetch(API_URL);

        if (!response.ok)
          throw Error('Failed to fetch data');

        const data = await response.json();

        setItems(data);

      } catch (err) {

        console.log(err.message);

      }
    };

    fetchItems();

  }, []);

  // ADD ITEM
  const addItem = async (item) => {

    const id =
      items.length
        ? items[items.length - 1].id + 1
        : 1;

    const myNewItem = {
      id,
      checked: false,
      item
    };

    const listItems = [...items, myNewItem];

    setItems(listItems);

    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!newItem) return;

    addItem(newItem);

    setNewItem('');
  };

  // HANDLE CHECK
  const handleCheck = async (id) => {

    const listItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked
          }
        : item
    );

    setItems(listItems);

    const myItem = listItems.find(
      (item) => item.id === id
    );

    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        checked: myItem.checked
      })
    });
  };

  // HANDLE DELETE
  const handleDelete = async (id) => {

    const listItems = items.filter(
      (item) => item.id !== id
    );

    setItems(listItems);

    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
  };

  // FILTER ITEMS
  const filteredItems = items.filter((item) =>
    item?.item
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="App">

      <Header title="Course List" />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <SearchItem
        search={search}
        setSearch={setSearch}
      />

      <Content
        items={filteredItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />

      <Footer
        length={filteredItems.length}
      />

    </div>
  );
}

export default App;