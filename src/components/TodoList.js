import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoList.module.scss";

function TodoList(props) {
  const { checkboxProps } = props;

  const active = {
    color: "#DC3445",
    textDecoration: "line-through",
  };

  return (
    <div
      className={[styles.tr_custom, styles.flex_center].join(" ")}
      key={props.key}
    >
      <input type="checkbox" className={styles.checkbox} {...checkboxProps} />
      <div style={{flex: 1}}>
        <p
          className={[styles.tagTitle].join(" ")}
          style={props.status === true ? active : null}
        >
          {props.name}
          <span className={[styles.date].join(" ")}>{" " + props.date}</span>
        </p>
      </div>
      <div className={[styles.flex_center].join(" ")}>
        <div
          className={[styles.btnContainer, styles.iconDelete].join(" ")}
          onClick={props.handelDelete}
        >
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  );
}

TodoList.propTypes = {
  checkboxProps: PropTypes.object,
};

export default TodoList;
