import groupsUrl from '../db/groupsUrl.json' assert { type: 'json' };
import students from '../db/students.json' assert { type: 'json' };

export default async function getData(){
  
    const responses = await Promise.all([fetch(groupsUrl[0]),fetch(groupsUrl[1]),fetch(groupsUrl[2])])   
    const group1 = await responses[0].json()
    const group2 = await responses[1].json()
    const group3 = await responses[2].json()
       const results = [group1,group2,group3,students]
       console.log(results);
  return results

}

