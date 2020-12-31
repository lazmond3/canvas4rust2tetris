import requests, json
import asyncio

# async
# https://qiita.com/ragnar1904/items/85b81febefd3f3f2899a
async def post_async(data: str, line_number: int):
    loop = asyncio.get_event_loop()
    url = "http://localhost:3000"
    headers = {'content-type': 'application/json'}
    arg = {"headers": headers, "data": data}
    await loop.run_in_executor(None, requests.post, url, data, headers)
    print("-- line number: {}".format(line_number))

def main_async():
    loop = asyncio.get_event_loop()
    # 非同期実行タスクを一つのFutureオブジェクトに
    data = []
    with open("saya.txt") as f:
        linenum = 0
        headers = {'content-type': 'application/json'}
        for line_ in f.readlines():
            line = line_.strip()
            payload = {"type": "one_word", "pos": linenum, "word": line}
            data.append( (json.dumps(payload), linenum))
            linenum += 1

    tasks_ = [post_async(d, ln) for d,ln in data]
    tasks = asyncio.gather(
        *tasks_
    )
    results = loop.run_until_complete(tasks)
    return results

if __name__ == '__main__':
    main_async()