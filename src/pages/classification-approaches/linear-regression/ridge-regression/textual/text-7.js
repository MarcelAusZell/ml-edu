import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      That means we can also have effects such as over-regularizing the model, where the model will no longer be able to
      capture the underlying pattern in the data well.
      <br />
      <span style={{ opacity: "0.3", fontSize: "0.8rem" }}>
         The regularization strength {latexFormula("\\lambda")} is a hyperparameter that needs to be tuned. A
        common approach is a method called cross-validation to find the optimal value of {latexFormula("\\lambda")}. In
        this approach, the data is split into training and validation sets. The model is trained on the training set and
        evaluated on the validation set. This process is repeated for different values of {latexFormula("\\lambda")}.
        The value of {latexFormula("\\lambda")}
        that gives the best performance on the validation set is chosen as the optimal value.
      </span>
    </>
  );
}
