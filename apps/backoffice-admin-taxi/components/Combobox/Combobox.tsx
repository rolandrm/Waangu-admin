"use client"




import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { useBooleanToggle } from "@/hooks/hooks"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as React from "react"




type TComboboxProps = {
    value: string;
    placeholder: string;
    empty_message: string;
    onChange: (_: TComboboxProps["value"]) => any;
    data: Array<{ label: React.ReactNode; value: string; disabled?: boolean }>;
};




export function Combobox({ data, value, onChange, placeholder, empty_message }: TComboboxProps) {
    const open = useBooleanToggle();
    // const [open, setOpen] = React.useState(false);
    // const [value, setValue] = React.useState("");


    return <Popover open={open.state} onOpenChange={open.toggle}>
        <PopoverTrigger asChild>
            <Button
                role="combobox"
                variant="outline"
                aria-expanded={open.state}
                className="w-full justify-between"
            >
                {value ? data.find(item => item.value === value)?.label : placeholder}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
            <Command>
                <CommandInput
                    placeholder={placeholder}
                // onChange
                />

                <CommandList>
                    <CommandEmpty>{empty_message}</CommandEmpty>
                    <CommandGroup>
                        {
                            data.map(item => <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={currentValue => {
                                    onChange(currentValue === value ? "" : currentValue);
                                    open.toggle();
                                }}
                                disabled={item.disabled}
                            >
                                <CheckIcon
                                    className={cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")}
                                />
                                {item.label}
                            </CommandItem>)
                        }
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
};