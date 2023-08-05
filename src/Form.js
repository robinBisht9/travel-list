import { useState } from "react";

export default function Form({ handleAddItems }) {
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
