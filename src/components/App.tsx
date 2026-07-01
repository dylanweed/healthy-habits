import { useState } from "react";
import "./App.css";
import Nav from "./Nav";
import Area from "./Area";
import Home from "./Home";
import areas from "../data/areas.json";

const areaNames = areas.map((area) => area.name);

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedArea = areas.find((area) => area.name === selected);

  return (
    <div className="app">
      <Nav areas={areaNames} selected={selected} onSelect={setSelected} onHome={() => setSelected(null)} />
      <div className="app__main">
        {selected === null || !selectedArea ? (
          <Home areas={areas} onSelect={setSelected} />
        ) : (
          <Area image={selectedArea.image} area={selected} />
        )}
      </div>
    </div>
  );
}
