import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useDriverDashboard, usePartialState, useUtils } from "@/hooks/hooks";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import DriverDashboardChart from "./DriverDashboardChart";
// import { IconTrendingUp } from "@tabler/icons-react";
// import ChartCard from "../ChartCard/ChartCard";
import { Combobox } from "../Combobox/Combobox";
import RetryTask from "../RetryTask/RetryTask";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";




export default function DriverDashboard() {
    const { country } = useUtils();
    const ExtraState = usePartialState({ city: "" });
    const LocalState = usePartialState({ period: "", country: "", city: "" });
    const { data, error, refetch, isLoading } = useDriverDashboard(LocalState.state);

    
    return <div className="space-y-4">
        <div className="flex justify-between items-center">
            <div>
                {isLoading && <Spinner />}
            </div>

            <div className="grid grid-cols-3 gap-4 w-[45%]">
                <div>
                    <CardAction>
                        <ToggleGroup
                            type="single"
                            variant="outline"
                            value={LocalState.state.period}
                            onValueChange={period => LocalState.setState({ period })}
                        >
                            <ToggleGroupItem value="day">Day</ToggleGroupItem>
                            <ToggleGroupItem value="week">Week</ToggleGroupItem>
                            <ToggleGroupItem value="month">Month</ToggleGroupItem>
                            <ToggleGroupItem value="year">Year</ToggleGroupItem>
                        </ToggleGroup>
                    </CardAction>
                </div>

                <Combobox
                    data={country.data?.data?.content.map(_ => ({ label: _.name.common, value: _.cca2 })) || []}
                    onChange={country => LocalState.setState({ country })}
                    value={LocalState.state.country}
                    placeholder="Picke a country"
                    empty_message=""
                />

                <form
                    onSubmit={e => {
                        e.preventDefault();
                        LocalState.setState({ city: ExtraState.state.city });
                    }}
                >
                    <Input
                        placeholder="City"
                        value={ExtraState.state.city}
                        onChange={({ target }) => ExtraState.setState({ city: target.value })}
                    />
                </form>
            </div>
        </div>

        {error && <RetryTask text={error.message} onRetry={refetch} />}

        <div className="grid grid-cols-4 gap-4">
            <Card_
                footer="The full count of all vehicles registered within the system. This includes both active cars and those not currently in service."
                title={data?.summary?.totalCars}
                description="Total Cars"
            />
            <Card_
                footer="Drivers who are currently logged in and available to accept rides. This number reflects real-time activity on the platform."
                title={data?.summary?.activeDrivers}
                description="Active Drivers"
            />
            <Card_
                footer="Drivers who did not meet the platform’s approval requirements. These users have been marked as ineligible for activation."
                title={data?.summary?.rejectedDrivers}
                description="Rejected Drivers"
            />
            <Card_
                footer="Vehicles that have valid and verified insurance documents on file. Only cars with up-to-date documents."
                title={data?.summary?.carsWithInsurance}
                description="Cars With Insurance"
            />
        </div>

        {
            data &&
            <div className="border rounded-lg">
                {/* <input type="color" value="#60a5fa" onChange={e => console.log(e.target.value)} /> */}
                <DriverDashboardChart data={data} />
            </div>
        }
    </div>
};




function Card_(props: { title?: number; description?: string; footer?: React.ReactNode }) {
    return <Card className="@container/card">
        <CardHeader>
            <CardDescription className="text-primary font-bold text-lg">{props.description}</CardDescription>
            <CardTitle className="text-4xl font-extrabold">
                {props.title}
            </CardTitle>
            <CardAction>
            </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm text-muted-foreground">
            {props.footer}
        </CardFooter>
    </Card>
};