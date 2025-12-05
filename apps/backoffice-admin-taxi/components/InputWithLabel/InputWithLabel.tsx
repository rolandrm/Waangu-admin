import React from "react";
import { Input } from "../ui/input";




export default function InputWithLabel({ label, ...props }: React.ComponentProps<typeof Input> & { label: React.ReactNode }) {
    return <div>
        <p className="text-sm">{label}</p>
        <Input {...props} />
    </div>
};