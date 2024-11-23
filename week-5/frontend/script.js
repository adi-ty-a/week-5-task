//  start from here
let isSigningUp = false;
let isAddingTodo = false;
document.getElementById("singup-form").addEventListener("submit",async(e)=>{
    e.preventDefault();
    if (isSigningUp) return;
    isSigningUp = true;

    const username = document.getElementById("signup-input").value;
    const password = document.getElementById("signup-password").value;

    try{
        const response = await fetch("http://localhost:3000/sign-up",{
        method: "POST",
        body:{
            username:username,
            password:password
        }
    });
    const data = await response.json();
    isSigningUp = true;
    if(response.ok){
    document.getElementById("singup-form").style.display = "none";
    document.getElementById("singin-form").style.display = "flex";
    document.getElementById("response-message").innerText= "signed in"
    }else{
    }
    }
    catch(Error){
        console.log(Error

        );
    }

})

document.getElementById("singin-form").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    try{
        const response = await fetch("http://localhost:3000/sign-in",{
            method:"POST",
            body:{
                username:username,
                password:password
            }
        })
        if(!response.ok){
            throw new Error("signin failed");
        }
        const data = await response.json();
        localStorage.setItem("token",data.token);
        document.getElementById("singin-form").style.display = "none";
        document.getElementById("todos").style.display = "flex";
    }
    catch(error){
        console.log(error);
    }
})

function createtodo(todo){
    const todocontainer = document.querySelector(".todo-container");
    if(!todocontainer){
        console.log("Todo form is not visible, cannot add todos.");
        return
    }
        while(todocontainer.firstChild){
            todocontainer.removeChild(todocontainer.firstChild);
        }
    todo.forEach((e)=>{       
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class","todo");
        newDiv.innerHTML = e;
        todocontainer.appendChild(newDiv);
    })
    return;
}

document.getElementById("todos").addEventListener("submit", async(e)=>{
    e.preventDefault();
    const todo = document.getElementById("todo").value;
    const token = localStorage.getItem("token");
    try{
        const response = await fetch("http://localhost:3000/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Content-Type header to indicate JSON data
            },
            body: JSON.stringify({
                token: token, // token sent in the body (correct way)
                todo: todo
            })
        })
        
        const data = await response.json();
        console.log(data);
        createtodo(data);
        console.log(localStorage.getItem("token"));

    }
    catch(error){
        console.log(error);
    }

})