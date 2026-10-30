import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text2() {
  return (
    <>
      Methods that determine the class conditional densities for each class and separately estimate the prior to then use Bayes' Theorem to calculate
      the posterior are called <span className="emphasized-text">generative methods</span> They model the essential information required to completely
      characterize the probability distribution of the classes.
      <TextPlaceholder height={2} />
      Previously, we presupposed the likelihood and prior. In the sections <span className="emphasized-text">Parametric Methods</span> and{" "}
      <span className="emphasized-text">Non-Parametric Methods</span>, we will explore techniques to estimate these probabilities from the data.
    </>
  );
}
