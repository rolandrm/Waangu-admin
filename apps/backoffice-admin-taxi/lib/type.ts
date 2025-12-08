export type TServerResponse<T> = {
    statusCode: number;
    message: string,
    data: {
        content: T;
        total: number;
        limit: number;
        page: number;
        pageSize: number;
    }
};




export type TCountry = {
    _id: string
    name: {
        common: string
        official: string
        native: {
            fra: {
                official: string
                common: string
                _id: string
            }
            kon: {
                official: string
                common: string
                _id: string
            }
            lin: {
                official: string
                common: string
                _id: string
            }
            lua: {
                official: string
                common: string
                _id: string
            }
            swa: {
                official: string
                common: string
                _id: string
            }
        }
        _id: string
    }
    tld: Array<string>
    cca2: string
    ccn3: string
    cca3: string
    cioc: string
    independent: boolean
    status: string
    unMember: boolean
    currencies: {
        CDF: {
            name: string
            symbol: string
            _id: string
        }
    }
    idd: {
        root: string
        suffixes: Array<string>
        _id: string
    }
    capital: Array<string>
    altSpellings: Array<string>
    region: string
    subregion: string
    languages: {
        fra: string
        kon: string
        lin: string
        lua: string
        swa: string
    }
    translations: {
        ces: {
            official: string
            common: string
            _id: string
        }
        cym: {
            official: string
            common: string
            _id: string
        }
        deu: {
            official: string
            common: string
            _id: string
        }
        est: {
            official: string
            common: string
            _id: string
        }
        fin: {
            official: string
            common: string
            _id: string
        }
        fra: {
            official: string
            common: string
            _id: string
        }
        hrv: {
            official: string
            common: string
            _id: string
        }
        hun: {
            official: string
            common: string
            _id: string
        }
        ita: {
            official: string
            common: string
            _id: string
        }
        jpn: {
            official: string
            common: string
            _id: string
        }
        kor: {
            official: string
            common: string
            _id: string
        }
        nld: {
            official: string
            common: string
            _id: string
        }
        per: {
            official: string
            common: string
            _id: string
        }
        pol: {
            official: string
            common: string
            _id: string
        }
        por: {
            official: string
            common: string
            _id: string
        }
        rus: {
            official: string
            common: string
            _id: string
        }
        slk: {
            official: string
            common: string
            _id: string
        }
        spa: {
            official: string
            common: string
            _id: string
        }
        swe: {
            official: string
            common: string
            _id: string
        }
        urd: {
            official: string
            common: string
            _id: string
        }
        zho: {
            official: string
            common: string
            _id: string
        }
    }
    latlng: Array<number>
    landlocked: boolean
    borders: Array<string>
    area: number
    flag: string
    demonyms: {
        eng: {
            f: string
            m: string
        }
        fra: {
            f: string
            m: string
        }
        _id: string
    }
    statut: boolean
    createdAt: string
    updatedAt: string
    __v: number
}





export type TDriverOverView = {
    _id: string
    accountName: string
    accountNumber: string
    avatar: string
    birth: string
    email: string
    gender: string
    maritalStatus: string
    name: string
    firstName: string
    lastName: string
    phone: string
    phone2: string
    kycType: string
    operatingCountryName: string
    operatingCity: string
    secondaryCities: Array<any>
    lang: string
    isSubMerchant: boolean
    roles: Array<string>
    status: string
    type: string
    totalRatings: number
    averageRating: number
    ratings: Array<any>
    notes: {
        "1": number
        "2": number
        "3": number
        "4": number
        "5": number
    }
    createdAt: string
    updatedAt: string
};




export type TDriver = {
    personalInfo: {
        id: string
        firstName: string
        lastName: string
        name: string
        email: string
        phone: string
        phone2: string
        birth: string
        gender: string
        maritalStatus: string
        lang: string
    }
    location: {
        operatingCountryName: string
        operatingCity: string
        secondaryCities: Array<any>
    }
    kyc: {
        kycType: string
        avatar: string
        documents: Array<{
            _id: string
            documentType: string
            fileName: string
            fileUrl: string
            status: string
            isExpired: boolean
            documentNumber?: string
            expiryDate?: string
        }>
    }
    bankInfo: {
        accountName: string
        accountNumber: string
    }
    status: {
        status: string
        roles: Array<string>
        type: string
        isSubMerchant: boolean
    }
    ratings: {
        averageRating: number
        totalRatings: number
        notes: {
            "1": number
            "2": number
            "3": number
            "4": number
            "5": number
        }
        recentRatings: Array<any>
    }
    vehicles: Array<{
        _id: string
        brand: string
        year: number
        color: string
        licensePlate: string
        vin: string
        mileage: string
        status: string
        isActive: boolean
        isApproved: boolean
        vehicleType?: {
            _id: string
            name: string
            icon: string
            weightClass: string
            averageCargoVolumeLiters: number
            needsSpecialLicense: boolean
            minYear: number
            isActive: boolean
            __v: number
            createdAt: string
            updatedAt: string
        }
        vehicleCategory: {
            _id: string
            designation: string
            description: string
            usage: string
            country: string
            image: string
            capacity: number
            commission: number
            acceptableVehicleTypes: Array<string>
            baseFare: number
            perKmRate: number
            perMinuteRate: number
            demandFactor: number
            waitingTime: number
            baseServiceFee: number
            discount: number
            nightTimePrice: number
            holidayPrice: number
            customerCancellationFee: number
            freeCancellationMinutes: number
            driverCancellationFee: number
            __v: number
            createdAt: string
            updatedAt: string
        }
        hasAllRequiredDocuments: boolean
        allDocumentsVerified: boolean
        documents: {
            registration: {
                _id: string
                driver: string
                documentType: string
                fileName: string
                fileUrl: string
                mimeType: string
                fileSize: number
                status: string
                documentNumber: string
                issueDate: string
                issuingAuthority: string
                issuingCountry: string
                isExpired: boolean
                expiryAlertSent: boolean
                verificationData: {
                    verifiedBy: string
                    verifiedAt: string
                    verificationMethod: string
                }
                version: number
                isDeleted: boolean
                createdAt: string
                updatedAt: string
            }
            photoFront: {
                _id: string
                driver: string
                documentType: string
                fileName: string
                fileUrl: string
                mimeType: string
                fileSize: number
                status: string
                isExpired: boolean
                expiryAlertSent: boolean
                verificationData: {
                    verifiedBy: string
                    verifiedAt: string
                    verificationMethod: string
                }
                version: number
                isDeleted: boolean
                createdAt: string
                updatedAt: string
            }
            photoBack: {
                _id: string
                driver: string
                documentType: string
                fileName: string
                fileUrl: string
                mimeType: string
                fileSize: number
                status: string
                isExpired: boolean
                expiryAlertSent: boolean
                verificationData: {
                    verifiedBy: string
                    verifiedAt: string
                    verificationMethod: string
                }
                version: number
                isDeleted: boolean
                createdAt: string
                updatedAt: string
            }
            technicalInspection: {
                _id: string
                driver: string
                documentType: string
                fileName: string
                fileUrl: string
                mimeType: string
                fileSize: number
                status: string
                documentNumber: string
                issueDate: string
                expiryDate: string
                issuingAuthority: string
                issuingCountry: string
                isExpired: boolean
                expiryAlertSent: boolean
                verificationData: {
                    verifiedBy: string
                    verifiedAt: string
                    verificationMethod: string
                }
                version: number
                isDeleted: boolean
                createdAt: string
                updatedAt: string
            }
        }
        insurances: Array<{
            _id: string
            policyNumber: string
            insuranceCompany: string
            insuranceType: string
            startDate: string
            expiryDate: string
            status: string
            isCurrent: boolean
            isExpired: boolean
            coverageAmount: number
            document: TDriverDocument
            // document: {
            //     _id: string
            //     driver: string
            //     documentType: string
            //     fileName: string
            //     fileUrl: string
            //     mimeType: string
            //     fileSize: number
            //     status: string
            //     documentNumber: string
            //     issueDate: string
            //     expiryDate: string
            //     issuingAuthority: string
            //     issuingCountry: string
            //     isExpired: boolean
            //     expiryAlertSent: boolean
            //     verificationData: {
            //         verifiedBy: string
            //         verifiedAt: string
            //         verificationMethod: string
            //     }
            //     version: number
            //     isDeleted: boolean
            //     createdAt: string
            //     updatedAt: string
            // }
        }>
        currentInsurance: {
            _id: string
            policyNumber: string
            insuranceCompany: string
            expiryDate: string
            status: string
        }
    }>
    documents: {
        kyc: Array<TDriverDocument>
        vehicle: Array<TDriverDocument>
        insurance: Array<TDriverDocument>
        other: Array<TDriverDocument>
        all: Array<TDriverDocument>
    }
    statistics: {
        totalVehicles: number
        activeVehicles: number
        approvedVehicles: number
        totalInsurances: number
        activeInsurances: number
        totalDocuments: number
        verifiedDocuments: number
        pendingDocuments: number
        rejectedDocuments: number
        totalRatings: number
        averageRating: number
    }
    profileCompletion: {
        personalInfo: boolean
        kycDocuments: boolean
        hasVehicle: boolean
        hasActiveVehicle: boolean
        hasInsurance: boolean
        allDocumentsVerified: boolean
        percentage: number
        isComplete: boolean
        canStartWorking: boolean
    }
    metadata: {
        createdAt: string
        updatedAt: string
    }
};




export type TDriverDocument = {
    _id: string
    driver: string
    documentType: string
    fileName: string
    fileUrl: string
    mimeType: string
    fileSize: number
    status: "PENDING" | "VERIFIED" | "REJECTED" | "EXPIRED"
    isExpired: boolean
    expiryAlertSent: boolean
    verificationData: {
        verifiedBy: string
        verifiedAt: string
        verificationMethod: string
        confidence?: number
    }
    version: number
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    documentNumber?: string
    issueDate?: string
    expiryDate?: string
    issuingAuthority?: string
    issuingCountry?: string
};




export type TDriverCarType = {
    _id: string
    name: string
    icon: string
    weightClass: 'Light' | 'Medium' | 'Heavy'
    averageCargoVolumeLiters: number
    needsSpecialLicense: boolean
    minYear: number
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
};




export type TDriverCarCategory = {
    _id: string
    designation: string
    description: string
    usage: string
    country: string
    image: string
    capacity: number
    commission: number
    acceptableVehicleTypes: Array<{
        _id: string
        name: string
        icon: string
        weightClass: string
        averageCargoVolumeLiters: number
        needsSpecialLicense: boolean
        minYear: number
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
    }>
    baseFare: number
    perKmRate: number
    perMinuteRate: number
    demandFactor: number
    waitingTime: number
    baseServiceFee: number
    discount: number
    nightTimePrice: number
    holidayPrice: number
    customerCancellationFee: number
    freeCancellationMinutes: number
    driverCancellationFee: number
    __v: number
    createdAt: string
    updatedAt: string
};




export type TDriverCarCategoryInsert = {
    designation: string
    description: string
    usage: string
    country: string
    image: string
    acceptableVehicleTypeIds: Array<string>
    capacity: number
    commission: number
    baseFare: number
    perKmRate: number
    perMinuteRate: number
    demandFactor: number
    waitingTime: number
    baseServiceFee: number
    discount: number
    nightTimePrice: number
    holidayPrice: number
    customerCancellationFee: number
    freeCancellationMinutes: number
    driverCancellationFee: number
};





export type TMetaTableExtra<T> = {
    onSuccess: () => any;
    defaultValue?: T;
};
export type TMetaTableProps<T> = {
    headers: React.ReactNode[];
    // 
    getRows: () => T[];
    deleteRow: (_: T) => any;
    buildRow: (_: T) => React.ReactNode[];
    getForm: (_: TMetaTableExtra<T>) => React.ReactNode;
    // 
    hiddenAdd?: boolean;
    hiddenEdit?: boolean;
    hiddenDelete?: boolean;
};




export type TDriverDashboardData = {
    summary: {
        activeDrivers: number
        totalCars: number
        carsWithInsurance: number
        rejectedDrivers: number
    }
    carsByCategory: Array<{
        categoryId: string
        categoryName: string
        count: number
        percentage: string
    }>
    insurance: {
        carsWithInsurance: number
        carsWithoutInsurance: number
        percentage: string
    }
    registrationTrends: {
        period: string
        trends: Array<{
            _id: string
            totalRegistrations: number
            activeDrivers: number
            pendingDrivers: number
            phoneVerifiedDrivers: number
            inactiveDrivers: number
        }>
        summary: {
            totalRegistrations: number
            averagePerPeriod: string
            growthRate: string
            periodsAnalyzed: number
        }
    }
    filters: {}
    generatedAt: string
};