import { useEffect, useState } from 'react';
import './Post.css';
import Comments from '../Comments/Comments';
import { useParams } from 'react-router-dom';

export default function Post() {
  const [post, setPost] = useState([]);
  let { postId } = useParams();

  useEffect(() => {
    async function getPostComments() {
      let result = await fetch(
        'https://jsonplaceholder.typicode.com/posts/' + postId
      );
      const data = await result.json();
      setPost({ data });
    }
    getPostComments();
  }, [postId]);
  return (
    <article className="Post">
      <div>
        <h2>Post {postId}</h2>
        <p>{post.data && post.data.body}</p>
      </div>
      <section>
        <Comments postId={postId} />
      </section>
    </article>
  );
}
