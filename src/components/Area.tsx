import "./Area.css";

interface AreaProps {
  image: string;
  area: string;
}

export default function Area({ image, area }: AreaProps) {
  return (
    <div className="area">
      <div className="area__header">
        <img className="area__avatar" src={image} alt="" />
        <h1 className="area__title">{area}</h1>
      </div>
    </div>
  );
}
