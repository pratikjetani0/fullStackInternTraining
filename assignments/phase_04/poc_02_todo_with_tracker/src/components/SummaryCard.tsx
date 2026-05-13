import { getThemeClasses } from "../context/ThemeContext";
import { useTheme } from "../hooks/useTheme";

interface SummaryCardProps {
  title: string;
  count: number;
}

const SummaryCard = ({ title, count }: SummaryCardProps) => {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${styles.card}`}>
      <h3 className={styles.textMuted}>{title}</h3>

      <p className={`text-4xl font-bold ${styles.textMuted}`}>{count}</p>
    </div>
  );
};

export default SummaryCard;
