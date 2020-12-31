
with open("saya.txt") as f:
    linenum = 0
    for line_ in f.readlines():
        line = line_.strip()
        txt = "curl localhost:3000 -H 'Content-Type: application/json' -d '{{\"type\": \"one_word\", \"pos\": {}, \"word\": \"{}\"}}' &".format(
            linenum,
            line
        )
        linenum += 1
        print(txt)
