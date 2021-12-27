//select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const  list= document.getElementById("list");
const input=document.getElementById('input');
//class names
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const linethrough="lineThrough";
//show today dates
const options={ weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
const today=new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options);
//variables
let LIST, id;
//get item from local storage
let data = localStorage.getItem("storeitem");
//check if data is not empty
if(data)
{
    LIST =JSON.parse(data);
    id=LIST.length;
    loadList(LIST);

}
else{
    LIST=[];
    id=0;
}
//load items to user interface
function loadList(array){
    array.forEach(function(item){
        add(item.name,item.id,item.done,item.trash);
    });
}
//clear the local storage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})


//add to do function
  function add(todo,id,done,trash){
    if(trash){
        return;
    }

    const don = done ? check:uncheck;
    const line = done ? linethrough:"";

    const item = `<li class="item">
    <i class="fa ${don} co" job="complete"  id="${id}"></i>
    <p  class="text ${line}">${todo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
    </li>`;

    const position="beforeend";
    list.insertAdjacentHTML(position, item);
}


//add an item to list using enter key
     document.addEventListener("keyup",function(even){
        if(event.keyCode==13)
        {   
            const todo = input.value;

            if(todo=="")
            {
                alert('ERROR :Please Input a task')
            }

            if(todo)
            {
                add(todo, id, false,false);

                LIST.push({
                    name:todo,
                    id:id,
                    done:false,
                    trash:false
                });
                localStorage.setItem("storeitem",JSON.stringify(LIST));
                id++;

            }
            input.value="";
        }
    });
    //complete to do
   function completeto(element)
   {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(linethrough);
    LIST[element.id].done =LIST[element.id].done?false:true;
   }

   //remove to do
   function removeto(element)
   {
    element.parentNode.parentNode.removeChild(element.parentNode); 
    LIST[element.id].trash=true;
   }

   //target the items created dynamically
   list.addEventListener("click",function(event){
    const element = event.target;
    const elementjob = element.attributes.job.value;
 
    if(elementjob=="complete")
    {
        completeto(element);
    }
    else if(elementjob=="delete")
    {
        removeto(element);
    }

    localStorage.setItem("storeitem",JSON.stringify(LIST));
});