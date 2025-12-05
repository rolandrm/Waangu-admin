const QUERY_KEYS = {
    DRIVER_LIST: () => ["DRIVER-LIST"],
    // 
    DRIVER_DETAIL: (id: string) => [`DRIVER-DETAIL-${id}`],
    // 
    DRIVER_CAR_TYPE_LIST: () => [`DRIVER_CAR_TYPE_LIST`],
    DRIVER_CAR_CATEGORY_LIST: () => [`DRIVER_CAR_CATEGORY_LIST`],
};




export default QUERY_KEYS;