import { useState } from "react";

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

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [itemCount, setItemCount] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity: itemCount,
      packed: false,
      id: Date.now(),
    };
    setDescription("");
    setItemCount(1);
    handleAddItems(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={itemCount}
        onChange={(e) => setItemCount(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (currValue, index) => index + 1).map(
          (num) => (
            <option value={num} key={num}>
              {num}
            </option>
          )
        )}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingLists({ items, onClear, onDeleteItems, onCheckItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onCheckItem={onCheckItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={"input"}>Sort by Input order</option>
          <option value={"description"}>Sort by description</option>
          <option value={"packed"}>Sort by packed status</option>
        </select>

        <button onClick={onClear}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onCheckItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.checked}
        onChange={() => onCheckItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <p>Start Adding Items to your list</p>
      </footer>
    );
  }

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {" "}
        {percentage === 100
          ? "You got everything. Ready to go"
          : `You have ${numItems} items in your list , and you have already packed
        ${packedItems} ( ${percentage})`}
      </em>
    </footer>
  );
}

export default App;
