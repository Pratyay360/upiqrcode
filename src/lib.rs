mod utils;

use js_sys::{Promise, Reflect};
use qrcode::render::svg;
use qrcode::QrCode;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

#[wasm_bindgen(typescript_custom_section)]
const TS_TYPES: &'static str = r#"
export interface UpiqrcodeParams {
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

export interface UpiqrcodeResult {
  qr: string;
  intent: string;
}
"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "UpiqrcodeParams")]
    pub type IUpiqrcodeParams;

    #[wasm_bindgen(typescript_type = "UpiqrcodeResult")]
    pub type IUpiqrcodeResult;
}

fn get_str(obj: &JsValue, key: &str) -> Option<String> {
    Reflect::get(obj, &JsValue::from_str(key))
        .ok()
        .and_then(|v| v.as_string())
        .filter(|s| !s.trim().is_empty())
}

fn validate(pa: &Option<String>, pn: &Option<String>) -> Result<(), String> {
    match (pa, pn) {
        (None, _) | (_, None) => {
            Err("Virtual Payee's Address/Payee's Name is compulsory".into())
        }
        (Some(pa), Some(pn)) if pa.trim().len() < 5 || pn.trim().len() < 4 => {
            Err("Virtual Payee's Address/Payee's Name is too short.".into())
        }
        _ => Ok(()),
    }
}

fn build_url(base: &str, params: &[(&str, Option<String>)]) -> String {
    let pairs: Vec<String> = params
        .iter()
        .filter_map(|(key, val)| {
            val.as_deref()
                .filter(|v| !v.trim().is_empty())
                .map(|v| format!("{}={}", percent_encode(key), percent_encode(v)))
        })
        .collect();

    if pairs.is_empty() {
        base.to_string()
    } else {
        format!("{}{}", base, pairs.join("&"))
    }
}

fn percent_encode(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    for byte in s.bytes() {
        match byte {
            b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'_' | b'.' | b'~' => {
                out.push(byte as char)
            }
            b => out.push_str(&format!("%{:02X}", b)),
        }
    }
    out
}

fn generate_svg(intent: &str) -> Result<String, String> {
    QrCode::new(intent.as_bytes())
        .map_err(|e| format!("QR encode error: {}", e))
        .map(|code| code.render::<svg::Color>().min_dimensions(200, 200).build())
}


#[wasm_bindgen]
pub fn upiqrcode(params: IUpiqrcodeParams) -> Promise {
    future_to_promise(async move {
        let params: JsValue = params.into();
        let pa = get_str(&params, "payeeVPA");
        let pn = get_str(&params, "payeeName");

        validate(&pa, &pn).map_err(|e| JsValue::from_str(&e))?;

        let intent = build_url(
            "upi://pay?",
            &[
                ("pa",  pa),
                ("pn",  pn),
                ("am",  get_str(&params, "amount")),
                ("mam", get_str(&params, "minimumAmount")),
                ("cu",  get_str(&params, "currency")),
                ("me",  get_str(&params, "payeeMerchantCode")),
                ("tid", get_str(&params, "transactionId")),
                ("tr",  get_str(&params, "transactionRef")),
                ("tn",  get_str(&params, "transactionNote")),
                ("url", get_str(&params, "transactionRefUrl")),
            ],
        );

        let qr = generate_svg(&intent).map_err(|e| JsValue::from_str(&e))?;

        let result = js_sys::Object::new();
        Reflect::set(&result, &JsValue::from_str("qr"), &JsValue::from_str(&qr))
            .map_err(|e| e)?;
        Reflect::set(&result, &JsValue::from_str("intent"), &JsValue::from_str(&intent))
            .map_err(|e| e)?;

        Ok(result.into())
    })
}

#[wasm_bindgen]
pub fn svg_qr_code(intent: String) -> Promise {
    future_to_promise(async move {
        let svg = generate_svg(&intent).map_err(|e| JsValue::from_str(&e))?;
        Ok(JsValue::from_str(&svg))
    })
}
