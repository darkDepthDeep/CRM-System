import React from "react";

import { addTask } from "../../api/http";
import { Form, Input, Button, message } from "antd";
import type { AddTaskProps } from "../../types/types";
import { validationTaskTitle } from "../../validations/todos";

import styles from "./AddTask.module.css";

const AddTask: React.FC<AddTaskProps> = ({ getTasks }) => {
  const [form] = Form.useForm();
  const [showMessage, messagePlace] = message.useMessage();

  const handleSubmitTodo = async (values: { title: string }): Promise<void> => {
    try {
      await addTask(values.title.trim());
      await getTasks();
      form.resetFields();
    } catch (error) {
      showMessage.error(`Что-то пошло не так, попробуйте позже. ${error}`);
    }
  };

  return (
    <>
      {messagePlace}
      <Form form={form} layout="inline" onFinish={handleSubmitTodo}>
        <Form.Item
          name="title"
          rules={validationTaskTitle}
          style={{ marginInlineEnd: 0, maxWidth: "220px" }}
        >
          <Input
            placeholder="Task To Be Done..."
            variant="underlined"
            className={styles["add-task__input"]}
          />
        </Form.Item>

        <Form.Item style={{ marginInlineEnd: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles["add-task__btn"]}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default React.memo(AddTask);
