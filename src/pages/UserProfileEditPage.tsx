import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Card, Spin, message, Space } from "antd";
import { fetchUserById, updateUser } from "../store/slices/usersSlice";
import type { Profile } from "../types/auth";
import type { RootState, AppDispatch } from "../store";
import { ROUTES } from "../const/routes";
import {
  validationUserName,
  validationEmail,
  validationPhone,
} from "../validations/auth";

const UserProfileEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { selectedUser, loadingSelected, error } = useSelector(
    (state: RootState) => state.users
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        username: selectedUser.username,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber || "",
      });
    }
  }, [selectedUser, form]);

  const onFinish = async (values: Partial<Profile>) => {
    if (!id || !selectedUser) return;

    const changedValues: Partial<Profile> = {};
    if (values.username !== selectedUser.username) {
      changedValues.username = values.username;
    }
    if (values.email !== selectedUser.email) {
      changedValues.email = values.email;
    }
    if (values.phoneNumber !== selectedUser.phoneNumber) {
      changedValues.phoneNumber = values.phoneNumber;
    }

    if (Object.keys(changedValues).length === 0) {
      messageApi.info("Нет изменений для сохранения");
      return;
    }

    try {
      await dispatch(updateUser({ id, data: changedValues })).unwrap();
      messageApi.success("Данные успешно обновлены");

      setTimeout(() => {
        navigate(ROUTES.APP_USERS);
      }, 1000);
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "string"
          ? err
          : err instanceof Error
          ? err.message
          : "Неизвестная ошибка";
      messageApi.error(errorMessage);
    }
  };

  const handleGoBack = () => {
    navigate(ROUTES.APP_USERS);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      {contextHolder}

      {loadingSelected ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" tip="Загрузка профиля..." />
        </div>
      ) : error ? (
        <Card>
          <p style={{ color: "red" }}>Ошибка: {error}</p>
          <Button onClick={handleGoBack}>Вернуться к списку</Button>
        </Card>
      ) : !selectedUser ? (
        <Card>Пользователь не найден</Card>
      ) : (
        <Card
          title={`Редактирование: ${selectedUser.username}`}
          extra={
            <Button
              onClick={handleGoBack}
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              ← Вернуться к таблице
            </Button>
          }
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              username: selectedUser.username,
              email: selectedUser.email,
              phoneNumber: selectedUser.phoneNumber || "",
            }}
          >
            <Form.Item
              label="Имя пользователя"
              name="username"
              rules={validationUserName}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={validationEmail}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Телефон"
              name="phoneNumber"
              rules={validationPhone}
            >
              <Input placeholder="Не обязательно" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Сохранить изменения
                </Button>
                <Button onClick={handleGoBack}>Отмена</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default UserProfileEditPage;
