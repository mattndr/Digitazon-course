import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { useParams } from 'react-router-dom';
import Search from '../Search/Search';
import MenuLink from '../MenuLink/MenuLink';

export default function Menu() {
  const [postLinks, setPostLinks] = useState(null);
  let { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getMenuItems() {
      if (postId <= 0 || postId > 10) navigate('/error');
      const result = await fetch('https://jsonplaceholder.typicode.com/posts');
      let posts = await result.json();
      posts = posts.slice(0, 10).map((menu) => ({ ...menu, selected: false }));
      if (postId > 0 && postId <= posts.length)
        posts[postId - 1].selected = true;
      setPostLinks(posts);
    }
    getMenuItems();
  }, [postId]);

  return (
    <nav className="Menu">
      <Search posts={postLinks} />
      <ul>
        {postLinks &&
          postLinks.map((item) => (
            <MenuLink
              key={item.id}
              postLinks={postLinks}
              setPostLinks={setPostLinks}
              item={item}
            />
          ))}
      </ul>
    </nav>
  );
}
