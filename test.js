memoArray = [{classA: 'a1', classB: 'b1', valC: 'c1'}, {classA: 'a1', classB: 'b1', valC: 'c2'}, {classA: 'a2', classB: 'b2', valC: 'c2'}, {classA: 'a2', classB: 'b2', valC: 'c2'}, {classA: 'a3', classB: 'b2', valC: 'c3'}, {classA: 'a4', classB: 'b4', valC: 'c4'}, {classA: 'a5', classB: 'b2', valC: 'c5'}, {classA: 'a6', classB: 'b2', valC: 'c6'}]

memoArray .forEach(obj => {
    const key = obj.classB;
    const value = obj.valC;
    const akey = obj.classA;
    if (groupB[key] ) {
        // Key exists, push the value to the existing array
        groupB[key].push(value);
        groupA={[akey]:groupB};
        console.log(groupA);
    } else {
        // Key does not exist, create a new array with the value
        groupB[key] = [value];
        groupA={[akey]:groupB};
        console.log(groupA);
    }
    });
 {a1: {…}}a1: {b1: Array(2), b2: Array(5), b4: Array(1)}
 {a1: {…}}a1: {b1: Array(2), b2: Array(5), b4: Array(1)}
 {a2: {…}}a2: {b1: Array(2), b2: Array(5), b4: Array(1)}
 {a2: {…}}a2: {b1: Array(2), b2: Array(5), b4: Array(1)}
 {a3: {…}}a3: {b1: Array(2), b2: Array(5), b4: Array(1)}
 {a4: {…}}a4: {b1: Array(2), b2: Array(5), b4: Array(1)}
 {a5: {…}}a5: {b1: Array(2), b2: Array(5), b4: Array(1)}
 