import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

const qrcodeId = "html5qr-code-full-region";


export const CheckInScanner = () => {

    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const isMounted = useRef(true);
    
    function onScanSuccess(result: string) {
        console.log(`Scan result: ${result}`);
    }

    function onScanError(errorMessage: string) {
        console.error(`Scan error: ${errorMessage}`);
    }

    let html5QrCode: Html5Qrcode;

    useEffect(() => {
        if (!html5QrCode?.getState()) {
            html5QrCode = new Html5Qrcode(qrcodeId);

            const config = { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.777778 };

            html5QrCode.start(
                { facingMode: "environment" },
                config,
                onScanSuccess, onScanError
            );
        }

        return () => {
            // Anything in here is fired on component unmount.

        };
    }, []);

    return (

        <div id={qrcodeId}></div>
    )
}