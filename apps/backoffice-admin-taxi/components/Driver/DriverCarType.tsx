import type { TDriverCarType, TMetaTableExtra } from "@/lib/type";
import { useCarType, usePartialState } from "@/hooks/hooks";
import BadgePicker from "../BadgePicker/BadgePicker";
import YearPicker from "../YearPicker/YearPicker";
import MetaSwitch from "../MetaSwitch/MetaSwitch";
import FileUpload from "../FileUpload/FileUpload";
import MetaTable from "../MetaTable/MetaTable";
import { Checkbox } from "../ui/checkbox";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";




export default function DriverCarType() {
    const { query, remove } = useCarType();
    return <MetaTable<TDriverCarType>
        headers={[
            "Name",
            "Weight Class",
            "Active",
            "Special License",
            "Average Cargo Volume Liters"
        ]}
        getRows={() => query.data!}
        deleteRow={({ _id }) => remove.mutateAsync(_id)}
        getForm={(_) => <DriverCarTypeForm {..._} />}
        buildRow={(_) => [
            _.name,
            _.weightClass,
            <Checkbox checked={_.isActive} />,
            <Checkbox checked={_.needsSpecialLicense} />,
            _.averageCargoVolumeLiters
        ]}
    />
};




export function DriverCarTypeForm({ defaultValue, onSuccess }: TMetaTableExtra<TDriverCarType>) {
    const LocalState = usePartialState<Omit<TDriverCarType, "_id" | "__v" | "createdAt" | "updatedAt">>({
        name: "",
        icon: "",
        minYear: 0,
        isActive: false,
        weightClass: "Light",
        needsSpecialLicense: false,
        averageCargoVolumeLiters: 0,
        ...defaultValue
    });

    const WeightData: { label: string; value: typeof LocalState.state.weightClass }[] = [
        { label: "Heavy", value: "Heavy" },
        { label: "Medium", value: "Medium" },
        { label: "Light", value: "Light" }
    ];

    const { add, update } = useCarType();
    const isPending = add.isPending || update.isPending;
    const mutateAsync = async () => {
        const fun_ = defaultValue ? update.mutateAsync({ id: defaultValue._id, payload: LocalState.state }) : add.mutateAsync(LocalState.state);
        fun_.then(onSuccess);
    };


    return <form
        onSubmit={e => {
            e.preventDefault();
            mutateAsync();
        }}
        className="space-y-4"
    >
        <Input
            value={LocalState.state.name}
            placeholder="Enter The Type Name"
            onChange={({ target }) => LocalState.setState({ name: target.value })}
        />

        <FileUpload
            auto_upload
            extensions={[]}
            onUploadedFile={icon => LocalState.setState({ icon })}
            children={<span className="text-xs text-muted-foreground">
                {LocalState.state.icon.split("/")[LocalState.state.icon.split("/").length - 1]}
            </span>}
        />

        <BadgePicker
            data={WeightData}
            title="Weight Class"
            value={[LocalState.state.weightClass]}
            description="Mise à jour temps réel statut chauffeur via WebSocket ou MQTT."
            onChange={_ => LocalState.setState({ weightClass: _[0] as typeof LocalState.state.weightClass })}
        />

        <YearPicker
            value={LocalState.state.minYear}
            onChange={minYear => LocalState.setState({ minYear })}
        />

        <div>
            <p className="text-sm">Average Cargo Volume Liter</p>
            <Input
                type="number"
                value={LocalState.state.averageCargoVolumeLiters}
                onChange={({ target }) => LocalState.setState({ averageCargoVolumeLiters: Number(target.value) })}
            />
        </div>

        <MetaSwitch
            title="Actif"
            checked={LocalState.state.isActive}
            onCheckedChange={isActive => LocalState.setState({ isActive })}
            description="By enabling this type, you allow taxi drivers with this type to operate."
        />

        <MetaSwitch
            title="Special License"
            checked={LocalState.state.needsSpecialLicense}
            description="Please attach a document or special license related to this type"
            onCheckedChange={needsSpecialLicense => LocalState.setState({ needsSpecialLicense })}
        />

        <Button className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : "Save"}
        </Button>
    </form>
};