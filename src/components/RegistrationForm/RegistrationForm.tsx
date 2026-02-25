import styles from "./RegistrationForm.module.css";
import { Flex, Form, Input, Button, message, Typography } from "antd";
import {
  validationUserName,
  validationLogin,
  validationPassword,
  validationConfirmPassword,
  validationEmail,
  validationPhone,
} from "../../validations/auth";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetRegistration,
} from "../../store/slices/registrationSlice";
import type { UserRegistration } from "../../types/auth";
import type { RootState, AppDispatch } from "../../store/index";
import { useEffect } from "react";

const { Title, Text, Link } = Typography;

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success } = useSelector(
    (state: RootState) => state.registration
  );
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    return () => {
      dispatch(resetRegistration());
    };
  }, [dispatch]);

  const handleSubmitRegisterUser = async (values: {
    username: string;
    login: string;
    password: string;
    confirmPassword: string;
    email: string;
    phone?: string;
  }) => {
    const userData: UserRegistration = {
      login: values.login,
      username: values.username,
      password: values.password,
      email: values.email,
      phoneNumber: values.phone || "",
    };

    try {
      await dispatch(registerUser(userData)).unwrap();
      form.resetFields();
    } catch (error) {
      if (typeof error === "string") {
        messageApi.error(error);
      } else {
        messageApi.error("Не удалось зарегистрироваться. Попробуйте позже.");
      }
    }
  };

  if (success) {
    return (
      <div className={styles["registr-success"]}>
        <div className={styles["registr-success__wrapper"]}>
          <Text className={styles["registr-success__title"]}>
            Регистрация прошла успешно!
          </Text>
          <Text>
            <Link
              onClick={() => navigate("/auth", { replace: true })}
              className={styles["registr-success__text"]}
            >
              Перейти на страницу авторизации для входа в систему!
            </Link>
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["registr"]}>
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <div className={styles["registr__container"]}>
          <Title className={styles["registr__title"]}>Добро пожаловать!</Title>
        </div>

        {contextHolder}
        <Form
          className={styles["registr__form"]}
          name="registration"
          autoComplete="off"
          form={form}
          onFinish={handleSubmitRegisterUser}
        >
          <Title level={2}>Зарегистрируйтесь в своей учетной записи</Title>
          <Text style={{ display: "block", marginBottom: "10px" }}>
            Присоединяйтесь к нам!
          </Text>
          <Form.Item
            label="Username"
            name="username"
            layout="vertical"
            rules={validationUserName}
          >
            <Input placeholder="My username..." />
          </Form.Item>

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

          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            layout="vertical"
            dependencies={["password"]}
            rules={validationConfirmPassword}
          >
            <Input.Password placeholder="******************" type="password" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            layout="vertical"
            rules={validationEmail}
          >
            <Input placeholder="email@email.com" type="email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            layout="vertical"
            rules={validationPhone}
          >
            <Input
              placeholder="+7-999-999-99-99 необязательное поле"
              type="tel"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Создать аккаунт
            </Button>
          </Form.Item>
          <Text>
            Есть аккаунт? <Link onClick={() => navigate("/auth")}>Войти</Link>
          </Text>
        </Form>
      </Flex>
    </div>
  );
};

export default RegistrationForm;
