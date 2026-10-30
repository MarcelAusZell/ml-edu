export default function Text8() {
  return (
    <>
      But we still want to minimize the number of misclassifications. To address this issue, we use a surrogate loss
      function. This function is a smooth and continuous approximation that is higher than the ideal
      misclassification function but easier to optimize. "Higher" here means that the surrogate loss function assigns a
      higher penalty than the ideal loss for misclassifications, ensuring that it still encourages correct
      classifications but provides a gradient that optimization algorithms can follow.
      In the least squares classification, we used the squared error as the surrogate loss function.
      We can now see the weakness of this approach by looking at its error contribution plot:
    </>
  );
}
