import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
// import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import UtilsProvider from "@/providers/UtilsProvider";




export default function Layout(props: React.PropsWithChildren) {
    return <ReactQueryProvider>
        <UtilsProvider>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <div className="flex flex-1 flex-col p-4">
                        {props.children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </UtilsProvider>
    </ReactQueryProvider>
};