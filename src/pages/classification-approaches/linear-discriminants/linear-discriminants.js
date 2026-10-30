import PageCard from "../../../components/page-card/page-card.js";
import GeneralizedLinearModels from "./generalized-linear-models/interactive/generalized-linear-models.js";
import LeastSquares from "./least-squares-classification/interactive/least-squares.js";
import InteractiveDemo from "../../../components/interactive-demo/interactive-demo.js";
import DiscriminantFunctionsScrollytelling from "./discriminant-functions/discriminant-functions-scrollytelling.js";
import LeastSquaresClassificationScrollytelling from "./least-squares-classification/least-squares-classification-scrollytelling.js";
import GeneralizedLinearDiscriminantsScrollytelling from "./generalized-linear-models/generalized-linear-discriminants-scrollytelling.js";
import BasisFunctionsScrollytelling from "./basis-functions/basis-functions-scrollytelling.js";
import BasisFunctionsInteractive from "./basis-functions/interactive/basis-functions-interactive.js";
import PolynomialBasisFunction2D from "./basis-functions/interactive/2D-polynomial-basis-function.js";
import IntroductionCardLinearDiscriminants from "./introduction-card/introduction-card-linear-discriminants.js";
import RefferalToNextAction from "../../../components/refferal-to-next-section/refferal-to-next-action.js";

export default function LinearDiscrimants() {
  return (
    <>
      <IntroductionCardLinearDiscriminants />
      <PageCard>
        <DiscriminantFunctionsScrollytelling />

        <LeastSquaresClassificationScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adding data points which for each class which will cause the model to find a line
            that minimizes the distances to your given samples. Notice the weaknesses of the least squares
            classification model such as the sensitivity to outliers or the inability to handle non-linear decision
            boundaries.
          </div>
          <LeastSquares />
        </InteractiveDemo>

        <GeneralizedLinearDiscriminantsScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adding data points which for each class which will cause the model to find a line
            that minimizes the distances to your given samples. Notice the weaknesses of the activated least squares
            classification model such as the inability to handle non-linear decision boundaries.
          </div>
          <GeneralizedLinearModels svgWidth={600} svgHeight={600} />
        </InteractiveDemo>

        <BasisFunctionsScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adding data points which for each class which will cause the model to find a decision
            boundary that minimizes the distances to your given samples. You can choose the degree of the polynomial
            basis function to see how the decision boundary changes.
          </div>
          <BasisFunctionsInteractive svgWidth={600} svgHeight={200} />
          <hr />
          <div className="interactive-demo-description">Try it also for the two-dimensional case.</div>
          <PolynomialBasisFunction2D />
        </InteractiveDemo>
      </PageCard>
      <RefferalToNextAction
        nextSectionUrl="/classification-and-regression/linear-regression"
        nextSectionName="Linear Regression"
        sources={[
          {
            title: "Linear Discriminants [All]",
            description: ["Christopher Bishop - Pattern Recognition and Machine Learning"],
            pages: ["Discriminant Functions 4.1"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
          {
            title: "Errorfunctions [13-20 ; 28-30]",
            description: ["Machine Learning - RWTH Aachen University- Prof. Leibe"],
            pages: ["Note on Errorfunctions p. 49-52"],
            link: "https://www.vision.rwth-aachen.de/media/course/SS/2016/machine-learning/ml16-part06-linear_discriminants2.pdf",
          },
        ]}
      />
    </>
  );
}
