// Animated circular gauge that visualizes the ATS score (0–100)
export default function ScoreGauge({ score = 0 }) {
  const pct = Math.max(0, Math.min(100, score));
  const r = 52;
  const c = 2 * Math.PI * r;
  const color = pct >= 75 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="gauge">
      <svg width="150" height="150" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} stroke="#262b36" strokeWidth="12" fill="none" />
        <circle
          cx="70"
          cy="70"
          r={r}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease' }}
        />
        <text
          x="70"
          y="70"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize="30"
          fontWeight="700"
        >
          {pct}
        </text>
      </svg>
      <span className="gauge-label">ATS Score / 100</span>
    </div>
  );
}
