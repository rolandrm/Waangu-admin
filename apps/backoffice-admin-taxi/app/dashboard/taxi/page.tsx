"use client"




import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DriverCarCategory from "@/components/Driver/DriverCarCategory";
import TaxiSubscription from "@/components/Driver/DriverSubscription";
import { IconLayoutDashboard, IconList } from "@tabler/icons-react";
import DriverDashboard from "@/components/Driver/DriverDashboard";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import DriverCarType from "@/components/Driver/DriverCarType";
import DriverList from "@/components/Driver/DriverList";
// import { Button } from "@/components/ui/button";




export default function Page() {
    return <PageWrapper title="DRIVER"
        header={
            <Sheet>
                <SheetTrigger asChild>
                    {/* <Button size="sm">
                        SOUSCRIPTION
                    </Button> */}
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle></SheetTitle>
                    <div className="p-4">
                        <TaxiSubscription />
                    </div>
                </SheetContent>
            </Sheet>
        }
    >
        <Tabs defaultValue="dashboard">
            <TabsList className="w-[40%] mb-2">
                <TabsTrigger value="dashboard">
                    <IconLayoutDashboard />
                    Dashboard
                </TabsTrigger>

                <TabsTrigger value="list">
                    <IconList />
                    List
                </TabsTrigger>

                <TabsTrigger value="car-type">
                    <IconList />
                    Car Type
                </TabsTrigger>

                <TabsTrigger value="car-category">
                    <IconList />
                    Car Category
                </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
                <DriverDashboard />
            </TabsContent>

            <TabsContent value="list">
                <DriverList />
            </TabsContent>

            <TabsContent value="car-type">
                <DriverCarType />
            </TabsContent>

            <TabsContent value="car-category">
                <DriverCarCategory />
            </TabsContent>
        </Tabs>
    </PageWrapper>
};