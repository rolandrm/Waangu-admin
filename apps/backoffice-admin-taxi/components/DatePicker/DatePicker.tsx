"use client"




import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"




export default function DatePicker(props: React.PropsWithChildren<{ value?: Date; onChange: (_: Date) => any }>) {
    const { value: date, onChange } = props;
    const [open, setOpen] = React.useState(false);


    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            {props.children}
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={date_ => {
                    onChange(date_!);
                    setOpen(false);
                }}
            />
        </PopoverContent>
    </Popover>
};