import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTask from "./AddTask.js";
import { isOnlySpaceOrEmpty } from "../utilities/utils";
import emptyFolder from "../assets/img/folder.png";
import styles from "./TaskList.module.scss";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [allQty, setAllQty] = useState(0);
  const [doneQty, setDoneQty] = useState(0);
  const [todoQty, setTodoQty] = useState(0);

  // localStorage.clear()
  // localStorage.setItem("tasks", JSON.stringify(tasks));
  // localStorage.removeItem("tasks");

  useEffect(() => {
    let localTask = JSON.parse(localStorage.getItem("tasks"));
    if (localTask !== null && localTask !== undefined) {
      setTasks(localTask);
    }
  }, []);

  useEffect(() => {
    let done = 0;
    let todo = 0;
    setAllQty(tasks.length);
    if (allQty === 0) {
      setTodoQty(0);
      setDoneQty(0);
    }
    tasks.map((item, index) => {
      if (item.status === true) {
        done += 1;
        setDoneQty(done);
        if (doneQty === allQty) {
          setTodoQty(0);
        }
      } else {
        todo += 1;
        setTodoQty(todo);
        if (todoQty === allQty) {
          setDoneQty(0);
        }
      }
    });
  }, [tasks, allQty, doneQty, todoQty]);

  const onChangeValue = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTodo = () => {
    const d = new Date();
    const today = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const time = `${today}/${month}/${year}`;
    if (isOnlySpaceOrEmpty(inputValue)) {
      let newTask = [...tasks];
      let todo = {};
      todo.name = inputValue;
      todo.date = time;
      todo.status = false;
      newTask.unshift(todo);
      setTasks(newTask);
      localStorage.setItem("tasks", JSON.stringify(newTask));
      setInputValue("");
    } else {
      setInputValue("");
    }
  };

  const deteleTodo = (item) => {
    let cloneData = [...tasks];
    let currentItem = tasks.indexOf(item);
    cloneData.splice(currentItem, 1);
    setTasks(cloneData);
    localStorage.setItem("tasks", JSON.stringify(cloneData));
  };

  const deleteDoneTask = () => {
    let cloneData = [];
    tasks.map((item) => {
      if (item.status === false) {
        let cloneItem = item;
        cloneData.push(cloneItem);
      }
    });
    setTasks(cloneData);
    localStorage.setItem("tasks", JSON.stringify(cloneData));
    setDoneQty(0);
  };

  const deleteAll = () => {
    setTasks([]);
    setDoneQty(0);
    setTodoQty(0);
    localStorage.setItem("tasks", JSON.stringify([]));
  };

  const onChangeTaskInfo = (item, prop) => (e) => {
    let index = tasks.indexOf(item);
    let cloneData = [...tasks];
    let cloneItem = { ...cloneData[index] };
    if (prop === "status") {
      cloneItem[prop] = !cloneItem[prop];
    } else {
      cloneItem[prop] = e.target.value;
    }
    cloneData[index] = cloneItem;
    setTasks(cloneData);
    localStorage.setItem("tasks", JSON.stringify(cloneData));
  };

  const handelClickChangeTaskInfo = (item) => {
    let index = tasks.indexOf(item);
    let cloneData = [...tasks];
    let cloneItem = { ...cloneData[index] };
    cloneItem["status"] = !cloneItem["status"];
    cloneData[index] = cloneItem;
    setTasks(cloneData);
    localStorage.setItem("tasks", JSON.stringify(cloneData));
  }

  return (
    <div className={styles.container}>
      <h2>TODO LIST</h2>
      <AddTask
        inputProps={{
          value: inputValue,
          onChange: onChangeValue,
        }}
        handelAdd={addNewTodo}
        filter={filter}
        handelFilterAll={() => setFilter("all")}
        handelFilterDone={() => setFilter("done")}
        handelFilterTodo={() => setFilter("todo")}
        all={allQty}
        done={doneQty}
        todo={todoQty}
      />
      <div className={styles.toDoListContainer}>
        {tasks.map((item, index) => {
          let filterValue;
          if (filter === "done") {
            filterValue = true;
          } else if (filter === "todo") {
            filterValue = false;
          } else {
            filterValue = "all";
          }
          return (
            <div key={index}>
              {item.status === filterValue && (
                <TodoList
                  name={item.name}
                  date={item.date}
                  status={item.status}
                  clickChangeValue={() => handelClickChangeTaskInfo(item)}
                  checkboxProps={{
                    value: item.status,
                    checked: item.status,
                    onChange: onChangeTaskInfo(item, "status"),
                  }}
                  handelDelete={() => deteleTodo(item)}
                />
              )}
              {filterValue === "all" && (
                <TodoList
                  name={item.name}
                  date={item.date}
                  status={item.status}
                  clickChangeValue={() => handelClickChangeTaskInfo(item)}
                  checkboxProps={{
                    value: item.status,
                    checked: item.status,
                    onChange: onChangeTaskInfo(item, "status"),
                  }}
                  handelDelete={() => deteleTodo(item)}
                />
              )}
            </div>
          );
        })}
        {(tasks.length < 1 || tasks === undefined) && (
          <div
            className={[styles.emptyContainer, styles.flex_column].join(" ")}
          >
            <img src={emptyFolder} width="200" height="200" alt="empty" />
            <p>Todo list is empty</p>
          </div>
        )}
      </div>
      <div
        className={[styles.flex_center, styles.marginBottom_custom].join(" ")}
      >
        <button
          className={[styles.button, styles.list_button].join(" ")}
          onClick={() => deleteDoneTask()}
        >
          Delete done tasks
        </button>
        <div style={{ width: "10px" }}></div>
        <button
          className={[styles.button, styles.list_button].join(" ")}
          onClick={() => deleteAll()}
        >
          Delete all task
        </button>
      </div>
    </div>
  );
}

export default TaskList;
