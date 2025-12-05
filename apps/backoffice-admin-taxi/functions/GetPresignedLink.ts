import API from "@/lib/API";


type TFolderType = "status" | "profile" | "message" | "other"


type TReponse = {
    data: {
        url: string;
        uploadId: string;
        objectName: string;
        // urls: { start: number; end: number; partNumber: number; url: string }[];
    }
};


export default async function GetPresignedLink({ file_name, file_size, folder }: { file_name: string; file_size: number; folder: TFolderType }) {
    return API.post<TReponse>(`/upload-files/presigned-urls`, {
        filename: file_name,
        size: file_size,
        location: folder
    }).then(({ data }) => data)
};