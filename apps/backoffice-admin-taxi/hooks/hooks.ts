import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ParseUpdateSafePayload from "@/functions/ParseUpdateSafePayload";
import { DriverProviderObject } from "@/providers/DriverProvider";
import { TDriverCarCategory, TDriverCarType, TDriverDashboardData } from "@/lib/type";
import { UtilsProviderObject } from "@/providers/UtilsProvider";
import QUERY_KEYS from "@/lib/QUERY_KEYS";
import API from "@/lib/API";
import React from "react";




export function usePartialState<T>(props: T) {
    const [state, setState] = React.useState(props);

    return {
        state,
        getState: () => state,
        initState: () => setState(props),
        setState: (args: Partial<T>) => setState(_ => ({ ..._, ...args })),
        // 
        innerUpdate: (fun: (value: T) => Partial<T>) => setState(_ => {
            return {
                ..._,
                ...fun(_)
            }
        }),
    }
};




export function useQueryInvalidator(InitKeys: string[] = []) {
    const QueryClient = useQueryClient();
    return async (ArgsKeys: string[] = []) => [...InitKeys, ...ArgsKeys].forEach(key => QueryClient.invalidateQueries({ queryKey: [key] }))
};




export function useUser() {
    // return React.useContext(UserAuthCheckContextObject)!
};




export function useBooleanToggle(init = false) {
    const [state, setState] = React.useState(init);
    return { state, toggle: () => setState(_ => !_) };
};




export function useLiveData() {
    // return React.useContext(MQTTContextObject);
};




export function useObjectToUriQuery(baseuri: string, args: Record<string, string | number>) {
    const q = new URLSearchParams(
        Object.keys(args).filter(_ => args[_]).reduce((_, __) => ({ ..._, [__]: args[__] }), {})
    ).toString();

    return `${baseuri}?${q}`
};




export function useUtils() {
    const _ = React.useContext(UtilsProviderObject)!;
    return _;
};




export function useDriver() {
    return React.useContext(DriverProviderObject)!;
};




export function useCarType() {
    const Invalidator = useQueryInvalidator();

    const query = useQuery({
        queryKey: QUERY_KEYS.DRIVER_CAR_TYPE_LIST(),
        queryFn: async () => API.get<{ data: Array<TDriverCarType> }>("/vehicle-types").then(({ data }) => data.data)
    });

    const add = useMutation({
        mutationFn: async (payload: any) => API.post("/vehicle-types", payload),
        onSuccess: () => Invalidator(QUERY_KEYS.DRIVER_CAR_TYPE_LIST())
    });

    const update = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: Partial<TDriverCarType> }) => API.put(`/vehicle-types/${id}`, ParseUpdateSafePayload(payload)),
        onSuccess: () => Invalidator(QUERY_KEYS.DRIVER_CAR_TYPE_LIST())
    });

    const remove = useMutation({
        mutationFn: async (id: string) => API.delete(`/vehicle-types/${id}`),
        onSuccess: () => Invalidator(QUERY_KEYS.DRIVER_CAR_TYPE_LIST())
    });

    return { query, add, update, remove };
};




export function useCarCategory() {
    const Invalidator = useQueryInvalidator();

    const query = useQuery({
        queryKey: QUERY_KEYS.DRIVER_CAR_CATEGORY_LIST(),
        queryFn: async () => API.get<{ data: Array<TDriverCarCategory> }>("/vehicle-categories").then(({ data }) => data.data)
    });

    const add = useMutation({
        mutationFn: async (payload: any) => API.post("/vehicle-categories", payload),
        onSuccess: () => Invalidator(QUERY_KEYS.DRIVER_CAR_CATEGORY_LIST())
    });

    const update = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: Partial<TDriverCarCategory> }) => API.put(`/vehicle-categories/${id}`, ParseUpdateSafePayload(payload)),
        onSuccess: () => Invalidator(QUERY_KEYS.DRIVER_CAR_CATEGORY_LIST())
    });

    const remove = useMutation({
        mutationFn: async (id: string) => API.delete(`/vehicle-categories/${id}`),
        onSuccess: () => Invalidator(QUERY_KEYS.DRIVER_CAR_CATEGORY_LIST())
    });

    return { query, add, update, remove };
};




export function useDriverDashboard(queries: Record<any, any> = {}) {
    return useQuery({
        queryKey: QUERY_KEYS.DRIVER_DASHBOARD_DATA(queries),
        queryFn: async () => API.get<{ data: TDriverDashboardData }>("/dashboard/complete", { params: queries }).then(({ data }) => data.data)
    });
};