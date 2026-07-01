import "./Nav.css";

interface NavProps {
  areas: string[];
  selected: string | null;
  onSelect: (area: string) => void;
  onHome: () => void;
}

export default function Nav({ areas, selected, onSelect, onHome }: NavProps) {
  return (
    <nav className="nav">
      <button type="button" className="nav__title" onClick={onHome}>
        Health Habits
      </button>
      <ul>
        {areas.map((area) => (
          <li key={area}>
            <button
              type="button"
              className={area === selected ? "nav__item--active" : undefined}
              onClick={() => onSelect(area)}
            >
              {area}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
