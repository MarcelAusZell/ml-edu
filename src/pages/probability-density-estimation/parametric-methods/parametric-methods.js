import PageCard from "../../../components/page-card/page-card.js";
import InteractiveDemo from "../../../components/interactive-demo/interactive-demo.js";
import PDEIntroductionScrollytelling from "./pde-introduction/pde-introduction-scrollytelling.js";
import ParametricFormsScrollytelling from "./parametric-forms/parametric-forms-scrollytelling.js";
import UnivariateScrollytelling from "./univariate-gaussian/univariate-gaussian-scrollytelling.js";
import UnivariateGaussian from "./univariate-gaussian/interactive/univariate-gaussian.js";
import MultivariateGaussianScrollytelling from "./multivariate-gaussian/multivariate-gaussian-scrollytelling.js";
import MultivariateGaussian from "./multivariate-gaussian/interactive/multivariate-gaussian.js";
import MaximumLikelihoodEstimationScrollytelling from "./maximum-likelihood-estimation/maximum-likelihood-estimation-scrollytelling.js";
import MaximumLikelihoodEstimation from "./maximum-likelihood-estimation/interactive/maximum-likelihood-estimation.js";
import IntroductionCardParametricMethods from "./introduction-card/introduction-card-parametric-methods.js";
import latexFormula from "../../../utils/latex-formula.js";
import RefferalToNextAction from "../../../components/refferal-to-next-section/refferal-to-next-action.js";

export default function ParametricMethodsPage() {
  return (
    <>
      <IntroductionCardParametricMethods />
      <PageCard>
        <PDEIntroductionScrollytelling />

        <ParametricFormsScrollytelling />

        <UnivariateScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by changing the mean and variance of the univariate gaussian distribution.
            Observe how the distribution changes as you change the mean and variance
          </div>
          <UnivariateGaussian />
        </InteractiveDemo>

        <MultivariateGaussianScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by changing the mean-vector and covariance-matrix of the multivariate gaussian
            distribution. Observe how the distribution changes as you change the mean-vector and
            covariance-matrix
          </div>
          <MultivariateGaussian svgWidth={1000} svgHeight={500} />
        </InteractiveDemo>

        <MaximumLikelihoodEstimationScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adding data points which will cause a probability density estimation. Observe
            how the Maximum Likelihood Estimate {latexFormula("\\hat{\\theta} = (\\hat{\\mu}, \\hat{\\sigma})")} changes as you add more data points.
          </div>
          <MaximumLikelihoodEstimation svgWidth={800} svgHeight={800} />
        </InteractiveDemo>
      </PageCard>
      <RefferalToNextAction
        nextSectionUrl="/probability-density-estimation/non-parametric-methods"
        nextSectionName="Non-Parametric Methods"
        sources={[
          {
            title: "Normal Disribution [7 - 16]",
            description: ["Christopher Bishop - Pattern Recognition and Machine Learning"],
            pages: ["The Gaussian distribution 1.2.4"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
          {
            title: "Maximum Likelihood Estimation [17 - 23]",
            description: ["Christopher Bishop - Pattern Recognition and Machine Learning"],
            pages: ["Maximum likelihood for the Gaussian 2.3.4"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
        ]}
      />
    </>
  );
}
