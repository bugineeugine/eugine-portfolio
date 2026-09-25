// Decorative workflow graph (nodes joined by edges), echoing automation canvases.
// Absolutely positioned; the parent must be `relative` and `overflow-hidden`.

const nodes: [number, number][] = [
  [40, 60], [160, 30], [280, 90], [420, 40], [560, 110], [700, 50], [820, 120],
  [90, 200], [230, 240], [370, 180], [510, 250], [650, 200], [790, 260],
  [150, 340], [330, 320], [470, 370], [610, 330], [750, 380],
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  [0, 7], [1, 8], [2, 9], [3, 9], [4, 10], [5, 11], [6, 12],
  [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
  [7, 13], [8, 14], [9, 14], [10, 15], [11, 16], [12, 17],
  [13, 14], [14, 15], [15, 16], [16, 17],
];

export function NodeGraph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 860 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 4 : 2.5} />
        ))}
      </g>
    </svg>
  );
}
