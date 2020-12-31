// use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use serde_json::{Result, Value};

#[derive(Debug, Serialize, Deserialize)]
struct Post {
    id: Option<i32>,
    title: String,
    body: String,
    #[serde(rename = "userId")]
    user_id: i32,
}

#[tokio::main]
async fn main() {
    let param_a = "one_word";
    let param_b = 123;
    let param_c = "IIIIIIIIIIIIIIII";
    // r#(Raw String Literal)でjsonを生成
    let json_request = format!(
        r#"{{
      "type": "{}",
      "pos": "{}",
      "word": "{}"
    }}"#,
        param_a, param_b, param_c
    );
    let client = reqwest::Client::new();
    let mut res: reqwest::Response = client
        .post("http://localhost:3000/")
        .header(reqwest::header::CONTENT_TYPE, "application/json")
        .body(json_request)
        .send()
        .await
        .unwrap();
    let v = res.text().await.expect("inner result failed on L41");
    println!("{}", v);
}
