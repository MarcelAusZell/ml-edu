import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text1() {
  return (
    <>
      {" "}
      For now, we just assume that the distribution which describes the data is a normal distribution. First, let's try
      to understand the structure of the normal distribution.
      <TextPlaceholder height={2} offset={0.2} />
      <div style={{ textAlign: "center" }}>
        <TextPlaceholder height={2} offset={0.2} />
        {latexFormula(
          "p(x \\mid \\mu, \\sigma^2) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}"
        )}
      </div>
      <TextPlaceholder height={2} offset={0.2} />
      <ul>
        <li>{latexFormula("\\frac{1}{\\sqrt{2 \\pi \\sigma^2}}")}</li>
        <TextPlaceholder height={1} offset={0.2} />
        <ul>
          <li>
            This term is the normalization constant. It ensures that the integral over the probability density function
            (pdf) over all possible values of x is 1. It therefore ensures, that the function is a valid probability
            distribution.
          </li>
        </ul>
        <TextPlaceholder height={1} offset={0.2} />
        <li>{latexFormula("e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}")}</li>
        <TextPlaceholder height={1} offset={0.2} />
        <ul>
          <li>The exponential term is responsible for the bell shape of the normal distribution.</li>
        </ul>
        <TextPlaceholder height={1} offset={0.2} />

        <ul>
          <li>
            {latexFormula("(x - \\mu)^2")}
            <TextPlaceholder height={1} offset={0.2} />
            This term represents the deviation of the data point {latexFormula("x")} from the mean{" "}
            {latexFormula("\\mu")}.
            <br />
            It is squared to amplify the penalty for large deviations.
            <br />
            Therefore points close to the mean have a higher probability than points far away from the mean.
          </li>
        </ul>

        <TextPlaceholder height={1} offset={0.2} />
        <ul>
          <li>
            {latexFormula("\\frac{1}{2\\sigma^2}")}
            <TextPlaceholder height={1} offset={0.2} />
            This term scales the deviation. A large variance {latexFormula("\\sigma^2")} spreads the distribution wider,
            making it less likely for points to be close to the mean.
          </li>
        </ul>
      </ul>
      Let's see it in action:
    </>
  );
}
