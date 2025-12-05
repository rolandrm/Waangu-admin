"use client"




import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import { TCountry, TServerResponse } from "@/lib/type";
import API from "@/lib/API";
import React from "react"




export const UtilsProviderObject = React.createContext<{
    country: UseQueryResult<TServerResponse<TCountry[]>>
} | null>(null);




export default function UtilsProvider(props: React.PropsWithChildren) {
    const [country] = useQueries({
        queries: [
            {
                queryKey: [],
                queryFn: async () => API.get<TServerResponse<TCountry[]>>("/country").then(({ data }) => data)
            }
        ]
    });

    return <UtilsProviderObject.Provider
        value={{ country }}
    >
        {props.children}
    </UtilsProviderObject.Provider>
};