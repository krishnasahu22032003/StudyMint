import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartColumn } from "lucide-react";

type ChartItem = {
  type: "bar" | "line" | "pie";
  title: string;
  data: {
    name: string;
    value: number;
  }[];
};

type RechartSetUpProps = {
  charts: ChartItem[];
};

function RechartSetUp({ charts }: RechartSetUpProps) {
  if (!charts || charts.length === 0) return null;

  const COLORS = [
    "var(--color-accent)",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <div className="space-y-8">
      {charts.map((chart, index) => (
        <div
          key={index}
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-border
            bg-surface
            p-6
            shadow-soft
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-accent-soft
                "
              >
                <ChartColumn className="h-5 w-5 text-accent" />
              </div>

              <div>
                <h4 className="font-semibold text-text-primary">
                  {chart.title}
                </h4>

                <p className="text-xs text-text-secondary">
                  AI generated visualization
                </p>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <>
                  {chart.type === "bar" && (
                    <BarChart data={chart.data}>
                      <XAxis
                        dataKey="name"
                        tick={{
                          fill: "currentColor",
                        }}
                      />

                      <YAxis />

                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #e5e7eb",
                        }}
                      />

                      <Bar
                        dataKey="value"
                        radius={[10, 10, 0, 0]}
                      >
                        {chart.data.map((_, i) => (
                          <Cell
                            key={i}
                            fill={
                              COLORS[i % COLORS.length]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  )}

                  {chart.type === "line" && (
                    <LineChart data={chart.data}>
                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #e5e7eb",
                        }}
                      />

                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-accent)"
                        strokeWidth={4}
                        dot={{
                          r: 5,
                        }}
                      />
                    </LineChart>
                  )}

                  {chart.type === "pie" && (
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #e5e7eb",
                        }}
                      />

                      <Pie
                        data={chart.data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={110}
                        label
                      >
                        {chart.data.map((_, i) => (
                          <Cell
                            key={i}
                            fill={
                              COLORS[i % COLORS.length]
                            }
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  )}
                </>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RechartSetUp;