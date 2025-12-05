import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import React from 'react';
import classNames from 'classnames';




export default function PageWrapper({ title, header, children, className, ...props }: React.HTMLProps<HTMLDivElement> & { title: string; header?: React.ReactNode }) {
    return <div {...props} className={classNames("space-y-4", className)}>
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <SidebarTrigger className="-ml-1 cursor-pointer" />
                <h3 className='font-extrabold'>{title}</h3>
            </div>

            {header}
        </div>

        <Separator />

        {children}
    </div>
};