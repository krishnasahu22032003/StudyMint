import { motion } from "framer-motion";
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
    CartesianGrid,
} from "recharts";
import { BarChart2, TrendingUp, PieChart as PieIcon } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

type ChartItem = {
    type: "bar" | "line" | "pie";
    title: string;
    data: { name: string; value: number }[];
};

type RechartSetUpProps = {
    charts: ChartItem[];
};

const COLORS = [
    "var(--color-accent)",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#f43f5e",
];

const CHART_ICONS = {
    bar: BarChart2,
    line: TrendingUp,
    pie: PieIcon,
};

const tooltipStyle = {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    color: "var(--color-text-primary)",
    fontSize: "12px",
    padding: "8px 12px",
};

const axisTickStyle = {
    fill: "var(--color-text-tertiary)",
    fontSize: 11,
};

function RechartSetUp({ charts }: RechartSetUpProps) {
    if (!charts || charts.length === 0) return null;

    return (
        <div className="space-y-6">
            {charts.map((chart, index) => {
                const Icon = CHART_ICONS[chart.type] ?? BarChart2;

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: easeOut, delay: index * 0.08 }}
                        className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-soft"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/4 via-transparent to-transparent pointer-events-none" />

                        <div className="relative z-10 p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft flex-shrink-0">
                                    <Icon className="h-4 w-4 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-text-primary">{chart.title}</h4>
                                    <p className="text-[11px] text-text-tertiary mt-0.5 capitalize">{chart.type} chart · AI generated</p>
                                </div>
                            </div>

                            <div className="h-64 sm:h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <>
                                        {chart.type === "bar" && (
                                            <BarChart data={chart.data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                                                <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
                                                <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
                                                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-surface-secondary)" }} />
                                                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
                                                    {chart.data.map((_, i) => (
                                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        )}

                                        {chart.type === "line" && (
                                            <LineChart data={chart.data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                                                <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
                                                <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
                                                <Tooltip contentStyle={tooltipStyle} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="var(--color-accent)"
                                                    strokeWidth={2.5}
                                                    dot={{ r: 4, fill: "var(--color-accent)", strokeWidth: 0 }}
                                                    activeDot={{ r: 6, fill: "var(--color-accent)", strokeWidth: 0 }}
                                                />
                                            </LineChart>
                                        )}

                                        {chart.type === "pie" && (
                                            <PieChart>
                                                <Tooltip contentStyle={tooltipStyle} />
                                                <Pie
                                                    data={chart.data}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    outerRadius="75%"
                                                    innerRadius="40%"
                                                    paddingAngle={3}
                                                    label={({ name, percent }) =>
                                                        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                                                    }
                                                    labelLine={false}
                                                >
                                                    {chart.data.map((_, i) => (
                                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        )}
                                    </>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default RechartSetUp;