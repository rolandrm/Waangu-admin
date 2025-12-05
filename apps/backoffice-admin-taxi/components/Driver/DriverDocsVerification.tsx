import { DocFileVerification } from '../DocFileVerification/DocFileVerification';
import { useDriver } from '@/hooks/hooks';




export default function DriverDocsVerification() {
    const data = useDriver();
    console.log(data);

    return <div className=''>
        <div className='text-center'>
            {/* <p className='text-sm text-muted-foreground'>This information will be used to identify this account.</p> */}
            {/* <p className='text-sm text-muted-foreground'>This may be edited later.</p> */}
        </div>

        <div className='space-y-4'>
            <div className='space-y-2'>
                <h2 className='font-extrabold text-xl'>KYC</h2>
                <div className='space-y-2'>
                    {data.documents.kyc.map(doc => <DocFileVerification key={doc._id} data={doc} />)}
                </div>
            </div>

            <div className='space-y-2'>
                <h2 className='font-extrabold text-xl'>INSURANCE DOCS</h2>
                <div className='space-y-2'>
                    {data.documents.insurance.map(doc => <DocFileVerification key={doc._id} data={doc} />)}
                </div>
            </div>

            <div className='space-y-2'>
                <h2 className='font-extrabold text-xl'>CAR DOCS</h2>
                <div className='space-y-2'>
                    {data.documents.vehicle.map(doc => <DocFileVerification key={doc._id} data={doc} />)}
                </div>
            </div>

            <div className='space-y-2'>
                <h2 className='font-extrabold text-xl'>OTHER DOCS</h2>
                <div className='space-y-2'>
                    {data.documents.other.map(doc => <DocFileVerification key={doc._id} data={doc} />)}
                </div>
            </div>
        </div>
    </div>;
};