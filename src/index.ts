import * as QRCode from "qrcode";

interface UpiqrcodeParams {
    payeeVPA?: string;
    payeeName?: string;
    payeeMerchantCode?: string;
    transactionId?: string;
    transactionRef?: string;
    transactionNote?: string;
    amount?: string;
    minimumAmount?: string;
    currency?: string;
    transactionRefUrl?: string;
}

interface UpiqrcodeResult {
    qr: string;
    intent: string;
}

function validateParams({ payeeVPA: pa, payeeName: pn }: UpiqrcodeParams) {
    let error = "";
    if (!pa || !pn) {
        error = "Virtual Payee's Address/Payee's Name is compulsory";
    } else if (pa.trim().length < 5 || pn.trim().length < 4) {
        error = "Virtual Payee's Address/Payee's Name is too short.";
    }
    return error;
}

function buildUrl(baseUrl: string, params: Record<string, string>) {
    let url = baseUrl;
    const queryParams: string[] = [];
    
    for (const [key, value] of Object.entries(params)) {
        if (value && value.trim() !== '') {
            queryParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
    }
    
    if (queryParams.length > 0) {
        url += queryParams.join("&");
    }
    
    return url;
}

async function upiqrcode({
    payeeVPA: pa,
    payeeName: pn,
    payeeMerchantCode: me,
    transactionId: tid,
    transactionRef: tr,
    transactionNote: tn,
    amount: am,
    minimumAmount: mam,
    currency: cu,
    transactionRefUrl: url,
}: UpiqrcodeParams): Promise<UpiqrcodeResult> {
    return new Promise<UpiqrcodeResult>((resolve, reject) => {
        const error = validateParams({ payeeVPA: pa, payeeName: pn });
        if (error) {
            reject(new Error(error));
            return;
        }

        let intent = "upi://pay?";
        const params: Record<string, string> = {};
        
        // Add required parameters
        if (pa) params.pa = pa;
        if (pn) params.pn = pn;
        
        // Add optional parameters
        if (am) params.am = am;
        if (mam) params.mam = mam;
        if (cu) params.cu = cu;
        if (me) params.me = me;
        if (tid) params.tid = tid;
        if (tr) params.tr = tr;
        if (tn) params.tn = tn;
        if (url) params.url = url;

        intent = buildUrl(intent, params);

        const opts = {
            quality: 1.0,
            margin: 3,
            scale: 10,
        };

        QRCode.toDataURL(intent, opts, (err: any, qr: any) => {
            if (err) {
                reject(new Error("Unable to generate UPI QR Code."));
                return;
            }
            resolve({ qr, intent });
        });
    });
}

export default upiqrcode;