import { Badge } from "../ui/badge";


type TBadgePickerProps = {
    data: { label: string; value: string }[];
    description: string;
    title: string;
    // 
    multi_value?: boolean;
    value: string[];
    // 
    onChange?: (_: TBadgePickerProps["value"]) => any;
};


export default function BadgePicker(props: TBadgePickerProps) {
    return <div className="border border-dashed gap-4 p-4 rounded-lg space-y-2">
        <div>
            <p className="text-sm">{props.title}</p>
            <p className="text-muted-foreground text-xs">{props.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
            {
                props.data.map(_ => <Badge
                    key={_.label}
                    className="cursor-pointer"
                    variant={props.value.includes(_.value) ? "secondary" : "outline"}
                    onClick={() => props.onChange?.(props.multi_value ? [...props.value, _.value] : [_.value])}
                >
                    {_.label}
                </Badge>)
            }
        </div>
    </div>
};