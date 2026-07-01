import { useState } from "react";
import "./CustomHabitForm.css";
import type { Habit, Indicator } from "../types";

const emptyCustomForm = {
  name: "",
  detail: "",
  begin: "",
  continue: "",
  expect: "",
  targetsIndicators: [] as string[],
};

const customFormTextareas: {
  field: "detail" | "begin" | "continue" | "expect";
  label: string;
  placeholder: string;
  required?: boolean;
}[] = [
  {
    field: "detail",
    label: "Description",
    placeholder: "What is this habit and why does it matter?",
    required: true,
  },
  { field: "begin", label: "Begin", placeholder: "How do you start?" },
  { field: "continue", label: "Continue", placeholder: "How do you sustain it?" },
  { field: "expect", label: "Expect", placeholder: "What results should you expect?" },
];

interface CustomHabitFormProps {
  area: string;
  indicators: Indicator[];
  onAddCustomHabit: (habit: Omit<Habit, "active" | "userCreated">) => void;
}

export default function CustomHabitForm({ area, indicators, onAddCustomHabit }: CustomHabitFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [customForm, setCustomForm] = useState(emptyCustomForm);

  function toggleIndicator(indicatorName: string) {
    setCustomForm((prev) => ({
      ...prev,
      targetsIndicators: prev.targetsIndicators.includes(indicatorName)
        ? prev.targetsIndicators.filter((name) => name !== indicatorName)
        : [...prev.targetsIndicators, indicatorName],
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!customForm.name.trim() || !customForm.detail.trim()) return;
    onAddCustomHabit({
      name: customForm.name.trim(),
      area,
      impact: 5,
      detail: customForm.detail.trim(),
      plan: {
        begin: customForm.begin.trim(),
        continue: customForm.continue.trim(),
        expect: customForm.expect.trim(),
      },
      targetsIndicators: customForm.targetsIndicators,
    });
    setShowForm(false);
    setCustomForm(emptyCustomForm);
  }

  return (
    <li className="habit-list__item habit-list__item--create">
      <div className="habit-list__row">
        <button
          type="button"
          className="habit-list__expand-btn"
          aria-label={showForm ? "Hide new habit form" : "Show new habit form"}
          aria-expanded={showForm}
          onClick={() => {
            setShowForm((prev) => !prev);
            setCustomForm(emptyCustomForm);
          }}
        >
          <span className="habit-list__name">Create your own habit…</span>
          <span className="habit-list__chevron" aria-hidden>
            {showForm ? "▾" : "▸"}
          </span>
        </button>
      </div>
      {showForm && (
        <form className="habit-form" onSubmit={submit}>
          <div className="habit-form__field">
            <label className="habit-form__label" htmlFor="custom-name">
              Habit Name
            </label>
            <input
              id="custom-name"
              type="text"
              className="habit-form__input"
              value={customForm.name}
              onChange={(e) => setCustomForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Morning walk"
              autoFocus
              required
            />
          </div>
          {customFormTextareas.map(({ field, label, placeholder, required }) => (
            <div className="habit-form__field" key={field}>
              <label
                className={`habit-form__label${required ? "" : " habit-form__label--optional"}`}
                htmlFor={`custom-${field}`}
              >
                {label}
              </label>
              <textarea
                id={`custom-${field}`}
                className="habit-form__textarea"
                value={customForm[field]}
                onChange={(e) =>
                  setCustomForm((prev) => ({ ...prev, [field]: e.target.value }))
                }
                placeholder={placeholder}
                required={required}
              />
            </div>
          ))}
          {indicators.length > 0 && (
            <div className="habit-form__field">
              <label className="habit-form__label habit-form__label--optional">
                Which indicators does this help?
              </label>
              <div className="habit-form__checkboxes">
                {indicators.map((indicator) => (
                  <label key={indicator.name} className="habit-form__checkbox-option">
                    <input
                      type="checkbox"
                      checked={customForm.targetsIndicators.includes(indicator.name)}
                      onChange={() => toggleIndicator(indicator.name)}
                    />
                    {indicator.name}
                  </label>
                ))}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="habit-form__submit"
            disabled={!customForm.name.trim() || !customForm.detail.trim()}
          >
            Add
          </button>
        </form>
      )}
    </li>
  );
}
