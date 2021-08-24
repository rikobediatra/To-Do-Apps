const STORAGE_KEY = "TODO_APPS";

let todos = [];

// fungsi cek storage
function isStorageExist(){
    if(typeof(Storage) === "undefined"){
        alert("Browser Anda Tidak Di Dukung Local Storage");
        return false;
    }
    return true;
}

// fungsi save data
function saveData(){
    // mengubah objek javascript menjadi String JSON
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

// mengambil data dari storage
function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if(data !== null)
        todos = data;

    document.dispatchEvent(new Event('ondataloaded'));
}

// fungsi update data ke dalam storage
function updateDataToStorage(){
    if(isStorageExist())
        saveData();
}

// fungsi membuat objek baru TODO baru
function composeTodoObject(task, timestamp, isCompleted){
    return{
        id: +new Date(),
        task,
        timestamp,
        isCompleted
    };
}

// mencari objek todo
function findTodo(todoId){
    for(todo of todos){
        if(todo.id === todoId){
            return todo;
        }
    }
    return null;
}

// mencari index dari objek todo
function findTodoIndex(todoId){
    let index = 0;
    for(todo of todos){
        if(todo.id === todoId){
            return index
        }

        index++;
    }

    return -1;
}

// me-render data TODO yang ada pada object array todos
function refreshDataFromTodos(){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    for(todo of todos){
        const newTodo = makeTodo(todo.task, todo.timestamp, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;

        // pengecekan sudah completed atau belum
        if(todo.isCompleted){
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    }
}