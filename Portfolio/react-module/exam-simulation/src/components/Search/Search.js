import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

export default function Search({ posts }) {
  const [textToSearch, setTextToSearch] = useState('');
  const [runSearch, setRunSearch] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!textToSearch) return;
    const post = posts.find((post) => post.body.includes(textToSearch));
    if (post) navigate('/posts/' + post.id, { replace: false });
  }, [runSearch]);

  function handleOnChange(value) {
    setTextToSearch(value);
  }
  return (
    <section className="Search">
      <label htmlFor="searchPost">Search a post by word(s)</label>
      <div>
        <input
          name="searchPost"
          id="searchPost"
          placeholder="Word"
          value={textToSearch}
          onChange={(e) => handleOnChange(e.target.value)}
        ></input>
        <button onClick={() => setRunSearch((prev) => !prev)}>Search</button>
      </div>
    </section>
  );
}
