// This function is used to make individual text placeholders with a given height in the text-sections of the scrollytelling
export default function TextPlaceholder({ height }) {
  return (
    <div style={{height: `${height}px`}}></div>
  );
}