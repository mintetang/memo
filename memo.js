document.addEventListener("DOMContentLoaded",
    function () {
        showMemo();
    });

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
    
    const groupArray = memoArray.reduce((acc, currentItem) => {
    const { classA, classB, ...rest } = currentItem; // Destructure to get category and other properties

    // Find if the category already exists in the accumulator
    let existingCategory = acc.find(item => item.classA === classA 
        && item.classB === classB);

    if (!existingCategory) {
        // If category doesn't exist, create a new entry
        existingCategory = { classA,classB, value: [] };
        acc.push(existingCategory);
    }

    // Add the current item (without the category key) to the items array of the found/new category
    existingCategory.value.push(rest.valC);

    return acc;
    }, []);

    console.log(groupArray);

    //old spared method
    //console.log(collect(memoArray));

    localStorage.setItem('memoArr', 
          JSON.stringify(memoArray));
    localStorage.setItem('groupArr', 
          JSON.stringify(groupArray));
    showMemo();

}



function showreadForm() {
    document.getElementById('readPopup').
        style.display = 'block';
}

function exportLocalStorage() {
  // 1. Get all localStorage data
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageData[key] = localStorage.getItem(key);
  }

  // 2. Convert to a JSON string
  const jsonString = JSON.stringify(localStorageData, null, 4);

  // 3. Create a Blob and URL
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // 4. Create and click a download link
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'data.json';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  
  //alert('Your localStorage data has been exported to data.json');
}

function rlsFromFile(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.clear(); // Clear existing localStorage before restoring
            for (const key in data) {
                localStorage.setItem(key, data[key]);
            }
            console.log('localStorage restored successfully!');
            alert('成功讀回紀錄!');
            location.reload();
        } catch (error) {
            console.error('Error parsing or restoring localStorage:', error);
        }
    };
    reader.readAsText(file);
    closePopup();
}

function closePopup() {
    // Close the currently open popup
    document.getElementById('readPopup').
        style.display = 'none';
}

function cleanCurrent()
    {
    const reCheck = prompt('are U sure? type "YES" to confirm!');
    if (reCheck === 'YES') {
        localStorage.clear();
        location.reload();
        } else {
    alert("Cancelled!");
    }

}

function searchRoll() {
    const kword1 = document.getElementById("kword").value;
    //const kword2 = document.getElementById("aSelector").value;
    //console.log(kword1,kword2);
    // Define your attribute name and value as variables
    let targetElement = null;
    const allParagraphs = document.querySelectorAll('p');
    for (const p of allParagraphs) {
        if (p.textContent.includes(String(kword1))) {
            targetElement = p;
            break;
        }
    }
    if (targetElement) {
    targetElement.scrollIntoView({
        behavior: "smooth", // Optional: for smooth scrolling animation
        block: "start"      // Optional: align the top of the element with the top of the viewport
        });
    }
}

function clearInput() {
    document.getElementById('inputA').value = null;
    document.getElementById('inputB').value = null;
    document.getElementById('inputC').value = null;
}

function toInputHome() {
    document.getElementById('inputA').value = null;
    document.getElementById('inputA').value = 
    document.querySelector('[value="home"]').innerText;
}

function toInputRecent() {
    document.getElementById('inputA').value = null;
    document.getElementById('inputA').value = 
    document.querySelector('[value="recent"]').innerText;
}

function toInputBusiness() {
    document.getElementById('inputA').value = null;
    document.getElementById('inputA').value = 
    document.querySelector('[value="business"]').innerText;
}


function toInputChurch() {
    document.getElementById('inputA').value = null;
    document.getElementById('inputA').value = 
    document.querySelector('[value="church"]').innerText;
}

function toInputTravel() {
    document.getElementById('inputA').value = null;
    document.getElementById('inputA').value = 
    document.querySelector('[value="travel"]').innerText;
}

function toInputWord() {
    document.getElementById('inputA').value = null;
    document.getElementById('inputA').value = 
    document.querySelector('[value="word"]').innerText;
}

function generateObjectReport(data) {
    // Step 1: Group the objects by 'category'
    const groupByKey = (arr, key) => {
    return arr.reduce((result, currentValue) => {
        // Get the category of the current object
        const groupKey = currentValue[key];
        // If the group doesn't exist, create it
        if (!result[groupKey]) {
        result[groupKey] = [];
        }
        // Add the current object to the correct group
        result[groupKey].push(currentValue);
        return result;
    }, {});
    };
  // Step 2: Generate the cascading report
    const generateObjectReport = (data) => {
    let groupedData = groupByKey(data, 'classA');

    let selectedOne = document.getElementById("aSelector").value;
    if (selectedOne !== "all"){
    const keysToKeep = [selectedOne];// Keys you want to include
        groupedData = Object.keys(groupedData)
        .filter((key) => keysToKeep.includes(key)) // Filter keys based on your criteria
        .reduce((acc, key) => {
            acc[key] = groupedData[key]; // Add the key-value pair to the new object
            return acc;
        }, {});
    console.log(groupedData);}

    // Step 3: Format the report in a cascading style
    let report = '';
    for (const classA in groupedData) {
        report += `${classA}:\n`;
        groupedData[classA].forEach(item => {
        report += `  - ${item.classB} (: ${item.value})\n`;
        });
        report += '\n'; // Add space between categories
    }
    return report;
    };

    // Step 4: Output the report
    const report = generateObjectReport(data);

    //console.log(report);
    // To display in a browser:
    document.getElementById('cReport').innerText = report;
}

function showMemo() {
         // Update the result section
    /*document.getElementById('noteData').
        innerText = localStorage.getItem('groupArr');
    resultSection.style.display = 'block';*/
    groupArray = JSON.parse(localStorage.getItem('groupArr'));
    generateObjectReport(groupArray);
}