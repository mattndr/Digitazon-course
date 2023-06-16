const BASE_URL = process.argv[2] || 'http://localhost:3000';
const DEFAULT_WAIT_TIME = 100;
let WAIT_TIME = DEFAULT_WAIT_TIME;

async function getData(url) {
  try {
    const result = await fetch(url, {
      headers: { name: 'Matteo Andreoni' },
    });
    console.log(`${result.status} ${result.statusText}`);
    if (result.ok || result.status == 429) return await result.json();
  } catch (error) {
    console.log(error);
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function findSecret(remainingKeys = ['a0b1c2d3e4f5']) {
  if (!remainingKeys) {
    console.log('No keys to check');
    return;
  }
  await wait(WAIT_TIME);
  console.log(
    '[',
    new Date(Date.now()).toLocaleTimeString(),
    '] key:',
    remainingKeys[0]
  );
  const data = await getData(BASE_URL + '/keys/' + remainingKeys[0]);
  if (!data) return;
  if (data.status != 429) {
    if (WAIT_TIME > DEFAULT_WAIT_TIME) WAIT_TIME /= 2;
    remainingKeys.shift();
    if (data.treasure) {
      console.log('Treasure found: ', data.treasure);
      return;
    }
    data.children.forEach((child) => {
      remainingKeys.push(child.key);
    });
  } else WAIT_TIME *= 2;
  return await findSecret(remainingKeys);
})();

// {
// 	"key": "b5c6d7e8f9g0",
// 	"treasure": true,
// 	"children": [
// 		{
// 			"key": "h1i2j3k4l5m6",
// 			"children": "information hidden"
// 		},
// 		{
// 			"key": "z9a0b1c2d3e4",
// 			"children": "information hidden"
// 		}
// 	]
// }
