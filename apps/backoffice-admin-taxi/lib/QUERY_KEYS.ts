const QUERY_KEYS = {
    COUNTRY_LIST: () => ["COUNTRY_LIST"],
    // 
    DRIVER_LIST: () => ["DRIVER-LIST"],
    // 
    DRIVER_DASHBOARD_DATA: (params: any = {}) => [`DRIVER_DASHBOARD_DATA_${JSON.stringify(params)}`],
    DRIVER_DETAIL: (id: string) => [`DRIVER-DETAIL-${id}`],
    // 
    DRIVER_CAR_TYPE_LIST: () => [`DRIVER_CAR_TYPE_LIST`],
    DRIVER_CAR_CATEGORY_LIST: () => [`DRIVER_CAR_CATEGORY_LIST`],
};




export default QUERY_KEYS;