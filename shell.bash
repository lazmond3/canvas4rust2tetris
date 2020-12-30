
function po() {
    curl localhost:3000 -H 'Content-Type: application/json' -d '{"type": "one_word", "pos": '$1', "word": "IIIIIIIIIIIIIIII"}'
    sleep 1
}

for i in {1..100}; do
    po $((i * 1));
done