import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      Each of the {latexFormula("D")} nodes in the input layer is connected to every of the{" "}
      {latexFormula("K")} nodes in the output layer, and each of these connections has an associated
      weight. 
    </>
  );
}
