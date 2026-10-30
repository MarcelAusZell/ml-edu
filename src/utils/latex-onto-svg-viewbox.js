// Inspired by https://stackoverflow.com/questions/76346552/how-can-i-integrate-mathjax-on-my-next-js-app-to-render-inline-and-display-equat

import { mathjax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";

// Helps MathJax to interact with the HTML DOM
const adaptor = liteAdaptor();
// Tell MathJax to use the HTML adaptor for handling HTML elements.
RegisterHTMLHandler(adaptor);
// For parsing LaTeX formulas
const tex = new TeX();
// Takes the parsed LaTeX formulas and converts them into SVG format.
const svg = new SVG();

// This sets up a MathJax document that will use the TeX input processor to parse formulas and the SVG output processor to generate SVG graphics.
// The empty string "" indicates that the document does not initially contain any content.
const html = mathjax.document("", { InputJax: tex, OutputJax: svg });

// This function is used to render LaTeX formulas in the visuals/svg's
export default function latexOntoSvg(svg, formula, x, y, className = "", id = "", fontSize = "3", color = "") {
  // Convert LaTeX formula to SVG
  const node = html.convert(formula, { display: true });
  const svgElement = adaptor.outerHTML(node);

  // Create SVG node and apply attributes
  const div = document.createElement("div");
  div.innerHTML = svgElement;
  const svgNode = div.querySelector("svg");
  svgNode.style.fontSize = fontSize + "px";
  svgNode.style.color = color;
  svgNode.setAttribute("class", className);
  svgNode.setAttribute("id", id);

  // Append and position SVG node
  // (x, y) is the center of the SVG node
  svg.node().appendChild(svgNode);
  const [, , viewBoxWidth, viewBoxHeight] = svg.node().getAttribute("viewBox").split(" ").map(parseFloat);
  const { width, height } = svgNode.getBoundingClientRect();
  const { width: svgWidth, height: svgHeight } = svg.node().getBoundingClientRect();
  const posX = x - ((width / svgWidth) * viewBoxWidth) / 2;
  const posY = y - ((height / svgHeight) * viewBoxHeight) / 2;

  svgNode.setAttribute("x", posX);
  svgNode.setAttribute("y", posY);
}