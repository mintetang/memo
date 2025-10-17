
function pushAb() {
    const inputA = document.
        getElementById('inputA').value;
    const inputB = document.
        getElementById('inputB').value;
    const inputC = document.
        getElementById('inputC').value;
//console.log(inputA,inputB,inputC);

    memoObj = {classA:inputA,classB:inputB,valC:inputC};
    //console.log(attObj);
    let memoArray = JSON.parse(localStorage.getItem('memoArr'));
    //console.log(attArray);
    if (memoArray === null) {
    memoArray = [];
    memoArray.push(memoObj);
    } 
    else {
    memoArray.push(memoObj);
    }
    memoArray.sort((a, b) => 
        a.classA.localeCompare(b.classA));
    //save attendance history to localStorage attHis
    console.log(memoArray);

    //group by same key value
    
    const cascadingArray = memoArray.reduce((acc, currentItem) => {
    const { classA, classB, ...rest } = currentItem; // Destructure to get category and other properties

    // Find if the category already exists in the accumulator
    let existingCategory = acc.find(item => item.classA === classA && item.classB === classB);

    if (!existingCategory) {
        // If category doesn't exist, create a new entry
        existingCategory = { classA, classB, items: [] };
        acc.push(existingCategory);
    }

    // Add the current item (without the category key) to the items array of the found/new category
    existingCategory.items.push(rest);

    return acc;
    }, []);

    console.log(cascadingArray);

    //old spared method
    //console.log(collect(memoArray));

    localStorage.setItem('memoArr', 
          JSON.stringify(memoArray));
}

/*
const groupA = memoArray.reduce((acc, currentItem) => {
    const classA = currentItem.classA;
    const classB = currentItem.classB;
    if (!acc[classA]) {
        acc[classA] = []; // Initialize an empty array for the classA if it doesn't exist
    }
    acc[classA].push(currentItem.classB); // Add the current item to the classA's array
    if (!acc[classB]) {
        acc[classB] = []; // Initialize an empty array for the classA if it doesn't exist
    }
    acc[classB].push(currentItem.valC); // Add the current item to the classA's array
    return acc;
    }, {});

    console.log(groupA);

function collect (array) {

    const group = {};

    array.forEach(obj => {
    const key = obj.classA;
    const value = {[obj.classB]:obj.valC};

    if (group[key]) {
        // Key exists, push the value to the existing array
        group[key].push(value);
    } else {
        // Key does not exist, create a new array with the value
        group[key] = [value];
    }
    });

    return group;
  //return Object.keys(obj).filter(key => obj[key] === value);
}*/
