export default function Stats({ items }) {
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
