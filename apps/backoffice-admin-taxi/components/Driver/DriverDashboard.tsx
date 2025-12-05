import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import type { TDriverDashboardData } from "@/lib/type";
import { IconTrendingUp } from "@tabler/icons-react";
import { useDriverDashboard } from "@/hooks/hooks";
// import { useQuery } from "@tanstack/react-query";
import ChartCard from "../ChartCard/ChartCard";
// import { Badge } from "../ui/badge";
import API from "@/lib/API";




export default function DriverDashboard() {
    const { data, isLoading } = useDriverDashboard()

    console.log(data);

    return <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
            <Card_
                title={data?.summary.activeDrivers}
                description="Active Drivers"
                footer
            />
            <Card_
                title={data?.summary.rejectedDrivers}
                description="Rejected Drivers"
                footer
            />
            <Card_
                title={data?.summary.totalCars}
                description="Total Cars"
                footer
            />
            <Card_
                title={data?.summary.carsWithInsurance}
                description="Cars With Insurance"
                footer
            />
        </div>


        {data && <ChartCard data={data} />}
    </div>
};




function Card_(props: { title?: number; description?: string; footer?: React.ReactNode }) {
    return <Card className="@container/card">
        <CardHeader>
            <CardDescription>{props.description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {props.title}
            </CardTitle>
            <CardAction>
                {/* <Badge variant="outline">
                    <IconTrendingUp />
                    +12.5%
                </Badge> */}
            </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
            {props.footer}
            <div className="line-clamp-1 flex gap-2 font-medium">
                Strong user retention <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
    </Card>
};