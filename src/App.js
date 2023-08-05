import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingLists from "./PackingLists";
import Stats from "./Stats";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((itemsArray) => [...itemsArray, item]);
  }

  function handleDeleteItem(id) {
    setItems((itemsArray) => itemsArray.filter((item) => item.id !== id));
  }

  function handleCheckedItem(id) {
    setItems((items) => {
      return items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      );
    });
  }

  function handleClear() {
    const confirmed = window.confirm("Are you sure you want to clear list");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingLists
        items={items}
        onClear={handleClear}
        onDeleteItems={handleDeleteItem}
        onCheckItem={handleCheckedItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
