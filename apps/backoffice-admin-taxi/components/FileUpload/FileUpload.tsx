"use client"




import { useMutation } from "@tanstack/react-query";
import UploadFile from "@/functions/UploadFile";
import { LoaderIcon } from "lucide-react";
import React from "react";




type TFileUploadProps = React.PropsWithChildren<{
    auto_upload?: boolean;
    extensions: Array<string>;
    onPickFile?: (file: File) => any;
    onUploadedFile?: (url: string) => any;
}>;




export default function FileUpload({ extensions, auto_upload, children, onPickFile, onUploadedFile }: TFileUploadProps) {
    const ref_input = React.useRef<HTMLInputElement>(null);
    const open_file_manager = () => ref_input.current?.click();

    const mutation = useMutation({
        mutationFn: async (file: File) => UploadFile({ file }),
        onSuccess: ({ url }) => onUploadedFile?.(url)
    });

    const accept_extensions = extensions.map(_ => `.${_}`).join(",");

    return <div className="border border-dashed rounded-lg p-4 flex items-center gap-4">
        <div onClick={open_file_manager}>
            <AnimatedFolder />
        </div>

        <div>
            <p className="text-muted-foreground text-sm">
                Pick your file by <span
                    onClick={open_file_manager}
                    className="text-primary cursor-pointer font-bold hover:opacity-80"
                >
                    open
                </span> the file manager.
            </p>

            {children}
            
            {
                mutation.isPending &&
                <div className="flex items-center gap-2">
                    <LoaderIcon
                        role="status"
                        aria-label="Loading"
                        className={"size-4 animate-spin"}
                    />
                    <p className="text-xs">
                        Uploading <span className="bg-muted border px-4 rounded-lg">Tresor.jsx</span>
                    </p>
                </div>
            }
        </div>

        {/*  FILE INPUT */}
        <input
            type="file"
            ref={ref_input}
            className="hidden"
            accept={accept_extensions}
            onChange={({ target }) => {
                const file = target.files![0];
                if (auto_upload) mutation.mutateAsync(file);
                onPickFile?.(file);
            }}
        />
    </div>;
};




function AnimatedFolder() {
    return <section className="relative group flex flex-col items-center justify-center">
        <div className="file relative w-15 h-10 cursor-pointer origin-bottom [perspective:1500px] z-50">
            <div className="work-5 bg-amber-600 w-full h-full origin-top rounded-lg rounded-tl-none group-hover:shadow-[0_5px_10px_rgba(0,0,0,.2)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-5 after:h-1 after:bg-amber-600 after:rounded-t-lg before:absolute before:content-[''] before:-top-[3px] before:left-[18.9px] before:w-1 before:h-1 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]" />
            <div className="work-4 absolute inset-[1px] bg-zinc-400 rounded-lg transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]" />
            <div className="work-3 absolute inset-[1px] bg-zinc-300 rounded-lg transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]" />
            <div className="work-2 absolute inset-[1px] bg-zinc-200 rounded-lg transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]" />
            <div className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[39px] rounded-lg rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[36px] after:h-[4px] after:bg-amber-400 after:rounded-t-lg before:absolute before:content-[''] before:-top-[2.5px] before:right-[35.5px] before:size-[3px] before:bg-amber-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_5px_10px_#fbbf24,_inset_0_-5px_10px_#d97706] group-hover:[transform:rotateX(-46deg)_translateY(.25px)]" />
        </div>
    </section>


    return <section className="relative group flex flex-col items-center justify-center">
        <div className="file relative w-40 h-28 cursor-pointer origin-bottom [perspective:1500px] z-50">

            {/* TOP FLAP */}
            <div className="work-5 bg-amber-600 w-full h-full origin-top rounded-2xl rounded-tl-none 
      group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all ease duration-300 relative
      after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-16 after:h-3 after:bg-amber-600 after:rounded-t-2xl
      before:absolute before:content-[''] before:-top-[12px] before:left-[60px] before:w-3 before:h-3 before:bg-amber-600 
      before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"
            />

            {/* PAGE LAYERS */}
            <div className="work-4 absolute inset-1 bg-zinc-400 rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]" />
            <div className="work-3 absolute inset-1 bg-zinc-300 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]" />
            <div className="work-2 absolute inset-1 bg-zinc-200 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]" />

            {/* FRONT COVER */}
            <div className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[110px] 
      rounded-2xl rounded-tr-none 
      after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[110px] after:h-[14px] after:bg-amber-400 after:rounded-t-2xl
      before:absolute before:content-[''] before:-top-[8px] before:right-[108px] before:size-2.5 before:bg-amber-400 
      before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] 
      transition-all ease duration-300 origin-bottom flex items-end 
      group-hover:shadow-[inset_0_20px_40px_#fbbf24,_inset_0_-20px_40px_#d97706]
      group-hover:[transform:rotateX(-46deg)_translateY(1px)]"
            />
        </div>
    </section>
};