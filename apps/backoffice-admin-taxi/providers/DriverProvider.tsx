import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/lib/QUERY_KEYS';
import { TDriver } from '@/lib/type'
import API from '@/lib/API';
import React from 'react';




export const DriverProviderObject = React.createContext<TDriver | null>(null);




export default function DriverProvider(props: React.PropsWithChildren<{ driver_id: string }>) {
    const query = useQuery({
        queryKey: QUERY_KEYS.DRIVER_DETAIL(props.driver_id),
        queryFn: async () => API.get<{ data: TDriver }>(`/user/drivers/full-profile/${props.driver_id}`).then(({ data }) => data.data)
    });

    if (query.isLoading) return <div className='flex justify-center items-center'>
        <Spinner />
    </div>;

    if (!query.data) return <p>Driver not found...</p>

    return <DriverProviderObject.Provider value={query.data}>
        {props.children}
    </DriverProviderObject.Provider>
};