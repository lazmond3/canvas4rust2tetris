import requests, json
with open("saya.txt") as f:
    linenum = 0
    headers = {'content-type': 'application/json'}
    for line_ in f.readlines():
        line = line_.strip()
        # txt = "curl localhost:3000 -H 'Content-Type: application/json' -d '{{\"type\": \"one_word\", \"pos\": {}, \"word\": \"{}\"}}' &".format(
        #     linenum,
        #     line
        # )
        payload = {"type": "one_word", "pos": linenum, "word": line}
        r = requests.post("http://localhost:3000", data=json.dumps(payload), headers=headers)
        print(r)
        linenum += 1
        # print(txt)
