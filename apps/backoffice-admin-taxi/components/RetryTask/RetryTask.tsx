// import { useInternationalization } from "../../hooks/Hook";




export default function RetryTask({ text, onRetry }: React.PropsWithChildren<{ text: string; onRetry: () => void }>) {
  // const Language = useInternationalization();

  // return <div className="bg-red-700/20 text-red-700 p-2 text-sm border-red-800 border">
  return <div className="bg-destructive/20 text-destructive p-2 text-sm border-destructive border">
    <p className="text-xs">{text}</p>
    {/* {children} */}
    <p
      className="underline cursor-pointer"
      onClick={() => onRetry()}
    >
      Retry
    </p>
  </div>
};