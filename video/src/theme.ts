import { loadFont as loadDisplay } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";

const display = loadDisplay("normal", { weights: ["600", "700"], subsets: ["latin"] });
const body = loadBody("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

export const font = {
  display: display.fontFamily,
  body: body.fontFamily,
};

// Same palette as the portfolio site.
export const color = {
  page: "#0b1220",
  surface: "#111a2e",
  surface2: "#182339",
  line: "#223050",
  ink: "#eaf0fa",
  body: "#a6b3c9",
  muted: "#6f7f9c",
  accent: "#3b82f6",
  accentSoft: "#60a5fa",
  green: "#34d399",
  amber: "#fbbf24",
  magenta: "#e879f9",
};
