import "./Image.scss";

export default function SideImage({showModal}) {
  return <div className="div-girl" style={showModal?{zIndex:"3"}: {}}></div>;
}
