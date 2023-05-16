import { Link } from 'react-router-dom';

export default function MenuLink({ postLinks, setPostLinks, item }) {
  function handleSelect(id) {
    const newMenuItems = [...postLinks];
    newMenuItems.forEach((item) => (item.selected = false));
    var foundIndex = newMenuItems.findIndex((x) => x.id === id);
    newMenuItems[foundIndex].selected = !newMenuItems[foundIndex].selected;
    setPostLinks(newMenuItems);
  }
  return (
    <li
      key={item.id}
      className={item.selected ? 'selected' : ''}
      onClick={() => handleSelect(item.id)}
    >
      <Link to={`/posts/${item.id}`}>Post {item.id}</Link>
    </li>
  );
}
