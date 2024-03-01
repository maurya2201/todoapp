const getData = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/todo/`);
    let value = ``;
    response.data.map((element) => {
      value += `
    <div class="card" style="width: 70%;border: 3px solid black;">
    <div class="card-body">
    <p class="card-text">${element.message}</p>
    <button class="btn btn-success" onclick="updateTodo('${element._id}')">UPDATE</button>
    <button class="btn btn-danger" onclick="deleteTodo('${element._id}')">DELETE</button>
    </div>
    </div>
    `;
    });
    document.getElementById("todobody").innerHTML = value;
  } catch (error) {
    console.log(error);
  }
};
getData();

const addData = () => {
  try {
    const add = document.getElementById("addtodo");
    add.addEventListener("click", async (event) => {
      event.preventDefault();
      const todo = document.getElementById("todo").value;
      if (todo === "") {
        alert(`Enter todo again please`);
      } else {
        const value = {
          message: todo,
        };
        await axios.post(`http://localhost:4000/api/todo/`, value);
        getData();
        alert(`Todo-added successfully`);
        document.getElementById("todo").value = "";
      }
    });
  } catch (error) {
    console.log(error);
  }
};
addData();

async function deleteTodo(id) {
  try {
    await axios.delete(`http://localhost:4000/api/todo/${id}`);
    getData();
    alert(`Todo-deleted successfully`);
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(id) {
  try {
    const response = await axios.get(`http://localhost:4000/api/todo/${id}`);
    const update = document.getElementById("todo");
    update.value = response.data.message;
    document.getElementById("addtodo").style.display = "none";
    const updateBtn = document.getElementById("updatetodo");
    updateBtn.style.display = "block";
    alert(`Enter todo again here`);
    updateBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const todo = document.getElementById("todo").value;
      const value = {
        message: todo,
      };
      await axios.put(`http://localhost:4000/api/todo/${id}`, value);
      document.getElementById("addtodo").style.display = "block";
      updateBtn.style.display = "none";
      getData();
      document.getElementById("todo").value = "";
    });
  } catch (error) {
    console.log(error);
}
}
