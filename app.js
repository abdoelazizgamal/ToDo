const theInput = document.querySelector('.add-task input'),
      addButton = document.querySelector('.add-task .plus'),
      tasksContainer = document.querySelector('.tasks-content'),
      tasksCount = document.querySelector('.tasks-count span'),
      tasksCompleted = document.querySelector('.tasks-completed span');

window.onload = ()=>
{
    theInput.focus();
}

// Adding The Task
addButton.addEventListener('click',function(){
    if(theInput.value === "")
    {
        Swal.fire({
            icon: 'error',
            title: 'No Tasks!',
            text: "Can't Be Empty!",
          });
    }
    else
    {
        AddTask()
    }
})
//For EnterKey
window.addEventListener('keypress',function(e)
{
    if (e.key == "Enter")
    {
        if(theInput.value === "")
        {
            Swal.fire({
                icon: 'error',
                title: 'No Tasks!',
                text: "Can't Be Empty!",
                });
        }
        else
        {
            AddTask();
        }
    }
});
function AddTask()
{   
        checkNoTasks();
        let mainSpan = document.createElement('span');
        mainSpan.classList.add('task-box');
        mainSpan.innerHTML = `${theInput.value}<span class='delete'>Delete</span>`;
        if (checkExist() == false) {
            Swal.fire({
                icon: 'error',
                title: 'Existed!',
                text: "Already Added!",
              })
        }
        else
        {
            tasksContainer.appendChild(mainSpan);
            localStorage.setItem(theInput.value,"test");
        }
        calculateTasks()
        theInput.value = '';
        theInput.focus()
}
function checkNoTasks()
{
    let noTasksMsg = document.querySelector('.no-tasks-message');
    if(document.body.contains(document.querySelector('.no-tasks-message')))
    {
        noTasksMsg.remove();
    }
}
function checkExist()
{
    let allTasks = document.querySelectorAll('.task-box');
    for (let i = 0; i < allTasks.length; i++) {
        if(allTasks[i].textContent === theInput.value+"Delete")
        {
            return false;
        }
    }
    return true;
}

document.addEventListener('click', function(e){
    if(e.target.classList.contains('delete'))
    {
        e.target.parentElement.remove();
        localStorage.removeItem(e.target.parentElement.textContent.slice(0,-6));
        if(tasksContainer.childElementCount == 0)
        {
           CreateNoTasks();
        }
        calculateTasks();
    }
    if(e.target.classList.contains('task-box'))
    {
        if(!e.target.classList.contains('finished'))
        {
            e.target.classList.add('finished');
            localStorage.setItem(e.target.textContent.slice(0,-6) ,'finished');
        }
        else
        {
            e.target.classList.remove('finished');
            localStorage.setItem(e.target.textContent.slice(0,-6) ,'');
        }
        
        calculateTasks();
    }
    if(e.target.classList.contains('d-finished'))
    {
       let allFinished = document.querySelectorAll('.finished');
       allFinished.forEach(finish=>{
            finish.remove();
            localStorage.removeItem(finish.textContent.slice(0,-6));
       });
       if(tasksContainer.childElementCount == 0)
        {
           CreateNoTasks();
        }
        calculateTasks();
    }
    if(e.target.classList.contains('d-all'))
    {
       let tasks = document.querySelectorAll('.task-box');
       tasks.forEach(task=>{
            task.remove();
            localStorage.removeItem(task.textContent.slice(0,-6));
       });
       CreateNoTasks(); 
       calculateTasks();
       localStorage.clear()
    }
    
      
})
function CreateNoTasks()
{
    if(tasksContainer.childElementCount == 0)
    {
        let msgSpan = document.createElement('span');
        msgSpan.classList.add('no-tasks-message');
        msgSpan.innerText = 'No Tasks To Show';
        tasksContainer.appendChild(msgSpan);
    }
    
}
function calculateTasks()
{
    tasksCount.innerText =  document.querySelectorAll('.task-box').length;
    tasksCompleted.innerText = document.querySelectorAll('.finished').length;
}

(function showTasks()
{
     if(localStorage.length)
     {
        for(let [key,value] of Object.entries(localStorage))
        {
            if(value == 'finished')
            {
                tasksContainer.innerHTML += `<span class='task-box finished'>${key}<span class='delete'>Delete</span></span> `;
            }
            else
            {
                tasksContainer.innerHTML += `<span class='task-box'>${key}<span class='delete'>Delete</span></span> `;
            }
           
        }
        calculateTasks()
     }
     else
     {
        CreateNoTasks();
     }
})();

/************************************* Style Switcher **************************************/
//Style Switcher Open
const styleSwitcher = document.querySelector('.style-switcher');
const styletoggler = document.querySelector('.style-toggler');
const dayNight = document.querySelector('.day-night');
styletoggler.addEventListener('click',function(){
    styleSwitcher.classList.toggle('open');
});
window.addEventListener('load',function(){
    CheckDarkMode()
    dayNight.addEventListener('click',function()
    {
        document.body.classList.toggle('dark');
        CheckDarkMode()
    });
});

function CheckDarkMode()
{
    if(document.body.classList.contains('dark'))
    {
        dayNight.querySelector('.icon').classList.remove("fa-moon");
        dayNight.querySelector('.icon').classList.add("fa-sun");
    }
    else
    {
        dayNight.querySelector('.icon').classList.remove("fa-sun");
        dayNight.querySelector('.icon').classList.add("fa-moon");
    }
}

// Style Switcher Colors
let colors = Array.from(document.querySelectorAll('.colors-list span'));

colors.forEach((color)=>{
    color.addEventListener('click',function(){
        document.querySelector('.colors-list span.active').classList.remove('active');
        color.classList.add('active');
        document.documentElement.style.setProperty('--main-color', color.dataset.color); 
    });
});