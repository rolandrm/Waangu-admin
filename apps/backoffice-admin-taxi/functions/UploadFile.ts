import GetPresignedLink from "./GetPresignedLink";




export default async function UploadFile(props: { file: File; abortor?: AbortController }) {
    const { data: { url } } = await GetPresignedLink({
        file_name: props.file.name,
        file_size: props.file.size,
        folder: "other"
    });

    const response = await fetch(url, {
        headers: { 'Content-Type': props.file.type },
        signal: props.abortor?.signal,
        body: props.file,
        method: 'PUT',
    });

    if (!response.ok) throw new Error("We face error during Uploading.")

    return { url: url.split("?")[0] };
};