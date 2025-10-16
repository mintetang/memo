
function pushAb() {
    const inputA = document.
        getElementById('inputA').value;
    const inputB = document.
        getElementById('inputB').value;
    const inputC = document.
        getElementById('inputC').value;
console.log(inputA,inputB,inputC);

    memoObj = {classA:inputA,classB:inputB,valC:inputC};
    //console.log(attObj);
    let memoArray = JSON.parse(localStorage.getItem('memoArr'));
    //console.log(attArray);
    if (memoArray === null) {
    memoArray = [];
    memoArray.push(memoObj);
    //console.log(attArray);
    } 
    //else if (JSON.stringify(memoArray).includes(inputB) !== false){
        // Find object with the same inputB name;
        //indexToUpdate = memoArray.findIndex((obj) => inputB in obj );
        //console.log(indexToUpdate);
        //indexToUpdate = memoArray.findIndex(obj => obj.inputB === memoObj.inputB);
        //console.log(indexToUpdate);
        //attArray.splice(indexToUpdate, 1, attObj); 
        // Remove 1 element at indexToUpdate and insert newObject
        //console.log(attArray);
    //}
    else {
    memoArray.push(memoObj);
    //console.log(attArray);
    }
    memoArray.sort((a, b) => 
        a.classA.localeCompare(b.classA));
    //save attendance history to localStorage attHis
    console.log(memoArray);

    groupB = collectB(memoArray);
    //groupA = collectA(memoArray);
    console.log(groupB);
    //console.log(groupA);

    localStorage.setItem('memoArr', 
          JSON.stringify(memoArray));
    /*localStorage.setItem('memoArr', 
          JSON.stringify(memoArray));*/
}

function collectB (array) {

    const groupB = {};
    groupA = {};
    console.log(groupA);
    array.forEach(obj => {
    const key = obj.classB;
    const value = obj.valC;
    const akey = obj.classA;

    if (groupB[key] && groupA !== {}) {
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

    /*const arrayB = Object.keys(groupB).map(key => {
    return {
        [key]: groupB[key]
    };
    });
    console.log(arrayB);*/

    return groupB;
  //return Object.keys(obj).filter(key => obj[key] === value);
}

function collectA (array) {

    const groupA = {};

    array.forEach(obj => {
    const key = obj.ClassA;
    const value = obj.classB;

    if (groupA[key]) {
        // Key exists, push the value to the existing array
        groupA[key].push(value);
    } else {
        // Key does not exist, create a new array with the value
        groupA[key] = [value];
    }
    });

    return groupA;
  //return Object.keys(obj).filter(key => obj[key] === value);
}
