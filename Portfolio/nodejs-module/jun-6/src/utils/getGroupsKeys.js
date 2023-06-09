import otherGroups from '../../db/groups.json' assert { type: 'json' };
import axios from 'axios';

const targetGroup = process.argv[2];
const defaultWaitTime = 500;
let waitTime = 500;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function call() {
  if (!otherGroups[targetGroup]) {
    console.log(`Group '${targetGroup}' doesn't exist`);
  } else {
    for (let counter = 0; counter <= 9999; counter++) {
      const key = counter.toString().padStart(4, '0');
      /*
      // questa soluzione mi consente di evitare di usare try-catch ma devo gestire con degli if-else gli statusCode delle risposte
      // validateStatus -> se faccio ritornare sempre true allora tutti gli status code sono accettati (cioè non si generano eccezioni in caso di 4xx,5xx)
      const result = await axios.get(targetGroup, {
        validateStatus: () => true
          headers: { key },
        });
      */
      try {
        await axios.get(targetGroup, {
          headers: { key },
        });
        console.log('Key found:', key);
        return;
      } catch (error) {
        console.log('key', key + ':', error.message);
        if (
          !error.response ||
          (error.response && error.response.status != '404')
        ) {
          counter--;
          if (error.response && error.response.status == '429') {
            waitTime *= 2;
          }
          await wait(waitTime);
          continue;
        }
        waitTime = defaultWaitTime;
        await wait(waitTime);
      }
    }
  }
}
call();
