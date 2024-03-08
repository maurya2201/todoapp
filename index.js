const getData = async () => {
  try {
    const response = await axios.get(`https://todobackend-0yxk.onrender.com/api/todo/`);
    let value = ``;
    response.data.map((element,index) => {
      value += `
    <div class="card" style="width: 70%;border: 3px solid black;">
    <div class="card-body">
    <p class="card-text">${element.message}</p>
    <button class="btn btn-success" onclick="updateTodo('${element._id}',${index})">UPDATE</button>
    <button class="btn btn-danger" onclick="deleteTodo('${element._id}')">DELETE</button>
    </div>
    </div>
    `;
    });
    document.getElementById("todobody").innerHTML = value;
    setTimeout(()=>{
      Toastify({
        text: "Todo fetched successfully.",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    },3000);
  } catch (error) {
    setTimeout(()=>{
    Toastify({
      text: "Error while fetching Todo.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff0000, #ff0000)",
      }
    }).showToast();
  },3000);
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
        Toastify({
          text: "Please enter valid todo",
          className: "info",
          style: {
            background: "linear-gradient(to right, #ff0000, #ff0000)",
          }
        }).showToast();
      } else {
        const value = {
          message: todo,
        };
        await axios.post(`https://todobackend-0yxk.onrender.com/api/todo/`, value);
        Toastify({
          text: "Todo added successfully.",
          className: "info",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
        }).showToast();
        getData();
        document.getElementById("todo").value = "";
      }
    });
  } catch (error) {
    Toastify({
      text: "Todo not added.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff0000, #ff0000)",
      }
    }).showToast();
    console.log(error);
  }
};
addData();

async function deleteTodo(id) {
  try {
    await axios.delete(`https://todobackend-0yxk.onrender.com/api/todo/${id}`);
    Toastify({
      text: "Todo deleted successfully.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
    getData();
  } catch (error) {
    Toastify({
      text: "Todo not deleted.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff0000, #ff0000)",
      }
    }).showToast();
    console.log(error);
  }
}

async function updateTodo(id,index) {
  try {
    const response = await axios.get(`https://todobackend-0yxk.onrender.com/api/todo/${id}`);
    const update = document.getElementById("todo");
    update.value = response.data.message;
    document.getElementsByClassName("btn btn-danger")[index].style.display="none";
    document.getElementById("addtodo").style.display = "none";
    const updateBtn = document.getElementById("updatetodo");
    updateBtn.style.display = "block";
    Toastify({
      text: "Please Enter your Todo again.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
    updateBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const todo = document.getElementById("todo").value;
      const value = {
        message: todo,
      };
      await axios.put(`https://todobackend-0yxk.onrender.com/api/todo/${id}`, value);
      document.getElementById("addtodo").style.display = "block";
      updateBtn.style.display = "none";
      document.getElementsByClassName("btn btn-danger")[index].style.display="block";
      getData();
      document.getElementById("todo").value = "";
      Toastify({
        text: "Todo updated successfully.",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    });
  } catch (error) {
    Toastify({
      text: "Todo not updated.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff0000, #ff0000)",
      }
    }).showToast();
    console.log(error);
}}
