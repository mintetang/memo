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

function showMemo() {
         // Update the result section
    document.getElementById('noteData').
        innerText = localStorage.getItem('groupArr');
    resultSection.style.display = 'block';
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

function cleanCurrent()
    {
    const reCheck = prompt('are U sure? type "YES" to confirm!');
    if (reCheck === 'CONFIRM') {
        localStorage.clear();
        location.reload();
        } else {
    alert("Cancelled!");
    }

}

function searchRoll() {
    const kword = document.getElementById("kword").value;
    console.log(kword);
    // Define your attribute name and value as variables
    let targetElement = null;
    const allParagraphs = document.querySelectorAll('span');
    for (const p of allParagraphs) {
        if (p.textContent.includes(String(kword))) {
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