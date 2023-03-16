"use strict";
var _a, _b, _c;
//exports.__esModule = true;
var taskList = [];
var darkTheme = true;
var rt = document.documentElement;
var themeSwitcher = document.getElementById("theme-toggle");
themeSwitcher.addEventListener('click', function () {
    if (darkTheme) {
        darkTheme = false;
        themeSwitcher.style.setProperty("background-image", 'url("../images/icon-moon.svg")');
        rt.style.setProperty("--background-img-desktop", 'url("../images/bg-desktop-light.jpg")');
        rt.style.setProperty("--background-img-phone", 'url("../images/bg-mobile-light.jpg")');
        rt.style.setProperty("--background-main", 'hsl(0, 0%, 98%)');
        rt.style.setProperty("--section-background", 'hsl(236, 33%, 92%)');
        rt.style.setProperty("--text-color", 'black');
    }
    else {
        darkTheme = true;
        themeSwitcher.style.setProperty("background-image", 'url("../images/icon-sun.svg")');
        rt.style.setProperty("--background-img-desktop", 'url("../images/bg-desktop-dark.jpg")');
        rt.style.setProperty("--background-img-phone", 'url("../images/bg-mobile-dark.jpg")');
        rt.style.setProperty("--background-main", 'hsl(235, 21%, 11%)');
        rt.style.setProperty("--section-background", 'hsl(235, 24%, 19%)');
        rt.style.setProperty("--text-color", 'white');
    }
});
updateTaskCount();
function removeTask(name) {
    for (var _i = 0, taskList_1 = taskList; _i < taskList_1.length; _i++) {
        var task = taskList_1[_i];
        if (task.name === name) {
            taskList.splice(taskList.indexOf(task), 1);
        }
    }
}
function createTask(name) {
    return { name: name, isDone: false };
}
function addNewTask(name) {
    var newTask = createTask(name);
    taskList.push(newTask);
}
function setTaskAsDone(name) {
    for (var _i = 0, taskList_2 = taskList; _i < taskList_2.length; _i++) {
        var task = taskList_2[_i];
        if (task.name === name) {
            task.isDone = true;
        }
    }
}
function setTaskAsActive(name) {
    for (var _i = 0, taskList_3 = taskList; _i < taskList_3.length; _i++) {
        var task = taskList_3[_i];
        if (task.name === name) {
            task.isDone = false;
        }
    }
}
function updateTaskCount() {
    var taskCounter = document.getElementById("items-left");
    var counter = 0;
    for (var _i = 0, taskList_4 = taskList; _i < taskList_4.length; _i++) {
        var task = taskList_4[_i];
        if (!task.isDone) {
            counter++;
        }
    }
    taskCounter.innerText = counter + " items left";
}
function clearCompleted() {
    var newList = [];
    for (var _i = 0, taskList_5 = taskList; _i < taskList_5.length; _i++) {
        var task = taskList_5[_i];
        if (!task.isDone) {
            newList.push(task);
        }
    }
    taskList = newList;
}
function createTaskElement(task) {
    var content = document.createElement('div');
    content.classList.add('content');
    var checkBox = document.createElement('div');
    checkBox.classList.add('main-container__new-task-holder__check-box');
    checkBox.classList.add('content-selector');
    var checkBoxImg = document.createElement('img');
    checkBoxImg.classList.add('content-selector-pic');
    checkBoxImg.src = "./images/cross-icon.jpg";
    var nameHolder = document.createElement('div');
    var nameOfTask = document.createElement('p');
    nameOfTask.classList.add("task-name");
    nameHolder.classList.add('task-name-holder');
    nameOfTask.innerText = task.name;
    if (task.isDone) {
        nameOfTask.classList.add('strike');
        checkBoxImg.classList.add('opacity-1');
    }
    checkBox.appendChild(checkBoxImg);
    nameHolder.appendChild(nameOfTask);
    content.appendChild(checkBox);
    content.appendChild(nameHolder);
    var crossImg = document.createElement('img');
    crossImg.classList.add('cross-icon');
    crossImg.src = "./images/icon-cross.svg";
    crossImg.addEventListener('click', function () {
        var taskName = crossImg.parentElement.firstElementChild.nextElementSibling.firstElementChild;
        removeTask(taskName.innerHTML);
        crossImg.parentElement.remove();
        updateTaskCount();
    });
    content.appendChild(crossImg);
    checkBoxImg.addEventListener('click', function () {
        var taskName = checkBoxImg.parentElement.nextElementSibling.firstElementChild;
        if (checkBoxImg.classList.contains('opacity-1')) {
            checkBoxImg.classList.remove('opacity-1');
            setTaskAsActive(taskName.innerHTML);
        }
        else {
            checkBoxImg.classList.add('opacity-1');
            setTaskAsDone(taskName.innerHTML);
        }
        taskName.classList.toggle('strike');
        updateTaskCount();
    });
    var contentList = document.querySelector('#content-list');
    contentList.appendChild(content);
}
function clearElements() {
    var contentList = document.querySelector('#content-list');
    while (contentList.firstChild) {
        contentList.firstChild.remove();
    }
}
function displayAll() {
    clearElements();
    for (var _i = 0, taskList_6 = taskList; _i < taskList_6.length; _i++) {
        var task = taskList_6[_i];
        createTaskElement(task);
    }
}
function displayActive() {
    clearElements();
    for (var _i = 0, taskList_7 = taskList; _i < taskList_7.length; _i++) {
        var task = taskList_7[_i];
        if (!task.isDone) {
            createTaskElement(task);
        }
    }
}
function displayCompleted() {
    clearElements();
    for (var _i = 0, taskList_8 = taskList; _i < taskList_8.length; _i++) {
        var task = taskList_8[_i];
        if (task.isDone) {
            createTaskElement(task);
        }
    }
}
function checkWindowResize() {
    var _a, _b;
    if (window.innerWidth < 1029) {
        (_a = document.getElementById('main-container')) === null || _a === void 0 ? void 0 : _a.appendChild(controlTab);
        (_b = document.getElementById('main-container')) === null || _b === void 0 ? void 0 : _b.appendChild(document.getElementById('drag-and-drop-text'));
    }
    else {
        controlsContainer.appendChild(document.getElementById('items-left'));
        controlsContainer.appendChild(controlTab);
        controlsContainer.appendChild(document.getElementById('clear-completed'));
    }
}
var newInput = document.querySelector("#new-task-input");
newInput.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        addNewTask(newInput.value);
        createTaskElement({ name: newInput.value, isDone: false });
        newInput.value = "";
        updateTaskCount();
    }
});
var clearCompletedBTN = document.getElementById("clear-completed");
clearCompletedBTN === null || clearCompletedBTN === void 0 ? void 0 : clearCompletedBTN.addEventListener('click', function () {
    var _a, _b, _c;
    clearCompleted();
    displayAll();
    updateTaskCount();
    (_a = viewAll === null || viewAll === void 0 ? void 0 : viewAll.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove('selected');
    (_c = (_b = viewAll === null || viewAll === void 0 ? void 0 : viewAll.nextElementSibling) === null || _b === void 0 ? void 0 : _b.nextElementSibling) === null || _c === void 0 ? void 0 : _c.classList.remove('selected');
    viewAll === null || viewAll === void 0 ? void 0 : viewAll.classList.add('selected');
});
var viewAll = document.getElementById("display-all");
viewAll === null || viewAll === void 0 ? void 0 : viewAll.addEventListener('click', function () {
    var _a, _b, _c;
    displayAll();
    (_a = viewAll.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove('selected');
    (_c = (_b = viewAll.nextElementSibling) === null || _b === void 0 ? void 0 : _b.nextElementSibling) === null || _c === void 0 ? void 0 : _c.classList.remove('selected');
    viewAll.classList.add('selected');
});
var viewActive = document.getElementById("display-active");
viewActive === null || viewActive === void 0 ? void 0 : viewActive.addEventListener('click', function () {
    var _a, _b;
    displayActive();
    (_a = viewActive.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove('selected');
    (_b = viewActive.previousElementSibling) === null || _b === void 0 ? void 0 : _b.classList.remove('selected');
    viewActive.classList.add('selected');
});
var viewCompleted = document.getElementById("display-completed");
viewCompleted === null || viewCompleted === void 0 ? void 0 : viewCompleted.addEventListener('click', function () {
    var _a, _b;
    displayCompleted();
    (_a = viewCompleted.previousElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove('selected');
    (_b = viewCompleted.previousElementSibling) === null || _b === void 0 ? void 0 : _b.classList.remove('selected');
    viewCompleted.classList.add('selected');
});
var controlTab = document.getElementById('filters');
var controlsContainer = document.getElementById('contorls-container');
window.addEventListener('resize', function () {
    checkWindowResize();
});
checkWindowResize();
(_a = viewAll === null || viewAll === void 0 ? void 0 : viewAll.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove('selected');
(_c = (_b = viewAll === null || viewAll === void 0 ? void 0 : viewAll.nextElementSibling) === null || _b === void 0 ? void 0 : _b.nextElementSibling) === null || _c === void 0 ? void 0 : _c.classList.remove('selected');
viewAll === null || viewAll === void 0 ? void 0 : viewAll.classList.add('selected');
