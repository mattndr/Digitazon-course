import { useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <header>
        <h1 className="py-4 bg-gray-800 text-white text-xl font-bold">
          My forum
        </h1>
      </header>
      <main className="bg-gray-50">
        <div className="flex gap-8">
          <Menu />
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function Menu() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async function getPosts() {
      const posts = await (
        await fetch('https://jsonplaceholder.typicode.com/posts')
      ).json();
      setPosts(posts.slice(0, 10));
    })();
  }, []);
  return (
    <nav className="basis-[30%] pt-8">
      <ul className="flex flex-col">
        {posts.map((post) => (
          <li key={post.id}>
            <a
              className="block p-4 border hover:bg-indigo-600 hover:font-bold hover:text-gray-200 bg-gray-100 border rounded"
              href={`/posts/${post.id}`}
            >
              Post #{post.id}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Post({ id = 1 }) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async function getPost() {
      const post = await (
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      ).json();
      setPost(post);
      const comments = await (
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      ).json();
      setComments(comments);
    })();
  }, []);

  return (
    post && (
      <article className="p-2 border-l-2 pt-8">
        <div className="bg-indigo-600 rounded-xl">
          <h2 className="px-8 text-gray-50">
            <div className="pt-1">Post {post.id}</div>
            <div className="pb-3">{post.title}</div>
          </h2>
          <p className="p-8 bg-gray-200 rounded-b-xl py-12 px-4">{post.body}</p>
        </div>
        <section className="ml-2">
          <h3 className="mt-8 text-left text-lg ml-2">Comments</h3>
          <div className="flex flex-col gap-3 mt-4">
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="max-w-[80%] p-3 bg-gray-100 border rounded-lg text-left"
              >
                <h4 className="text-sm">{comment.email}</h4>
                <p className="p-2 text-sm">{comment.body}</p>
              </article>
            ))}
          </div>
        </section>
      </article>
    )
  );
}
