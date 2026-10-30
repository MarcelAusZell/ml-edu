export default function Text3() {
  return (
    <>
      The choice of the learning rate is crucial and can lead to slow convergence meaning it take many steps to reach
      the minimum
      <br />
      <span className="note-text">
        The binary cross entropy error is convex and thus has a unique minimum, so though the learning rate is crucial
        and can have a huge impact on convergence, the algorithm will eventually converge to the minimum.
      </span>
    </>
  );
}
