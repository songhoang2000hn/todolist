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
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          placeholder="Enter here..."
          {...inputProps}
        />
        <p className={styles.button} onClick={props.handelAdd}>
          Add New
        </p>
      </div>
      <div
        className={[styles.flex_center, styles.marginBottom_custom].join(" ")}
      >
        <p
          className={[styles.button, styles.list_button].join(" ")}
          style={props.filter === "all" ? active : null}
          onClick={props.handelFilterAll}
        >
          All - {props.all} tasks
        </p>
        <p
          className={[styles.button, styles.list_button].join(" ")}
          style={props.filter === "done" ? active : null}
          onClick={props.handelFilterDone}
        >
          Done - {props.done} tasks
        </p>
        <p
          className={[styles.button, styles.list_button].join(" ")}
          style={props.filter === "todo" ? active : null}
          onClick={props.handelFilterTodo}
        >
          Todo - {props.todo} tasks
        </p>
      </div>
    </>
  );
}
AddTask.propTypes = {
  inputProps: PropTypes.object,
};

export default AddTask;
