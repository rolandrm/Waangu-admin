import type { TDriverCarCategory, TDriverCarCategoryInsert, TMetaTableExtra } from "@/lib/type";
import { useCarCategory, useCarType, usePartialState, useUtils } from "@/hooks/hooks";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import BadgePicker from "../BadgePicker/BadgePicker";
import FileUpload from "../FileUpload/FileUpload";
import { Combobox } from "../Combobox/Combobox";
import MetaTable from "../MetaTable/MetaTable";
import RetryTask from "../RetryTask/RetryTask";
import { Textarea } from "../ui/textarea";
import ToolTip from "../ToolTip/Tooltip";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";




export default function DriverCarCategory() {
    const { query, remove } = useCarCategory();


    return <MetaTable<TDriverCarCategory>
        headers={[
            "Name",
            "Usage",
            "Capacity",
            "Commision",
            <ToolTip body="Base Fare">BF</ToolTip>,
            <ToolTip body="Km Rate">KR</ToolTip>,
            "Discount",
            <ToolTip body="Night Price">NP</ToolTip>,
            <ToolTip body="Holiday Price">HP</ToolTip>,
            <ToolTip body="Free Cancel Minutes">FCM</ToolTip>,
            <ToolTip body="Customer Cancel Fees">CCF</ToolTip>,
            <ToolTip body="Driver Cancel Fees">DCF</ToolTip>
        ]}
        getRows={() => query.data!}
        deleteRow={({ _id }) => remove.mutateAsync(_id)}
        getForm={form_props => <DriverCarCategoryForm {...form_props} />}
        buildRow={(_) => [
            _.designation,
            _.usage,
            _.capacity,
            _.commission,
            _.baseFare,
            _.perKmRate,
            _.discount,
            _.nightTimePrice,
            _.holidayPrice,
            _.customerCancellationFee,
            _.freeCancellationMinutes,
            _.driverCancellationFee,
        ]}
    />
};




export function DriverCarCategoryForm({ defaultValue, onSuccess }: TMetaTableExtra<TDriverCarCategory>) {
    const car_type = useCarType();
    const { country } = useUtils();
    const { add, update } = useCarCategory();
    const error = add.error || update.error;
    const isPending = add.isPending || update.isPending;
    const LocalState = usePartialState<Partial<TDriverCarCategoryInsert>>({ ...defaultValue });
    const mutateAsync = async () => {
        const fun_ = defaultValue ? update.mutateAsync({ id: defaultValue._id, payload: LocalState.state }) : add.mutateAsync(LocalState.state);
        return fun_.then(onSuccess);
    };


    return <form
        onSubmit={e => {
            e.preventDefault();
            mutateAsync();
        }}
        className="space-y-4"
    >
        <Input
            placeholder="Enter The Name"
            value={LocalState.state.designation}
            onChange={({ target }) => LocalState.setState({ designation: target.value })}
        />

        <Textarea
            placeholder="Enter The Description"
            value={LocalState.state.description}
            onChange={({ target }) => LocalState.setState({ description: target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
            <Input
                value={LocalState.state.usage}
                placeholder="Usage: Example: TAXI"
                onChange={({ target }) => LocalState.setState({ usage: target.value })}
            />

            <Combobox
                empty_message=""
                placeholder="Picker A Country"
                value={LocalState.state.country || ""}
                onChange={_ => LocalState.setState({ country: _ })}
                data={country.data?.data.content.map(_ => ({ value: _._id, label: _.name.common })) || []}
            />
        </div>

        <FileUpload
            auto_upload
            extensions={[]}
            onUploadedFile={image => LocalState.setState({ image })}
            children={<span className="text-xs text-muted-foreground">
                {/* {LocalState.state.image?.split("/")[LocalState.state.image?.split("/").length - 1]} */}
            </span>}
        />

        <BadgePicker
            title="Car Type"
            value={LocalState.state.acceptableVehicleTypeIds || []}
            description="Mise à jour temps réel statut chauffeur via WebSocket ou MQTT."
            data={car_type.query.data?.map(_ => ({ label: _.name, value: _._id })) || []}
            onChange={acceptableVehicleTypeIds => LocalState.setState({ acceptableVehicleTypeIds })}
        />

        <div className="grid grid-cols-3 gap-4">
            <InputWithLabel
                type="number"
                label="Capacity"
                value={LocalState.state.capacity}
                onChange={({ target }) => LocalState.setState({ capacity: Number(target.value) })}
            />

            <InputWithLabel
                min="0"
                max="1"
                step="0.01"
                type="number"
                label="Commision"
                value={LocalState.state.commission}
                onChange={({ target }) => LocalState.setState({ commission: Number(target.value) })}
            />

            <InputWithLabel
                type="number"
                label="Base Fare"
                value={LocalState.state.baseFare}
                onChange={({ target }) => LocalState.setState({ baseFare: Number(target.value) })}
            />
        </div>

        <div className="grid grid-cols-3 gap-4">
            <InputWithLabel
                type="number"
                label="Rate per Km"
                value={LocalState.state.perKmRate}
                onChange={({ target }) => LocalState.setState({ perKmRate: Number(target.value) })}
            />

            <InputWithLabel
                type="number"
                label="Rate per minute"
                value={LocalState.state.perMinuteRate}
                onChange={({ target }) => LocalState.setState({ perMinuteRate: Number(target.value) })}
            />

            <InputWithLabel
                type="number"
                label="Demand Factor"
                value={LocalState.state.demandFactor}
                onChange={({ target }) => LocalState.setState({ demandFactor: Number(target.value) })}
            />
        </div>

        <div className="grid grid-cols-3 gap-4">
            <InputWithLabel
                type="number"
                label="Waiting Time"
                value={LocalState.state.waitingTime}
                onChange={({ target }) => LocalState.setState({ waitingTime: Number(target.value) })}
            />

            <InputWithLabel
                type="number"
                label="Base Service Fees"
                value={LocalState.state.baseServiceFee}
                onChange={({ target }) => LocalState.setState({ baseServiceFee: Number(target.value) })}
            />

            <InputWithLabel
                min="0"
                max="1"
                step="0.01"
                type="number"
                label="Discount"
                value={LocalState.state.discount}
                onChange={({ target }) => LocalState.setState({ discount: Number(target.value) })}
            />
        </div>

        <div className="grid grid-cols-3 gap-4">
            <InputWithLabel
                type="number"
                label="Night Price"
                value={LocalState.state.nightTimePrice}
                onChange={({ target }) => LocalState.setState({ nightTimePrice: Number(target.value) })}
            />

            <InputWithLabel
                type="number"
                label="Holiday Price"
                value={LocalState.state.holidayPrice}
                onChange={({ target }) => LocalState.setState({ holidayPrice: Number(target.value) })}
            />

            <InputWithLabel
                type="number"
                label="Customer Cancel Fees"
                value={LocalState.state.customerCancellationFee}
                onChange={({ target }) => LocalState.setState({ customerCancellationFee: Number(target.value) })}
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <InputWithLabel
                type="number"
                label="Free Cancel Duration"
                value={LocalState.state.freeCancellationMinutes}
                onChange={({ target }) => LocalState.setState({ freeCancellationMinutes: Number(target.value) })}
            />

            <InputWithLabel
                type="number"
                label="Driver Cancel Frees"
                value={LocalState.state.driverCancellationFee}
                onChange={({ target }) => LocalState.setState({ driverCancellationFee: Number(target.value) })}
            />
        </div>

        {
            error &&
            <RetryTask text={error.message} onRetry={mutateAsync} />
        }

        <Button className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : "Save"}
        </Button>
    </form>
};