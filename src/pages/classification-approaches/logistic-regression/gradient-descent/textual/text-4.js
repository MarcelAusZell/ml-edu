export default function Text4() {
  return (
    <>
      Although this method is simple and easy to implement, it can be computationally expensive if the learning rate is
      poorly chosen, as the algorithm may take a long time to converge
      <br />
      <span className="note-text">
        <br />
        In practice, the learning rate is often chosen using techniques such as exact/inexact line search or learning
        rate schedules
      </span>
    </>
  );
}
