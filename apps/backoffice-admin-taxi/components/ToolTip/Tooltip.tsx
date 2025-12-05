import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";


export default function ToolTip(props: React.PropsWithChildren<{ body: React.ReactNode }>) {
    return <Tooltip>
        <TooltipTrigger asChild>
            <div>{props.children}</div>
        </TooltipTrigger>
        <TooltipContent>
            {props.body}
        </TooltipContent>
    </Tooltip>
};