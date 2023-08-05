export default function Item({ item, onDeleteItems, onCheckItem }) {
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
