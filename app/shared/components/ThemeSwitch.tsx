import { Monitor, Moon, Sun } from "lucide-react";
import type { ThemeMode } from "../site";
import { useTheme } from "../lib/theme";

const OPTIONS: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "浅色", icon: Sun },
  { value: "dark", label: "深色", icon: Moon },
  { value: "system", label: "跟随系统", icon: Monitor }
];

export function ThemeSwitch({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useTheme();
  return (
    <div className={`themeSwitch ${compact ? "is-compact" : ""}`}>
      {!compact && <span className="themeSwitchLabel">外观</span>}
      <div className="themeSwitchOptions" role="group" aria-label="外观主题">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const active = mode === option.value;
          return (
            <button
              key={option.value}
              type="button"
              className={`themeSwitchButton ${active ? "is-active" : ""}`}
              aria-pressed={active}
              title={option.label}
              onClick={() => setMode(option.value)}
            >
              <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
              <span className="themeSwitchText">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}