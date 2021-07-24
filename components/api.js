// const API = "http://192.168.1.108:4000/";
const API = "https://backend-tasky.herokuapp.com/";

export const getUserData = async (id)=>{
  const res = await fetch(`${API}userdata/${id}`,{
    method:'GET'
  })
  return await res.json()
}

export const getUser = async (user, pass, navigation) => {
  const data = { user, pass }
  const res = await fetch(`${API}user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    return navigation.navigate('UserScreen', { user: data.user, id: data.id })
}

export const registerUser = async (newUser) => {
  const res = await fetch(`${API}register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  return await res.json();
};

export const getTask = async (id) => {
  const res = await fetch(`${API}task/${id}`, {
    method: "GET",
  });
  return await res.json();
}

export const getAllTasks = async (id) => {
  const res = await fetch(`${API}${id}/dashboard`, {
    method: "GET",
  })
  return await res.json()
}

export const registerTask = async (task,expire,reminder,notifid) => {
  const data = {task,expire,reminder,notifid}
  const res = await fetch(`${API}task`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    return window.alert('Task Create')
}

export const deleteTask = async (id, navigation) => {
  const res = await fetch(`${API}task/${id}`, {
    method: 'DELETE'
  })
  window.alert('Task Delete')
  if(navigation != null){
    return await navigation.goBack()
  }else{
    window.alert('Task Expire')
  }
}

export const updateTask = async (task,expire,reminder,notifid) => {
  const data = {task,expire,reminder,notifid}
  const res = await fetch(`${API}task/${task.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  window.alert('Task Update')
  return await res.json();
}


export const completeTask = async (task) => {
  const res = await fetch(`${API}completeTask`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  window.alert('Task Complete!')
  return await res.json();
}

export const pinTask = async (id,pin)=>{
  const data = {id,pin}
  const res = await fetch(`${API}pintask`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export const searchingTask = async (id,title)=>{
  const res = await fetch(`${API}searchingtask/${id}/${title}`,{
    method:'GET'
  })
  return await res.json()
}

export const searchImage = async (name)=>{
  const res = await fetch(`${API}getimage/${name}`,{
    method:'GET'
  })
  return await res.json()
}
