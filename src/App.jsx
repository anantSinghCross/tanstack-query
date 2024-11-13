import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const [count, setCount] = useState(0);

  const { isLoading, error, data } = useQuery(
    "posts",
    async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
      return await res.json();
    },
    { staleTime: 3000 }
  );
  useEffect(() => {
    if (data) {
      setCount(data.length);
    }
  }, [data]);

  const { mutate, isLoading: isMutateLoading } = useMutation(async () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  });

  return (
    <section className="flex justify-center">
      <div className=" max-w-lg my-5">
        <h1 className="text-lg font-semibold border-2 border-indigo-400 text-slate-600 rounded-3xl bg-white p-5">
          Showing {count} posts ...
        </h1>
        <button className="hover:shadow-xl shadow py-2 my-2 text-white text-sm font-semibold px-3 w-full rounded-full transition-all duration-300 bg-indigo-500"
        onClick={() => mutate()}>
          {
            isMutateLoading ? 'Saving post...' : 'Add post'
          }
        </button>
        {!isLoading &&
          data &&
          data?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col gap-5 p-5 my-4 rounded-3xl bg-white shadow-lg shadow-slate-300/50 text-slate-500"
              >
                <h3 className="font-semibold text-slate-600">{item.title}</h3>
                <p className="">{item.body}</p>
                <div className="flex justify-between gap-2">
                  <button className="hover:bg-slate-100 py-2 text-sm font-semibold px-3 w-full rounded-full transition-all">
                    Likes
                  </button>
                  <button className="hover:bg-slate-100 py-2 text-sm font-semibold px-3 w-full rounded-full transition-all">
                    Comments
                  </button>
                  <button className="hover:bg-slate-100 py-2 text-sm font-semibold px-3 w-full rounded-full transition-all">
                    Shares
                  </button>
                  <button className="hover:bg-slate-100 py-2 text-sm font-semibold px-3 w-full rounded-full transition-all">
                    Saves
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </section>
  );
}

export default App;
