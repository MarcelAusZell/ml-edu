import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text9() {
  return (
    <>
      We therefore can express the distance {latexFormula("r")} from the point {latexFormula("\\vec{x}")} to the
      decision boundary as {latexFormula("r = \\frac{y(\\vec{x})}{||\\vec{w}||}")} because:
      <TextPlaceholder height={3} />
      {latexFormula("y(\\vec{x})")}
      <TextPlaceholder height={3} />
      {latexFormula("= \\vec{w}^T\\vec{x} + w_0")}
      <TextPlaceholder height={3} />
      {latexFormula("= \\vec{w}^T(\\vec{x_{\\perp}} + r\\frac{\\vec{w}}{||\\vec{w}||}) + w_0")}
      <TextPlaceholder height={3} />
      {latexFormula("= \\vec{w}^T\\vec{x_\\perp} + r\\frac{{\\| w \\|}^2}{\\| w \\|} + w_0")}
      <TextPlaceholder height={3} />
      {latexFormula("= \\vec{w}^T\\vec{x_\\perp} + w_0 + r{\\| w \\|}")}
      <TextPlaceholder height={3} />
      {latexFormula("= r||\\vec{w}|| \\qquad \\textcolor{gray}{\\tiny{y(x_\\perp) = \\vec{w}^T\\vec{x_\\perp} + w_0 = 0}}")}
    </>
  );
}