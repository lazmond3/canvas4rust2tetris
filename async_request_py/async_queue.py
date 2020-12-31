import requests, json
import asyncio

# async
# https://qiita.com/ragnar1904/items/85b81febefd3f3f2899a

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