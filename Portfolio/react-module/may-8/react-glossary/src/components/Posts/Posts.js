import { useEffect, useState } from 'react';

export default function Posts() {
  const [state, setState] = useState(false);
  const posts = ['a', 'b', 'c'];
  useEffect(() => {
    console.log('state has changed to:', state);
  }, [state]);

  return (
    <>
      <h1>Posts</h1>
      <button onClick={() => setState(!state)}>
        {state ? 'true' : 'false'}
      </button>
      {state ? <PostList posts={posts}></PostList> : null}
    </>
  );
}

function PostList({ posts }) {
  return (
    <ol>
      {posts.map((post, i) => (
        <Post key={i} post={post}></Post>
      ))}
    </ol>
  );
}

function Post({ post }) {
  return <li>{post}</li>;
}
