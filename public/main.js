const input = document.getElementById("input");
const list = document.getElementById("list");
const addButton = document.getElementById("AddButton");

//blocks submission form popup
document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();
})

addButton.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});
list.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    saveData();
});

function addTask(){
    if(input.value === ''){
        alert("Input Empty");
    }else{
        let newItem = document.createElement("li");
        newItem.innerHTML = input.value;
        list.appendChild(newItem);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        newItem.appendChild(span);
    }
    input.value = "";
    saveData();
}

function saveData(){
    localStorage.setItem("data", list.innerHTML);

}
function showData(){
    list.innerHTML = localStorage.getItem("data");
}
showData();

function listToArray(){
    const rawInput = list.innerText;

    console.log(list.innerHTML);

    console.log(rawInput);
    const array = rawInput.split("\u00d7");
    console.log(array);
    return array;
}
function reorderList(array){
    for(let i = 0;i<array.length;i++){
        array[i] = array[i].replaceAll("\n", "");
    }
    array.sort();//alphabetically
    array = swap(array);
    console.log(array);
    updateData(array);

}
function swap(array){
    var temp = array[0];
    array[0] = array[array.length-1];
    array[array.length-1] = temp;
    return array;
}


function updateData(array){
    for(let i = 0;i<array.length;i++){
        array[i] = "\n" + array[i] + "\n";
    }
    array = array.toString();
    array = array.replaceAll(",", "\u00d7");
    console.log(array);
}

function sendPost(){
    const list = document.getElementById("list").innerText
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({list: list})
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        reorder(data);
    })
}

function reorder(data){
    document.getElementById("list").innerHTML = "";

    const array = data.split("\u00d7");
    const list = document.getElementById("list");
    for(let i = 0;i<array.length;i++){
        let newItem = document.createElement("li");
        newItem.innerHTML = array[i];
        list.appendChild(newItem);
    
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        newItem.appendChild(span);
    }
    saveData();
}