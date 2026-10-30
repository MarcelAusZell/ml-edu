import latexFormula from "../../../../../utils/latex-formula";

export default function Text8() {
  return (
    <>
      Linear classifiers are inherently incapable of solving problems that are not linearly separable. To address more
      complex problems, we needed to extend the model using specific basis functions {latexFormula("\\phi_i(\\vec{x})")}
      , which usually transformed the input data into a higher-dimensional space, allowing the discriminant to model
      more intricate patterns. While linear discriminants can perfectly model any separable function if provided with
      the right input feature {latexFormula("\\phi_i(\\vec{x})")}, the selection of these features was traditionally
      handcrafted. This manual feature engineering was both time-consuming and often required significant domain
      expertise. In the next section, we will see how to create flexible non-linear features and learn them
      automatically.
    </>
  );
}
