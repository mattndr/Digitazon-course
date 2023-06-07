import axios from 'axios';
import groupsUrl from '../db/groupsUrl.json' assert { type: 'json' };
import fs from 'fs/promises';

const filePath = 'db/groupsUrl.json';

async function call(key) {
  if (groupsUrl['1'].key.length == 0) {
    //   console.log(key);
    //   axios
    //     .get(groupsUrl['1'].url, {
    //       method: 'get',
    //       headers: {
    //         key: key,
    //       },
    //     })
    //     .then(async function (response) {
    //       const dataToWrite = groupsUrl;
    //       dataToWrite['1'].key = key;
    //       await fs.writeFile(filePath, JSON.stringify(dataToWrite, null, 2));
    //       return true;
    //     })
    //     .catch(function (error) {
    //       return false;
    //     });
    // }

    try {
      const response = await axios.get(groupsUrl['1'].url, {
        method: 'get',
        headers: {
          key: key,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}

function createKey(osama) {
  const x = 4 - ('' + osama).length;
  let key = '';
  for (let i = 0; i < x; i++) {
    key += '0';
  }
  return (key += osama);
}

for (let i = 0; i <= 99; i++) {
  if (groupsUrl['1'].key.length > 0) {
    break;
  }
  call(createKey(i));
}

// &&
// groupsUrl['2'].key != '' &&
// groupsUrl['3'].key != ''
