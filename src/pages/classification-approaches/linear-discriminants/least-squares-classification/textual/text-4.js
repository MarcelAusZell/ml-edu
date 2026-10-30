import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      We can analyze this behavior in more detail by looking at the so-called error contribution plot. On the x-axis we
      track {latexFormula("z_n = t_n y(x_n)")} which is the product of the target label and the prediction
      for each data point.
    </>
  );
}
