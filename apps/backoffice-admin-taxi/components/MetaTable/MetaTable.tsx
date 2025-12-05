import { Spinner } from '../ui/spinner';
import { usePartialState } from '@/hooks/hooks';
import type { TMetaTableProps } from '@/lib/type';
import { useMutation } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'




export default function MetaTable<T>(props: TMetaTableProps<T>) {
    const LocalState = usePartialState<{ current_item?: T; show_form?: boolean; }>({});
    const onSuccess = () => LocalState.setState({ show_form: false });


    return <Table className="border rounded-lg">
        <Sheet
            open={LocalState.state.show_form}
            onOpenChange={() => LocalState.setState({ current_item: undefined, show_form: !LocalState.state.show_form })}
        >
            <SheetContent className="p-4 max-w-[35vw]! overflow-auto">
                <SheetTitle></SheetTitle>
                {props.getForm({ defaultValue: LocalState.state.current_item, onSuccess })}
            </SheetContent>
        </Sheet>


        <TableHeader>
            <TableRow>
                {props.headers.map((header, i) => <TableHead key={i}>{header}</TableHead>)}

                {
                    !props.hiddenAdd &&
                    <TableHead>
                        <div
                            onClick={() => LocalState.setState({ current_item: undefined, show_form: true })}
                            className="border w-fit p-1 bg-secondary cursor-pointer flex items-center gap-1">
                            <IconPlus size={15} />
                            Add New
                        </div>
                    </TableHead>
                }
            </TableRow>
        </TableHeader>


        <TableBody>
            {
                props.getRows()?.map((data, i) => {
                    return <TableRow key={i}>
                        {props.buildRow(data).map((_, y) => <TableCell key={y}>{_}</TableCell>)}

                        <TableCell>
                            <div className="flex items-center gap-4">
                                {
                                    !props.hiddenEdit &&
                                    <IconPencil
                                        size={15}
                                        className="cursor-pointer"
                                        onClick={() => LocalState.setState({ current_item: data, show_form: true })}
                                    />
                                }

                                {
                                    !props.hiddenDelete &&
                                    <DeleteIcon
                                        onDelete={async () => props.deleteRow(data)}
                                    />
                                }
                            </div>
                        </TableCell>
                    </TableRow>
                })
            }
        </TableBody>
    </Table>
};




function DeleteIcon({ onDelete }: { onDelete: () => any }) {
    const delete_mutation = useMutation({ mutationFn: async () => onDelete() });

    if (delete_mutation.isPending) return <Spinner />

    return <IconTrash
        size={15}
        className="cursor-pointer"
        onClick={() => delete_mutation.mutateAsync()}
    />
};