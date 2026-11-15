const tasks = [
{ id: 1, title:"Trun1"},
{ id: 2, title:"Trun2"},
];

export async function findAll(){
    return tasks;
}

export async function findById(id){
    return tasks.find(tasks => task.id === id) ?? null;
}