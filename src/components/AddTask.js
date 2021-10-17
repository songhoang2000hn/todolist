import React from "react";
import PropTypes from "prop-types";
import styles from "./AddTask.module.scss";

function AddTask(props) {
  const { inputProps } = props;
  const active = {
    backgroundColor: "#16A3B7",
  };
  return (
    <>
      <form className={styles.container} onSubmit={props.handelAdd}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          placeholder="Enter here..."
          {...inputProps}
        />
        <button className={styles.button} type="submit">
          Add New
        </button>
      </form>
      <div
        className={[styles.flex_center, styles.marginBottom_custom].join(" ")}
      >
        <button
          className={[styles.button, styles.list_button].join(" ")}
          style={props.filter === "all" ? active : null}
          onClick={props.handelFilterAll}
        >
          All - {props.all} tasks
        </button>
        <button
          className={[styles.button, styles.list_button].join(" ")}
          style={props.filter === "done" ? active : null}
          onClick={props.handelFilterDone}
        >
          Done - {props.done} tasks
        </button>
        <button
          className={[styles.button, styles.list_button].join(" ")}
          style={props.filter === "todo" ? active : null}
          onClick={props.handelFilterTodo}
        >
          Todo - {props.todo} tasks
        </button>
      </div>
    </>
  );
}
AddTask.propTypes = {
  inputProps: PropTypes.object,
};

export default AddTask;
