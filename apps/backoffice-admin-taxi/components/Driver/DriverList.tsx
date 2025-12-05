"use client"




import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { IconArrowRight, IconCar, IconFile } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import DriverDocsVerification from "./DriverDocsVerification";
import { TDriverOverView, TServerResponse } from "@/lib/type";
import DriverProvider from "@/providers/DriverProvider";
import { useQuery } from "@tanstack/react-query"
import DriverCarList from "./DriverCarList";
import QUERY_KEYS from "@/lib/QUERY_KEYS";
import API from "@/lib/API";




export default function DriverList() {
    const query = useQuery({
        queryKey: QUERY_KEYS.DRIVER_LIST(),
        queryFn: async () => API.get<TServerResponse<TDriverOverView[]>>("/user").then(({ data }) => data.data)
    });


    return <Table className="border">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>KYC Type</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {
                query.data?.content.map(_ => <TableRow key={_._id}>
                    <TableCell className="font-medium">{_.name}</TableCell>
                    <TableCell>{_.accountNumber}</TableCell>
                    <TableCell>{_.email}</TableCell>
                    <TableCell>{_.phone}</TableCell>
                    <TableCell>
                        {_.operatingCountryName} / {_.operatingCity}
                    </TableCell>
                    <TableCell>{_.kycType}</TableCell>
                    <TableCell>
                        <Dialog>
                            <DialogTrigger asChild>
                                <IconArrowRight
                                    size={15}
                                    className="transition-all cursor-pointer hover:translate-x-1"
                                />
                            </DialogTrigger>

                            <DialogContent showCloseButton={false} className='max-w-[60vw]!'>
                                {/* <DialogTitle></DialogTitle> */}
                                {/* <DialogDescription></DialogDescription> */}

                                <Tabs defaultValue='docs'>
                                    <TabsList className='w-[50%]'>
                                        <TabsTrigger value='docs'>
                                            <IconFile />
                                            Docs
                                        </TabsTrigger>
                                        <TabsTrigger value='cars'>
                                            <IconCar />
                                            Car
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value='docs'>
                                        <DriverProvider driver_id={_._id}>
                                            <DriverDocsVerification />
                                        </DriverProvider>
                                    </TabsContent>

                                    <TabsContent value='cars'>
                                        <DriverProvider driver_id={_._id}>
                                            <DriverCarList />
                                        </DriverProvider>
                                    </TabsContent>
                                </Tabs>
                            </DialogContent>
                        </Dialog>
                    </TableCell>
                </TableRow>)
            }
        </TableBody>
    </Table>
};