import { bookingClient } from '@/api/bookingClient';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

const qrcodeId = "html5qr-code-full-region";


export const CheckInScanner = () => {

    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const isMounted = useRef(true);
    const bookingApi = bookingClient()

    const onScanSuccess = async (entityId: string) => {
        await bookingApi.checkIn(entityId)
    }

    const onScanError = (errorMessage: string) => {
        console.error(`Scan error: ${errorMessage}`);
    }

    useEffect(() => {
        const startScanning = async (): Promise<Html5QrcodeScanner> => {

            const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeId, {
                fps: 25,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
                showTorchButtonIfSupported: false,
                showZoomSliderIfSupported: false,
                qrbox: { width: 550, height: 550 }
            }, true);

            html5QrcodeScanner.render(onScanSuccess, onScanError);
            return html5QrcodeScanner;
        };

        const initScanner = async () => {
            if (isMounted.current) {
                scannerRef.current = await startScanning();
            }
        };

        initScanner();

        return () => {
            isMounted.current = false;
            const clearScanner = async () => {
                try {
                    if (scannerRef.current) {
                        scannerRef.current.pause();
                        await scannerRef.current.clear();
                    }
                } catch (error) {
                    console.log('Failed to clear html5QrcodeScanner. ', error);
                }
            };
            clearScanner();
        };
    }, []);

    return (

        <div id={qrcodeId}></div>
    )
}