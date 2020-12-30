
function po() {
    curl localhost:3000 -H 'Content-Type: application/json' -d '{"type": "one_word", "pos": '$1', "word": "IIIIIIIIIIIIIIII"}'
}

for i in {0..100}; do
    po $((i * 1));
    # po $((i * 2));
    # po $((i * 3));
    # po $((i * 32 * 4));
    # po $((i *  32 * 4 + 32));
    # po $((i * 32 * 4 + 32 * 2));
    # po $((i * 32 * 4 + 32 * 3));
    # po $((i * 32 * 4 + 32 * 4));
    sleep 1
done