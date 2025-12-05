"use client"




import * as React from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { IconCalendar } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";




function yearsForward(start: number, tour: number = 10): number[] {
    const result: number[] = [];
    for (let y = start; y <= start + tour; y++) {
        result.push(y);
    };
    return result;
};




function yearsBackward(start: number, tour: number = 10): number[] {
    const result: number[] = [];
    for (let y = start; y >= start - tour; y--) {
        result.push(y);
    };
    return result;
};




export default function YearPicker(props: React.PropsWithChildren<{ value?: number; onChange: (_: number) => any }>) {
    const { value, onChange } = props;
    const [open, setOpen] = React.useState(false);


    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <div className="border border-dashed p-4 rounded-lg text-sm flex justify-between">
                <div className="flex items-center justify-start gap-1">
                    <IconCalendar size={20} />
                    <span>Picker Year</span>
                </div>

                <p>{value}</p>
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-[25vw] overflow-hidden p-0" align="start">
            <div>
                <Input
                    onChange={({ target }) => onChange(Number(target.value))}
                    className="rounded-none border-x-0 border-t-0"
                    placeholder="Example: 2010"
                    type="number"
                />
                <div className="flex justify-start flex-wrap gap-2 p-4">
                    {
                        [
                            ...yearsBackward(new Date().getFullYear() - 1, 5),
                            ...yearsForward(new Date().getFullYear(), 5)
                        ].sort((a, b) => a - b).map(_ => <Badge
                            key={_}
                            className="cursor-pointer"
                            onClick={() => onChange(_)}
                            variant={_ === value ? "default" : "outline"}
                        >
                            {_}
                        </Badge>)}
                </div>
            </div>
        </PopoverContent>
    </Popover>
};