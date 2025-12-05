import { IconArrowUpRight, IconCheck, IconDotsVertical, IconFile } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { usePartialState, useQueryInvalidator } from "@/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import { TDriverDocument } from "@/lib/type";
import { Textarea } from "../ui/textarea";
import QUERY_KEYS from "@/lib/QUERY_KEYS";
import { useDriver } from '@/hooks/hooks';
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import classnames from "classnames"
import API from "@/lib/API";




export function DocFileVerification({ data }: { data: TDriverDocument }) {
    return <div className='flex items-center gap-4'>
        <div className='border p-2 w-fit rounded-lg'>
            <IconFile size={25} />
        </div>

        <div className='w-full'>
            <div className='flex items-center justify-between'>
                <p className="text-sm">{data.documentType}</p>

                <div className='flex items-center gap-4'>
                    {
                        data.status === "VERIFIED" &&
                        <Badge variant="secondary"><IconCheck /></Badge>
                    }

                    {
                        data.status === "EXPIRED" &&
                        <Badge variant="destructive">Expired</Badge>
                    }

                    {
                        data.status === "REJECTED" &&
                        <Badge variant="destructive">Rejected</Badge>
                    }

                    <Popover>
                        <PopoverTrigger asChild>
                            <IconDotsVertical size={15} />
                        </PopoverTrigger>
                        <PopoverContent className="w-[30vw]">
                            <DocStateForm data={data} />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <a href={data.fileUrl} target='_blank' className='flex items-center gap-2 underline w-fit'>
                <p className='text-sm text-muted-foreground'>{data.fileName}</p>
                <IconArrowUpRight size={15} />
            </a>
        </div>
    </div>
};




function DocStateForm({ data }: { data: TDriverDocument }) {
    const driver = useDriver();
    const LocalState = usePartialState({
        status: data.status,
        // notes: "",
        rejectionReason: ""
    });
    const Invalidate = useQueryInvalidator();
    const mutation = useMutation({
        onSuccess: () => Invalidate(QUERY_KEYS.DRIVER_DETAIL(driver.personalInfo.id)),
        mutationFn: async () => API.patch(`/driver-documents/${data._id}/verify`, LocalState.state)
    });


    return <form
        className="space-y-4"
        onSubmit={e => {
            e.preventDefault();
            mutation.mutateAsync();
        }}
    >
        <div>
            <p className="text-sm">Please Pick A State</p>
            <div className="flex items-center gap-4">
                {
                    (["PENDING", "VERIFIED", "REJECTED", "EXPIRED"] as TDriverDocument["status"][]).map(_ => <Badge
                        key={_}
                        className="cursor-pointer"
                        onClick={() => LocalState.setState({ status: _ })}
                        variant={_ === LocalState.state.status ? "secondary" : "outline"}
                    >
                        {_}
                    </Badge>)
                }
            </div>
        </div>

        <div className={classnames({ "hidden": LocalState.state.status !== "REJECTED" })}>
            <p className="text-sm">Leave a note for communication purpose.</p>
            <Textarea
                value={LocalState.state.rejectionReason}
                onChange={({ target }) => LocalState.setState({ rejectionReason: target.value })}
            />
        </div>

        <Button className="w-full">
            {mutation.isPending ? <Spinner /> : "Save"}
        </Button>
    </form>
};