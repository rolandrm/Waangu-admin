import { DocFileVerification } from "../DocFileVerification/DocFileVerification";
import { IconCar } from "@tabler/icons-react";
import { useDriver } from "@/hooks/hooks";
import { TDriver } from "@/lib/type";
import { Badge } from "../ui/badge";




export default function DriverCarList() {
    const data = useDriver();
    return <div className="grid grid-cols-1 gap-4">
        {data.vehicles.map(car => <DriverCar key={car._id} data={car} />)}
    </div>
};




function DriverCar({ data }: { data: TDriver["vehicles"][0] }) {
    return <div className="border p-4 rounded-lg space-y-4">
        <div className="flex items-center gap-4">
            <div className="border rounded-lg p-2">
                <IconCar />
            </div>
            <div>
                <p>{data.vehicleType?.name}</p>
                <p className="text-muted-foreground text-sm">{data.brand} / {data.vehicleCategory.designation}</p>
            </div>
        </div>

        {/* <Separator /> */}

        <div className="flex justify-between items-center">
            {
                [
                    {
                        label: "Insurer",
                        value: <span className="text-muted-foreground text-sm">
                            {data.currentInsurance?.insuranceCompany}
                        </span>
                    },
                    {
                        label: "Police Number",
                        value: <span className="text-muted-foreground text-sm">
                            {data.currentInsurance?.policyNumber}
                        </span>
                    },
                    {
                        label: "Licence Plate",
                        value: <span className="text-muted-foreground text-sm">{data.licensePlate}</span>
                    },
                    {
                        label: "Status",
                        value: data.isActive ? <Badge>Active</Badge> : "----"
                    },
                    {
                        label: "Approved",
                        value: data.isApproved ? <Badge>Approved</Badge> : "----"
                    },
                    {
                        label: "Mileage",
                        value: <span className="text-muted-foreground text-sm">{data.mileage}</span>
                    }
                ].map(item => <div key={item.label} className="">
                    <p>{item.label}</p>
                    <div>{item.value}</div>
                </div>)
            }
        </div>

        {/* <Separator /> */}

        <div className="space-y-4">
            {data.insurances.map(item => <DocFileVerification key={item._id} data={item.document} />)}
        </div>
    </div>
};