import HandwritingRecognizer from "./handwriting-recognition/canvas/handwriting-preprocessing.js";
import PageCard from "../../../components/page-card/page-card.js";
import InteractiveDemo from "../../../components/interactive-demo/interactive-demo.js";
import HandwrittenDigitRecognizer from "./handwriting-recognition/handwritten-digit-recognizer/mnist-digit-recognizer.js";
import HandwrittenLetterRecognizer from "./handwriting-recognition/handwritten-letter-recognizer/emnist-letter-recognizer.js";
import PerceptronsScrollytelling from "./perceptrons/perceptrons-scrollytelling.js";
import MultiLayerPerceptronsScrollytelling from "./mulit-layer-perceptrons/multi-layer-perceptrons-scrollytelling.js";
import IntroductionCardNeuralNetworks from "./introduction-card/introduction-card-neural-networks.js";
import MLPInteractive from "./mulit-layer-perceptrons/interactive/mlp-interactive.js";
import LossFunctionsScrollytelling from "./loss-functions/loss-functions-scrollytelling.js";
import BackpropagtionScrollytelling from "./backpropagation/backpropagation-scrollytelling.js";
import StochasticGradientDescentInteractive from "./stochastic-gradient-descent/interactive/sgd-interactive.js";
import StochasticGradientDescentScrollytelling from "./stochastic-gradient-descent/stochastic-gradient-descent-scrollytelling.js";
import RefferalToNextAction from "../../../components/refferal-to-next-section/refferal-to-next-action.js";
import latexFormula from "../../../utils/latex-formula.js";

export default function NeuralNetworks() {
  return (
    <>
      <IntroductionCardNeuralNetworks />
      <PageCard>
        <PerceptronsScrollytelling />

        <MultiLayerPerceptronsScrollytelling />
        <InteractiveDemo>
          <div className="interactive-demo-description">
            Play with the model structure of the neural network by changing the number of nodes in each layer and adjust
            the number of hidden layers. An multi-layer perceptron can also have multiple hidden layers. Each hidden
            layer applies a non-linear transformation to its input similar to basis functions however in MLPs, these
            transformations are flexible and not fixed as they are parameterized by the weights and biases of the
            network which are then learned. By increasing the number of hidden layers, the model effectively increases
            the complexity and adaptability of these transformations, allowing the overall model to learn more intricate
            and non-linear relationships in the data.
          </div>
          <MLPInteractive />
        </InteractiveDemo>

        <LossFunctionsScrollytelling />

        <BackpropagtionScrollytelling />

        <StochasticGradientDescentScrollytelling />
        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adjusting the learning rate, and the number of iterations. Observe how the stochastic
            gradient descent algorithm sometimes escapes local minima and converges to the global minimum instead of
            getting stuck in a local minimum.
          </div>
          <StochasticGradientDescentInteractive />
        </InteractiveDemo>

        <InteractiveDemo>
          <div className="interactive-demo-description">
            We can now use our knowledge about neural networks to build a handwriting recognition system. The model
            takes as input a {latexFormula("28 \\times 28")} pixel image of a handwritten digit or letter and outputs
            the predicted digit or letter. The model is trained on the MNIST and EMNIST datasets, which are popular
            datasets for handwritten digit and letter recognition, respectively. For the output layer of the model, we
            use the softmax activation function, to refer to the outputs as probabilities. The ouput layer has 10 nodes
            for the digit recognizer and 26 nodes for the letter recognizer.
          </div>
          <HandwritingRecognizer recognizerComponent={HandwrittenDigitRecognizer} lineWidth={8} canvasSizes={150} />
          <HandwritingRecognizer recognizerComponent={HandwrittenLetterRecognizer} lineWidth={8} canvasSizes={150} />
        </InteractiveDemo>

        <RefferalToNextAction
          sources={[
            {
              title: "Neural Networks [All]",
              description: ["Christopher Bishop - Pattern Recognition and Machine Learning"],
              pages: ["Neural Networks 5"],
              link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
            },
            {
              title: "Backpropagation [24-30]",
              description: ["Machine Learning 1 - Errik Bekkers - University of Amsterdam Informatics Institute"],
              pages: ["Error Backpropagation 8.5"],
              link: "https://uvaml1.github.io/2020/slides/8.5_NeuralNetworkBackpropagation.pdf",
            },
            {
              title: "Stochastic Gradient Descent [31-35]",
              description: ["Machine Learning 1 - Errik Bekkers - University of Amsterdam Informatics Institute"],
              pages: ["Stochastic Gradient Descent 8.4"],
              link: "https://uvaml1.github.io/2020/slides/8.4_NeuralNetworksStochasticGradientDescent.pdf",
            },
          ]}
        />
      </PageCard>
    </>
  );
}
