use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Request {
    #[serde(rename = "type")]
    pub type__: String,
    pub word: String,
    pub pos: u32,
}

pub async fn sync_request() {
    let url = "http://localhost:3000/";
    let typ_ = String::from("one_word");
    let pos = 123;
    let word = String::from("IIIIIIIIIIIIIIII");
    let req = Request {
        type__: typ_,
        word: word,
        pos: pos,
    };

    let json_reqeust = serde_json::to_string(&req).expect("request to string failed.");
    let client = reqwest::Client::new();
    let res: reqwest::Response = client
        .post(url)
        .header(reqwest::header::CONTENT_TYPE, "application/json")
        .body(json_reqeust)
        .send()
        .await
        .unwrap();
    let v = res.text().await.expect("inner result failed on L44");
    println!("requst done! response: {}", v);
}
