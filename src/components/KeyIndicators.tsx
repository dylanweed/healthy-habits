import "./KeyIndicators.css";
import type { Habit, Indicator } from "../types";

interface KeyIndicatorsProps {
  area: string;
  indicators: Indicator[];
  habits: Habit[];
}

export default function KeyIndicators({ area, indicators, habits }: KeyIndicatorsProps) {
  const activeHabits = habits.filter((habit) => habit.active);

  return (
    <section className="indicator-section">
      <div className="indicator-section__header">
        <h2 className="indicator-section__title">{area} - Key Indicators</h2>
      </div>
      <dl className="indicator-list">
        {indicators.map((indicator) => {
          const helpingHabits = activeHabits.filter((habit) =>
            habit.targetsIndicators?.includes(indicator.name),
          );
          return (
            <div key={indicator.name} className="indicator-list__row">
              <dt className="indicator-list__name">{indicator.name}</dt>
              <dd className="indicator-list__detail">
                {indicator.detail}
                {helpingHabits.length > 0 && (
                  <span className="indicator-list__habits">
                    You're working on this via: {helpingHabits.map((habit) => habit.name).join(", ")}
                  </span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
