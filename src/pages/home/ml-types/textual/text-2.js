export default function Text2() {
  return (
    <>
      If the goal is to predict a continuous value, such as
      <ul>
        <li>temperatures,</li>
        <li>
          <span style={{ color: "orange" }}>sizes</span>
        </li>
        <li>prices,</li>
        <li>...</li>
      </ul>
      then the problem is called{" "}
      <span className="emphasized-text" style={{ opacity: 0.5 }}>
        regression
      </span>
      .
    </>
  );
}