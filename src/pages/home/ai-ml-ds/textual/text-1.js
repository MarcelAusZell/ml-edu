export default function Text1() {
  return (
    <>
      Terms like <span className="circle-ai-text">Artificial Intelligence (AI)</span>,{" "}
      <span className="circle-ml-text">Machine Learning (ML)</span> and{" "}
      <span className="circle-ds-text">Data Science (DS)</span> are often used interchangeably.
      <br />
      However, they are not the same:
      <ul>
        <li style={{ marginBottom: "1rem", marginTop: "1rem" }}>
          <span className="circle-ai-text">AI</span> is a broad concept and could be described as machines being able to
          carry out tasks in a way that we would consider “smart”.
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <span className="circle-ml-text">ML</span> is a subset of AI that describes the process of machines extracting
          information from data to learn patterns and ultimately make decisions.
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <span className="circle-ds-text">DS</span> is a multidisciplinary field that uses scientific methods,
          processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.
        </li>
      </ul>
      Besides that <span className="circle-dl-text">Deep Learning (DL)</span> is an example of an ML method that uses
      neural networks to model and understand complex patterns in data.
    </>
  );
}
