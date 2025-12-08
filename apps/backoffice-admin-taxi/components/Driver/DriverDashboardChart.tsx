import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TDriverDashboardData } from "@/lib/type";




export default function DriverDashboardChart({ data }: { data: TDriverDashboardData }) {
    const chartConfig = {
        totalRegistrations: {
            label: "Total Registration",
            color: "#2563eb",
        },
        activeDrivers: {
            label: "Active Drivers",
            color: "#60a5fa",
        },
        inactiveDrivers: {
            label: "Inactive Drivers",
            color: "#05438f",
        },
        phoneVerifiedDrivers: {
            label: "Phone Verified Drivers",
            color: "#0073ff",
        }
    } satisfies ChartConfig;
    const chartData = data.registrationTrends.trends


    return <ChartContainer
        config={chartConfig}
        className="h-[250px] w-full"
    >
        <BarChart
            accessibilityLayer
            data={chartData}
        >
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="_id"
                tickMargin={10}
                tickLine={false}
                axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="totalRegistrations" fill="var(--color-totalRegistrations)" radius={4} />
            <Bar dataKey="activeDrivers" fill="var(--color-activeDrivers)" radius={4} />
            <Bar dataKey="inactiveDrivers" fill="var(--color-inactiveDrivers)" radius={4} />
            <Bar dataKey="phoneVerifiedDrivers" fill="var(--color-phoneVerifiedDrivers)" radius={4} />
        </BarChart>
    </ChartContainer>
};