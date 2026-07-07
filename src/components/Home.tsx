import "./Home.css";

const icons = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function iconUrl(filename: string): string {
  const entry = Object.entries(icons).find(([path]) => path.endsWith(`/${filename}`));
  if (!entry) throw new Error(`Missing icon asset: ${filename}`);
  return entry[1];
}

interface Area {
  name: string;
  image: string;
}

interface HomeProps {
  areas: Area[];
  onSelect: (area: string) => void;
}

export default function Home({ areas, onSelect }: HomeProps) {
  return (
    <div className="home">
      <div className="home__hero">
        <h1 className="home__title">Healthy Habits</h1>
        <p className="home__subtitle">Start healthy habits.</p>
        <svg className="home__trace" viewBox="0 0 360 28" aria-hidden="true">
          <path d="M0,14 L70,14 L85,14 L95,2 L108,26 L120,8 L130,14 L150,14 L360,14" />
        </svg>
      </div>
      <div className="home__grid">
        {areas.map((area) => (
          <button
            key={area.name}
            type="button"
            className="home__card"
            onClick={() => onSelect(area.name)}
          >
            <img className="home__card-image" src={iconUrl(area.image)} alt="" />
            <span className="home__card-name">{area.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
