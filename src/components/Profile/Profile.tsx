import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Spin, Card, Button, message, Tag } from "antd";
import { logout } from "../../store/slices/authSlice";
import { fetchProfile, clearProfile } from "../../store/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../store";
import type { Role } from "../../types/auth";
import { ROUTES } from "../../const/routes";
import {
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.profile
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
    messageApi.success("Вы вышли из аккаунта");
    navigate(ROUTES.AUTH, { replace: true });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red", padding: "20px" }}>
        Ошибка загрузки профиля: {error}
      </div>
    );
  }

  if (!data) {
    return <div>Профиль не найден</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {contextHolder}

      <Card>
        <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
          {" "}
          Мой профиль{" "}
        </Title>

        <div style={{ marginBottom: "16px" }}>
          <Text strong>Имя пользователя:</Text> <Text>{data.username}</Text>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <MailOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          <Text strong>Email:</Text> <Text>{data.email}</Text>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <PhoneOutlined style={{ marginRight: "8px", color: "#52c41a" }} />
          <Text strong>Телефон:</Text>{" "}
          <Text>{data.phoneNumber || "Не указан"}</Text>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <Text strong>Роли:</Text>{" "}
          {data.roles.map((role: Role) => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          ))}
        </div>

        <div style={{ marginBottom: "24px" }}>
          <Text strong>Статус:</Text>{" "}
          {data.isBlocked ? (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Заблокирован
            </Tag>
          ) : (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Активен
            </Tag>
          )}
        </div>

        <Button type="primary" danger block onClick={handleLogout}>
          Выйти из аккаунта
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
