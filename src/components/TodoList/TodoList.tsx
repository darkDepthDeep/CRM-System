import React from "react";
import TodoItem from "../TodoItem/TodoItem";

import {List, Spin, Space, Typography} from 'antd';
import type { TodoListProps } from "../../types/types";

import styles from "./TodoList.module.css";

 const TodoList: React.FC<TodoListProps> = ({
  tasks,
  active,
  getTasks,
  loading,
}) => {
  return (
    <List className={`${styles["tabs-body"]} ${active ? styles["active"] : ""}`}>
      {loading ? (
          <Space>
            <Spin size="large"></Spin> 
            <Typography.Text style={{marginLeft: "5px"}}>Загрузка данных...</Typography.Text>
          </Space>
      ) : (
        tasks?.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            getTasks={getTasks}
          />
        ))
      )}
    </List>
  );
}

export default React.memo(TodoList);