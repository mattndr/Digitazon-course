import fs from 'fs/promises';

async function getUsersFromServer() {
  try {
    const response = await fetch('https://dummyjgson.com/users?limit=3');
    if (response.ok) {
      const { users } = await response.json();
      await fs.writeFile('./db/users.json', JSON.stringify(users, null, 2));
    } else throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (err) {
    console.log(err);
  }
}

export const readUsers = async () => {
  try {
    const users = await fs.readFile('./db/users.json', 'utf-8');
    if (!users) {
      await getUsersFromServer();
      return await fs.readFile('./db/users.json', 'utf-8');
    }
    return users;
  } catch (err) {
    console.log(err);
  }
};

export const readUser = async (id) => {
  try {
    const users = await fs.readFile('./db/users.json', 'utf-8');
    return users;
  } catch (err) {
    console.log(err);
  }
};
