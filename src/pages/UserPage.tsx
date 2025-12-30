import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Input,
  Select,
  Tag,
  Button,
  Space,
  Card,
  Modal,
  Form,
  Checkbox,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { fetchUsers, deleteUser } from "../store/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import {
  blockUser,
  unblockUser,
  updateUserRoles,
} from "../store/slices/usersSlice";

import type { Profile, Role } from "../types/auth";
import type { RootState, AppDispatch } from "../store";
import type { SorterResult } from "antd/es/table/interface";
import type { ColumnType, TablePaginationConfig } from "antd/es/table";

const { Option } = Select;

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    data: usersRaw,
    loading,
    error,
  } = useSelector((state: RootState) => state.users);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Profile | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    sortBy: string | null;
    sortOrder: "asc" | "desc" | null;
  }>({
    sortBy: null,
    sortOrder: null,
  });
  const users = Array.isArray(usersRaw) ? usersRaw : [];

  const [searchText, setSearchText] = useState<string>("");
  const [blockedFilter, setBlockedFilter] = useState<string | undefined>(
    undefined
  );
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<Profile | null>(null);

  const [messageApi, contextHolder] = message.useMessage();
  const [rolesModalOpen, setRolesModalOpen] = useState(false);
  const [userForRoles, setUserForRoles] = useState<Profile | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  useEffect(() => {
    const doFetch = () => {
      let isBlocked: boolean | undefined;
      if (blockedFilter === "true") isBlocked = true;
      else if (blockedFilter === "false") isBlocked = false;

      dispatch(
        fetchUsers({
          search: searchText || undefined,
          sortBy: sortConfig.sortBy || undefined,
          sortOrder: sortConfig.sortOrder || undefined,
          isBlocked,
        })
      );
    };

    const timer = setTimeout(doFetch, 300);
    return () => clearTimeout(timer);
  }, [dispatch, searchText, sortConfig, blockedFilter]);

  const getRoleColor = (role: Role): string => {
    switch (role) {
      case "ADMIN":
        return "red";
      case "MODERATOR":
        return "gold";
      case "USER":
        return "blue";
      default:
        return "default";
    }
  };

  const showDeleteModal = (record: Profile) => {
    setUserToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    if (userToDelete) {
      dispatch(deleteUser(String(userToDelete.id)));
    }
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (record: Profile) => {
    navigate(`/app/users/${record.id}/edit`);
  };

  const showRolesModal = (record: Profile) => {
    setUserForRoles(record);
    setSelectedRoles([...record.roles]);
    setRolesModalOpen(true);
  };

  const handleRolesOk = async () => {
    if (!userForRoles) return;

    try {
      await dispatch(
        updateUserRoles({ id: String(userForRoles.id), roles: selectedRoles })
      ).unwrap();
      messageApi.success("Роли обновлены");
    } catch (err: unknown) {
      const msg = typeof err === "string" ? err : "Ошибка при обновлении ролей";
      messageApi.error(msg);
    } finally {
      setRolesModalOpen(false);
    }
  };

  const handleRolesCancel = () => {
    setRolesModalOpen(false);
  };

  const handleRoleChange = (checkedValues: Role[]) => {
    setSelectedRoles(checkedValues);
  };

  const handleBlock = (record: Profile) => {
    setUserToBlock(record);
    setBlockModalOpen(true);
  };

  const handleBlockConfirm = async () => {
    if (!userToBlock) return;

    try {
      if (userToBlock.isBlocked) {
        await dispatch(unblockUser(String(userToBlock.id))).unwrap();
        messageApi.success("Пользователь разблокирован");
      } else {
        await dispatch(blockUser(String(userToBlock.id))).unwrap();
        messageApi.success("Пользователь заблокирован");
      }
      setBlockModalOpen(false);
      setUserToBlock(null);
    } catch (err: unknown) {
      const msg =
        typeof err === "string"
          ? err
          : "Не удалось изменить статус пользователя";
      messageApi.error(msg);
    }
  };

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    _filters: unknown,
    sorter: SorterResult<Profile> | SorterResult<Profile>[]
  ) => {
    if (Array.isArray(sorter)) return;

    const { columnKey, order } = sorter;

    let newSortBy: string | null = null;
    let newSortOrder: "asc" | "desc" | null = null;

    if (columnKey && (columnKey === "username" || columnKey === "email")) {
      newSortOrder =
        order === "ascend" ? "asc" : order === "descend" ? "desc" : null;
      newSortBy = newSortOrder ? (columnKey as string) : null;
    }

    if (
      newSortBy !== sortConfig.sortBy ||
      newSortOrder !== sortConfig.sortOrder
    ) {
      setSortConfig({
        sortBy: newSortBy,
        sortOrder: newSortOrder,
      });
    }
  };

  const columns: ColumnType<Profile>[] = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      sorter: true,
      sortOrder:
        sortConfig.sortBy === "username"
          ? sortConfig.sortOrder === "asc"
            ? "ascend"
            : "descend"
          : undefined,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      sortOrder:
        sortConfig.sortBy === "email"
          ? sortConfig.sortOrder === "asc"
            ? "ascend"
            : "descend"
          : undefined,
    },
    { title: "Дата регистрации", dataIndex: "date", key: "date" },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Role[]) => (
        <Space size={4}>
          {roles.map((role) => (
            <Tag color={getRoleColor(role)} key={role}>
              {role.toLowerCase()}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Статус",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) => (
        <Tag color={isBlocked ? "error" : "success"}>
          {isBlocked ? "Заблокирован" : "Активен"}
        </Tag>
      ),
    },
    { title: "Телефон", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Действия",
      key: "actions",
      render: (_: unknown, record: Profile) => (
        <Space size="small">
          <Button size="small" onClick={() => handleEdit(record)}>
            Профиль
          </Button>

          <Button
            size="small"
            type={record.isBlocked ? "default" : "dashed"}
            danger={!record.isBlocked}
            onClick={() => handleBlock(record)}
          >
            {record.isBlocked ? "Разблокировать" : "Заблокировать"}
          </Button>

          <Button size="small" onClick={() => showRolesModal(record)}>
            Роли
          </Button>

          <Button size="small" danger onClick={() => showDeleteModal(record)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div style={{ padding: "24px", width: "1550px", margin: "0 auto" }}>
        <Card
          title="Управление пользователями"
          extra={
            <Space>
              <Input
                placeholder="Поиск по имени или email"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={(e) => e.preventDefault()}
                style={{ width: 250 }}
              />
              <Select
                placeholder="Все пользователи"
                style={{ width: 180 }}
                allowClear
                value={blockedFilter}
                onChange={(value) => setBlockedFilter(value || undefined)}
              >
                <Option value="Все пользователи">Все пользователи</Option>
                <Option value="false">Только активные</Option>
                <Option value="true">Только заблокированные</Option>
              </Select>
            </Space>
          }
        >
          <Table<Profile>
            dataSource={users}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 20 }}
            locale={{
              emptyText: error
                ? `Ошибка: ${error}`
                : loading
                ? "Загрузка..."
                : "Пользователи не найдены",
            }}
            loading={loading && users.length === 0}
            onChange={handleTableChange}
          />
        </Card>
      </div>

      <Modal
        title="Подтверждение удаления"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Да, удалить"
        okType="danger"
        cancelText="Отмена"
      >
        {userToDelete && (
          <p>
            Вы уверены, что хотите удалить пользователя "{userToDelete.username}
            "? Это действие нельзя отменить.
          </p>
        )}
      </Modal>

      <Modal
        title={`Роли: ${userForRoles?.username || ""}`}
        open={rolesModalOpen}
        onOk={handleRolesOk}
        onCancel={handleRolesCancel}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form layout="vertical">
          <Form.Item label="Выберите роли">
            <Checkbox.Group
              options={[
                { label: "Администратор", value: "ADMIN" },
                { label: "Модератор", value: "MODERATOR" },
                { label: "Пользователь", value: "USER" },
              ]}
              value={selectedRoles}
              onChange={handleRoleChange}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          userToBlock?.isBlocked
            ? "Разблокировать пользователя?"
            : "Заблокировать пользователя?"
        }
        open={blockModalOpen}
        onOk={handleBlockConfirm}
        onCancel={() => {
          setBlockModalOpen(false);
          setUserToBlock(null);
        }}
        okText={userToBlock?.isBlocked ? "Разблокировать" : "Заблокировать"}
        okType={userToBlock?.isBlocked ? "primary" : "danger"}
        cancelText="Отмена"
      >
        {userToBlock && (
          <p>
            Вы уверены, что хотите{" "}
            {userToBlock.isBlocked ? "разблокировать" : "заблокировать"}{" "}
            пользователя <b>{userToBlock.username}</b>?
          </p>
        )}
      </Modal>
    </>
  );
};

export default UsersPage;
