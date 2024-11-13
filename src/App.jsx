import { useQuery } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const { isLoading, error, data} = useQuery('posts', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    return await res.json();
  }, {staleTime:3000})
  return (
    <section className="flex justify-center">
      <div className=" max-w-lg my-5">
        <h1 className="text-lg font-semibold border-2 border-slate-300 text-slate-600 rounded-3xl bg-white p-5">Posts</h1>
        {
          !isLoading && data && data?.map(item => {
            return (
              <div key={item.id} className="flex flex-col gap-5 p-5 my-4 rounded-3xl bg-white shadow-lg text-slate-500">
                <h3 className="font-semibold text-slate-600">{item.title}</h3>
                <p className="">{item.body}</p>
                <div className="flex justify-between gap-2">
                  <button className="hover:bg-slate-100 py-2 text-sm font-semibold px-3 w-full rounded-full transition-all">Likes</button>
                  <button className="hover:bg-slate-100 py-2 text-sm font-semibold px-3 w-full rounded-full transition-all">Comments</button>
                  <button className="hover:bg-slate-100 py-2 text-sm font-semibold px-3 w-full rounded-full transition-all">Shares</button>
                  <button className="hover:bg-slate-100 py-2 text-sm font-semibold px-3 w-full rounded-full transition-all">Saves</button>
                </div>
              </div>
            )
          })
        }
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </section>
  ) 
}

export default App
