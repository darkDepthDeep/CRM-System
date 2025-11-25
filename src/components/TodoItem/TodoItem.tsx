import React from "react";

import { useState } from "react";
import { updateTask, deleteTask } from "../../api/http";
import {
  Input,
  Form,
  message,
  Checkbox,
  Button,
  Space,
  Typography,
  List,
} from "antd";
import { validationTaskTitle } from "../../validations/todos";
import {
  SaveOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import type { TodoItemProps } from "../../types/types";

import styles from "./TodoItem.module.css";

const TodoItem: React.FC<TodoItemProps> = ({ item, getTasks }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [showMessage, messagePlace] = message.useMessage();

  const handleChange = async (): Promise<void> => {
    try {
      await updateTask(item.id, {
        title: item.title,
        isDone: !item.isDone,
      });

      await getTasks();
    } catch (error) {
      console.error(error);
      showMessage.error("Что то пошло не так, попробуйте позже!");
    }
  };

  const handleStartEdit = (): void => {
    form.setFieldValue("title", item.title);
    setIsEditMode(true);
  };

  const handleCancelEdit = (): void => {
    setIsEditMode(false);
    form.resetFields();
  };

  const handleSaveEdit = async (values: { title: string }): Promise<void> => {
    try {
      await updateTask(item.id, {
        title: values.title.trim(),
        isDone: item.isDone,
      });

      await getTasks();
      setIsEditMode(false);
    } catch (error: unknown) {
      console.error(error);
      showMessage.error("Что то пошло не так, попробуйте позже!");
    }
  };

  const handleDeleteTask = async (): Promise<void> => {
    try {
      await deleteTask(item.id);
      await getTasks();
    } catch (error: unknown) {
      console.error(error);
      showMessage.error("Что то пошло не так, попробуйте позже!");
    }
  };

  return (
    <List.Item className={styles["tabs-body__list"]}>
      <Space.Compact className={styles["tabs-body__wrap-input"]}>
        <Checkbox
          checked={item.isDone}
          onChange={handleChange}
          className={`${isEditMode ? styles["tabs-body__input-checkbox"] : ""}`}
        />
        {isEditMode ? (
          <>
            {messagePlace}
            <Form
              form={form}
              onFinish={handleSaveEdit}
              autoComplete="off"
              initialValues={{ title: item.title }}
            >
              <Form.Item name="title" rules={validationTaskTitle}>
                <Input
                  placeholder="Введите текст"
                  variant="borderless"
                  className={`${styles["tabs-body__input-text"]} ${
                    isEditMode ? styles["tabs-body__input-text--visible"] : ""
                  }`}
                />
              </Form.Item>

              <Space size="small">
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  size="small"
                />

                <Button
                  icon={<CloseOutlined />}
                  onClick={handleCancelEdit}
                  size="small"
                />
              </Space>
            </Form>
          </>
        ) : (
          <>
            <Typography.Text
              className={styles["tabs-body__text"]}
              style={{
                textDecoration: item.isDone ? "line-through" : "none",
                color: item.isDone ? "rgb(164,164,166)" : "unset",
              }}
            >
              {item.title}
            </Typography.Text>
            <Space className={styles["tabs-body__wrap-btn"]}>
              <Button
                icon={<EditOutlined style={{ color: "#0000ff" }} />}
                onClick={handleStartEdit}
                type="text"
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={handleDeleteTask}
                size="small"
                type="text"
                danger
              />
            </Space>
          </>
        )}
      </Space.Compact>
    </List.Item>
  );
};

export default React.memo(TodoItem);
