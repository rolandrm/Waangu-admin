import { Switch } from '../ui/switch'




type TMetaSwitchProps = React.ComponentProps<typeof Switch> & {
    title: string;
    description: string;
};




export default function MetaSwitch(props: TMetaSwitchProps) {
    return <div className="flex items-center gap-4 p-4 border rounded-lg">
        <Switch {...props} />
        <div>
            <p className='text-sm'>{props.title}</p>
            <p className="text-xs text-muted-foreground">
                {props.description}
            </p>
        </div>
    </div>
};