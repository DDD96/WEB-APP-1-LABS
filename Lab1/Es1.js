"use strict mode"

const readline = require('readline-sync');

function printMenu(){
    console.log("1 - Insert a new task");
    console.log("2 - Remove a task by description");
    console.log("3 - Remove a task by deadline");
    console.log("4 - Print tasks");
    console.log("5 - exit");
}
function addTask(tasks){
    const text = readline.question("Insert the description : ").trim();
    const urgent = readline.question("Is it urgent (y/n) : ").toLowerCase().trim() === 'y';
    const privato = readline.question("Is it private (y/n) : ").toLowerCase().trim() === 'y';
    let date = readline.question("Task deadline (YYYY-MM-DD): ").trim();
    if(!date.includes(" ")) {
        date += " 23:59:59z";
    }
    const deadline = new Date(date);
    const task ={"Text":text,"Urgent":urgent,"Private":privato,"Deadline":deadline};
    tasks.push(task);

    // se il tempo non e'NaN imposta timer
    if(!Number.isNaN(deadline.getTime())){
        const now = new Date();
        console.log(now);
        const timer = setTimeout( function(task){
            tasks.splice(tasks.indexOf(task),1);
        }, deadline.getTime() - now.getTime());
    }

}

function removeTask(tasks){
    const text = readline.question("Insert the description : ").trim();
    const toRemove = [];
    for(const task of tasks){
        if(task["Text"]==text){
            toRemove.push(task);
        }
    }
    for(const task of toRemove){
        tasks.splice(tasks.indexOf(task),1);
    }

}


function removeTaskDate(tasks){
    let date = readline.question("Task deadline (YYYY-MM-DD): ").trim();
    if(!date.includes(" ")) {
        date += " 23:59:59z";
    }
    const remove = new Date(date);
    
    const toRemove = [];
    for(const task of tasks){
        const data = new Date(task.Deadline);
        // console.log(typeof(task.deadline))
        // console.log(task.deadline)
        console.log(data.getFullYear());
        console.log(data.getMonth());
        console.log(data.getDay());
        console.log(remove.getFullYear());
        console.log(remove.getMonth());
        console.log(remove.getDay());

       if(task.Deadline.getFullYear() === remove.getFullYear() && task.Deadline.getMonth() === remove.getMonth() && task.Deadline.getDay() === remove.getDay()){            toRemove.push(task);
           toRemove.push(task);
       }
    }
    for(const task of toRemove){
        tasks.splice(tasks.indexOf(task),1);
    }

}
function showTasks(tasks){
    tasks.sort((a,b) => (a.Text.localCompare(b.Text)));
    console.log(tasks);
}

// let ok = true;
// let choise =4;

const menu = setInterval(()=>{
    const tasks=[];
    printMenu();
    let choice = readline.question('Your choice: ');
    // console.log(choice);
    switch(choice.trim()){
        case '1':
            addTask(tasks);
        break;
        case '2':
            removeTask(tasks);
        break;
        case '3':
            removeTaskDate(tasks);
        break;
        case '4':
            showTasks(tasks);

        break;
        default:
            clearInterval(menu);
        break;
    }
},500);
