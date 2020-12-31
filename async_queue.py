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

async def queue_execution(words, callback, parallel=3000):
    loop = asyncio.get_event_loop()
    queue = asyncio.Queue()

    for u in words: # u : u, i
        queue.put_nowait(u)
    url = "http://localhost:3000"
    headers = {'content-type': 'application/json'}

    async def post_async(q):
        while not q.empty():
            u,linenum = await q.get()
            payload = {"type": "one_word", "pos": linenum, "word": u}
            data = json.dumps(payload)
            future = loop.run_in_executor(None, requests.post, url, data, headers)
            future.add_done_callback(callback)
            await future
            print("--- line num: {}".format(linenum))

    tasks = [post_async(queue) for i in range(parallel)]
    return await asyncio.wait(tasks)

def main_async():
    loop = asyncio.get_event_loop()
    # 非同期実行タスクを一つのFutureオブジェクトに
    data = []
    with open("saya.txt") as f:
        linenum = 0
        for line_ in f.readlines():
            line = line_.strip()
            linenum += 1

    tasks_ = [post_async(d, ln) for d,ln in data]
    tasks = asyncio.gather(
        *tasks_
    )
    results = loop.run_until_complete(tasks)

# if __name__ == '__main__':
#     main_async()
if __name__ == "__main__":
    loop = asyncio.get_event_loop()

    results = []
    def store_result(f):
        results.append(f.result())
    
    que = []
    with open("saya.txt") as f:
        linenum = 0
        for line_ in f.readlines():
            line = line_.strip()
            que.append(( line, linenum))
            linenum += 1

    loop.run_until_complete(queue_execution(que, store_result))
    for r in results:
        print("queue execution: {0}".format(r))