import { Flex, Form, Input, Button, message, Typography } from "antd";
import { validationPassword, validationLogin } from "../../validations/auth";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";
import type { AuthData } from "../../types/auth";
import type { RootState, AppDispatch } from "../../store";

import styles from "./AuthForm.module.css";

const { Title, Text, Link } = Typography;

const AuthForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmitAuthUser = async (values: AuthData) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      form.resetFields();
      navigate("/app/profile", { replace: true });
    } catch (error) {
      if (typeof error === "string") {
        messageApi.error(error);
      } else {
        messageApi.error("Не удалось войти. Попробуйте позже.");
      }
    }
  };

  return (
    <div className={styles["auth"]}>
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <div className={styles["auth__container"]}>
          <Title className={styles["auth__title"]}>Добро пожаловать!</Title>
        </div>

        {contextHolder}
        <Form
          className={styles["auth__form"]}
          name="basic"
          autoComplete="off"
          form={form}
          onFinish={handleSubmitAuthUser}
        >
          <Title level={2}>Войдите в свою учетную запись</Title>
          <Text style={{ display: "block", marginBottom: "10px" }}>
            Для использования нашего приложения!
          </Text>
          <Form.Item
            label="Login"
            name="login"
            layout="vertical"
            rules={validationLogin}
          >
            <Input placeholder="My login..." />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            layout="vertical"
            rules={validationPassword}
          >
            <Input.Password placeholder="******************" type="password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["auth__button"]}
              loading={loading}
            >
              Войти
            </Button>
          </Form.Item>
          <Text>
            Нет аккаунта?{" "}
            <Link onClick={() => navigate("/registration")}>
              Зарегистрироваться
            </Link>
          </Text>
        </Form>
      </Flex>
    </div>
  );
};

export default AuthForm;
