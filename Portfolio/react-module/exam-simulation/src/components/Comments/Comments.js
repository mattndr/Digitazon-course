import { useEffect, useState } from 'react';
import Comment from '../Comment/Comment';
import './Comments.css';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const result = await fetch(
        'https://jsonplaceholder.typicode.com/posts/' + postId + '/comments'
      );
      const comments = await result.json();
      setComments(comments);
    }
    getComments();
  }, [postId]);
  return (
    <div className="Comments">
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} content={comment.body} />
        ))}
    </div>
  );
}
