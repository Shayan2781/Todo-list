let taskList : Array<Task> = [];
let darkTheme = true;

let rt = document.documentElement!
let themeSwitcher = document.getElementById("theme-toggle")!
themeSwitcher.addEventListener('click', function(){
    if(darkTheme){
        darkTheme = false;
        themeSwitcher.style.setProperty("background-image", 'url("../images/icon-moon.svg")');
        rt.style.setProperty("--background-img-desktop", 'url("../images/bg-desktop-light.jpg")');
        rt.style.setProperty("--background-img-phone", 'url("../images/bg-mobile-light.jpg")');
        rt.style.setProperty("--background-main", 'hsl(0, 0%, 98%)');
        rt.style.setProperty("--section-background", 'hsl(236, 33%, 92%)');
        rt.style.setProperty("--text-color", 'black');
        rt.style.setProperty("--content-border", 'hsl(236, 9%, 61%)');
        rt.style.setProperty("--selected-text-color", 'rgb(99, 99, 99)');

    }
    else{
        darkTheme = true;
        themeSwitcher.style.setProperty("background-image", 'url("../images/icon-sun.svg")');
        rt.style.setProperty("--background-img-desktop", 'url("../images/bg-desktop-dark.jpg")');
        rt.style.setProperty("--background-img-phone", 'url("../images/bg-mobile-dark.jpg")');
        rt.style.setProperty("--background-main", 'hsl(235, 21%, 11%)');
        rt.style.setProperty("--section-background", 'hsl(235, 24%, 19%)');
        rt.style.setProperty("--text-color", 'white');
        rt.style.setProperty("--content-border", 'hsl(236, 9%, 61%)');
        rt.style.setProperty("--selected-text-color", 'rgb(99, 99, 99)');


    }

});

updateTaskCount();
type Task = {
    name : string;
    isDone : boolean;
}

function removeTask (name :string){
    for (let task of taskList){
        if ( task.name === name){
            taskList.splice(taskList.indexOf(task), 1);
        }
    }
}

function createTask (name : string) :Task{
    return {name : name, isDone : false};
}

function addNewTask (name : string){
    let newTask = createTask(name);
    taskList.push(newTask);
}

function setTaskAsDone (name : string){
    for (let task of taskList){
        if ( task.name === name){
            task.isDone = true;
        }
    }
}

function setTaskAsActive (name : string){
    for (let task of taskList){
        if ( task.name === name){
            task.isDone = false;
        }
    }
}

function updateTaskCount (){
    let taskCounter = document.getElementById("items-left")!
    let counter = 0;
    for ( let task of taskList){
        if ( !task.isDone){
            counter++;
        }
    }
    taskCounter.innerText = counter + " items left";
}

function clearCompleted (){
    let newList : Array<Task> = [];
    for (let task of taskList){
        if (!task.isDone){
            newList.push(task);
        }
    }
    taskList = newList;
}

function createTaskElement (task : Task){
    let content = document.createElement('div');
    content.classList.add('content');
    let checkBox = document.createElement('div');
    checkBox.classList.add('main-container__new-task-holder__check-box');
    checkBox.classList.add('content-selector');
    let checkBoxImg = document.createElement('img');
    checkBoxImg.classList.add('content-selector-pic');
    checkBoxImg.src = "./images/cross-icon.jpg";
    let nameHolder = document.createElement('div');
    let nameOfTask = document.createElement('p');
    nameOfTask.classList.add("task-name");
    nameHolder.classList.add('task-name-holder');
    nameOfTask.innerText=task.name;
    if (task.isDone){
        nameOfTask.classList.add('strike');
        checkBoxImg.classList.add('opacity-1');
    }
    checkBox.appendChild(checkBoxImg);
    nameHolder.appendChild(nameOfTask);
    content.appendChild(checkBox);
    content.appendChild(nameHolder);
    let crossImg = document.createElement('img');
    crossImg.classList.add('cross-icon');
    crossImg.src= "./images/icon-cross.svg";
    crossImg.addEventListener('click', function(){
        let taskName = crossImg.parentElement!.firstElementChild!.nextElementSibling!.firstElementChild!
        removeTask(taskName.innerHTML);
        crossImg.parentElement!.remove();
        updateTaskCount();
    });
    content.appendChild(crossImg);
    checkBoxImg.addEventListener('click', function() {
        let taskName = checkBoxImg.parentElement!.nextElementSibling!.firstElementChild!
        if (checkBoxImg.classList.contains('opacity-1')){
            checkBoxImg.classList.remove('opacity-1');
            setTaskAsActive(taskName.innerHTML);
        }
        else{
            checkBoxImg.classList.add('opacity-1');
            setTaskAsDone(taskName.innerHTML);
        }
        taskName.classList.toggle('strike');
        updateTaskCount();
    });
    const contentList = document.querySelector('#content-list')!
    contentList.appendChild(content);
}

function clearElements (){
    const contentList = document.querySelector('#content-list')!
    while (contentList.firstChild) {
        contentList.firstChild.remove()
    }

}

function displayAll (){
    clearElements();
    for (let task of taskList){
        createTaskElement(task);
    }
}

function displayActive (){
    clearElements();
    for (let task of taskList){
        if (!task.isDone){
            createTaskElement(task);
        }
    }
}

function displayCompleted(){
    clearElements();
    for (let task of taskList){
        if (task.isDone){
            createTaskElement(task);
        }
    }
}

function checkWindowResize (){
    if ( window.innerWidth < 1029){
        document.getElementById('main-container')?.appendChild(controlTab);
        document.getElementById('main-container')?.appendChild(document.getElementById('drag-and-drop-text')!);
    }
    else{
        controlsContainer.appendChild(document.getElementById('items-left')!);
        controlsContainer.appendChild(controlTab);
        controlsContainer.appendChild(document.getElementById('clear-completed')!);
    }
}

const newInput  : HTMLInputElement = document.querySelector("#new-task-input")!
newInput.addEventListener('keypress', function(e : any){
    if ( e.key == 'Enter'){
        addNewTask(newInput.value);
        createTaskElement({name : newInput.value, isDone : false});
        newInput.value = "";
        updateTaskCount();
    }
});

const clearCompletedBTN = document.getElementById("clear-completed");
clearCompletedBTN?.addEventListener('click', function(){
    clearCompleted();
    displayAll();
    updateTaskCount();
    viewAll?.nextElementSibling?.classList.remove('selected');
    viewAll?.nextElementSibling?.nextElementSibling?.classList.remove('selected');
    viewAll?.classList.add('selected');
});

const viewAll = document.getElementById("display-all");
viewAll?.addEventListener('click', function(){
    displayAll();
    viewAll.nextElementSibling?.classList.remove('selected');
    viewAll.nextElementSibling?.nextElementSibling?.classList.remove('selected');
    viewAll.classList.add('selected');
});

const viewActive = document.getElementById("display-active");
viewActive?.addEventListener('click', function(){
    displayActive();
    viewActive.nextElementSibling?.classList.remove('selected');
    viewActive.previousElementSibling?.classList.remove('selected');
    viewActive.classList.add('selected');

});

const viewCompleted = document.getElementById("display-completed");
viewCompleted?.addEventListener('click', function(){
    displayCompleted();
    viewCompleted.previousElementSibling?.classList.remove('selected');
    viewCompleted.previousElementSibling?.previousElementSibling?.classList.remove('selected');
    viewCompleted.classList.add('selected');

});
const controlTab = document.getElementById('filters')!
const controlsContainer = document.getElementById('contorls-container')!
window.addEventListener('resize', function(){
    checkWindowResize();
});
checkWindowResize();
viewAll?.nextElementSibling?.classList.remove('selected');
viewAll?.nextElementSibling?.nextElementSibling?.classList.remove('selected');
viewAll?.classList.add('selected');




export{}