import { useEffect, useRef, useState } from "react";
import { usePixelImage } from "../canvas/handwriting-preprocessing";
import * as tf from "@tensorflow/tfjs";
import * as d3 from "d3";
import "./emnist-letter-recognizer.scss";

const initialData = Array.from({ length: 26 }, (_, i) => ({
  group: String.fromCharCode(65 + i),
  value: 0,
}));

export default function HandwrittenLetterRecognizer() {
  const pixelImage = usePixelImage();
  const svgRef = useRef();
  const modelRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [data, setData] = useState(initialData);
  const [maxLetter, setMaxLetter] = useState(["", 0]);

  useEffect(() => {
    async function loadModel() {
      try {
        const model = await tf.loadLayersModel(process.env.PUBLIC_URL + "/model/letter-recognition/model.json");
        modelRef.current = model;
        setModelLoaded(true);
      } catch (error) {
        console.error("Error loading model:", error);
        setModelLoaded(false);
      }
    }
    loadModel();
  }, []);

  useEffect(() => {
    if (modelRef.current && pixelImage) {
      predict(pixelImage).then(displayPrediction);
    }
  }, [pixelImage, modelLoaded]);

  useEffect(() => {
    plotHistogram();
  }, [data]);

  function plotHistogram() {
    const svg = d3.select(svgRef.current);
    const xScale = d3.scaleBand().domain(data.map((d) => d.group)).range([10, 90]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([30, 0]);

    svg.selectAll("rect").remove();
    svg.selectAll("rect").data(data).join("rect").attr("class", "bar").attr("x", (d) => xScale(d.group)).attr("y", (d) => yScale(d.value)).attr("width", xScale.bandwidth()).attr("height", (d) => Math.max(30 - yScale(d.value) - 0.25, 0));
    svg.select(".x-axis").remove();
    const maxValue = Math.max(...data.map((d) => d.value));
    svg.append("g").attr("transform", "translate(0,30)").call(d3.axisBottom(xScale).tickSize(0).tickPadding(1)).attr("class", "x-axis").selectAll("text").attr("class", (d, i) => data[i].value === maxValue ? "max-value-digit-on-scale" : "non-max-value-digit-on-scale");
  }

  async function predict(grayscaleValues) {
    const input = tf.tensor4d(grayscaleValues, [1, 28, 28, 1]).div(255.0);
    const prediction = modelRef.current.predict(input).dataSync();
    input.dispose();
    return prediction;
  }

  function getPercentagesFromPrediction(prediction) {
    return Array.from(prediction).map((probability) => Math.round(probability * 100));
  }

  function displayPrediction(prediction) {
    const updatedData = data.map((d, i) => ({ ...d, value: getPercentagesFromPrediction(prediction)[i] }));
    setData(updatedData);
    const maxIndex = prediction.indexOf(Math.max(...prediction));
    const maxIndexPrediction = prediction[maxIndex];
    setMaxLetter([String.fromCharCode(65 + maxIndex), Math.round(maxIndexPrediction * 100)]);
  }

  return (
    <div className="prediction-container">
      <div className="maximum-prediction">{maxLetter[0]}</div>
      <div className="maximum-prediction-percentage">{maxLetter[1]}%</div>
      <svg ref={svgRef} viewBox="0 0 100 40" />
    </div>
  );
}
