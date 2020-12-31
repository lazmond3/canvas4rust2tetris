use http_post::sync_request;

#[tokio::main]
async fn main() {
    sync_request::sync_request().await;
}
