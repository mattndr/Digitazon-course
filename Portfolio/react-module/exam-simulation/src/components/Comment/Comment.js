import './Comment.css';

export default function Comment({ content }) {
  return (
    <article className="Comment">
      <span></span>
      <p>{content}</p>
    </article>
  );
}
