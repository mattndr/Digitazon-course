// Scrivere un componente che rappresenti un post su un forum, ci deve essere il post iniziale e sotto tutti i commenti.
// Il componente deve prendere in ingresso un id che e' l'id del post e da li generare tutto il codice html richiesto.
// Utilizzare questo url per prendere il post https://jsonplaceholder.typicode.com/posts/1
// Utilizzare questo url per prendere i commenti di un post https://jsonplaceholder.typicode.com/posts/1/comments

import { useEffect, useState } from 'react';
import './Forum.css';

export default function Post({ id = 1 }) {
  const [postWithComments, setPostWithComments] = useState();

  useEffect(() => {
    async function getPostWithComments() {
      let result = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const post = await result.json();
      result = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const comments = await result.json();
      setPostWithComments({ post, comments });
      console.log({ post, comments });
    }
    getPostWithComments();
  }, [id]);

  return (
    postWithComments && (
      <div className="Post">
        <h2>{postWithComments.post.title}</h2>
        <div className="comments">
          {postWithComments.comments.map((comment) => (
            <Comment key={comment.id} content={comment} />
          ))}
        </div>
      </div>
    )
  );
}

function Comment({ content }) {
  return (
    <div>
      <div className="email">{content.email}</div>
      <div>{content.body}</div>
    </div>
  );
}
