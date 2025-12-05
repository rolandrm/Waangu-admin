type TT = {
    _id?: string;
    __v?: number;
    updatedAt?: string;
    createdAt?: string;
    acceptableVehicleTypes?: any;
};




export default function ParseUpdateSafePayload<T>(_: T & TT): Partial<T> {
    delete _._id;
    delete _.__v
    delete _.createdAt;
    delete _.updatedAt;
    delete _.acceptableVehicleTypes;
    return _;
};