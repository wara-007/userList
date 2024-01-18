import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { addNewuser, updateuser, deleteuser } from "../redux/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { Table, Button, Input, Card, Space, Col, Row, Modal } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
  id: React.Key;
  key: React.Key;
  name: string;
  email: string;
  age: string;
  address: string;
}

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const AddUser = () => {
  const modalAddButton = useDisclosure();
  const modalDeleteButton = useDisclosure();
  const modalErrorButton = useDisclosure();

  const userList = useAppSelector((state) => state.user.userList);
  const initialRef = React.useRef(null);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [ids, setId] = useState<string | undefined>("");
  const [list, setList] = useState<any | undefined>(userList);
  const [isModalError, setIsModalError] = useState(false);

  const [selectedId, setSelectedId] = useState<any | undefined>();

  useEffect(() => {
    setList(userList)
  }, [userList])


  const handleOnSubmit = () => {
    if (ids) {
      modalAddButton.onClose();
      dispatch(updateuser({ email, name, id: ids }));
      clearInputs();
      return;
    } else {
      if (name && email) {
        const userData = {
          id: uuidv4(),
          name,
          email,
        };
        let oldData =
          JSON.parse(localStorage.getItem("userData") as string) || [];

        localStorage.setItem(
          "userData",
          JSON.stringify([...oldData, userData])
        );
        dispatch(addNewuser(userData));
        clearInputs();
        modalAddButton.onClose();
      } else {
        modalErrorButton.onOpen();
      }
    }
  };

  const openDeleteAlert = (id: any) => {
    showModal();
    setSelectedId(id);
    modalDeleteButton.onOpen();
  };

  const something = (event: any) => {
    if (event.keyCode === 13) {
      handleOnSubmit();
    }
  };

  const editData = (user: any) => {
    setName(user.name);
    setEmail(user.email);
    setId(user.id);
    return;
  };

  const handleDelete = (id: any) => {
    dispatch(deleteuser(selectedId));
    handleOk()
    clearInputs();
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setId("");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: '',
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <>
          <IconButton
            color="#fff"
            backgroundColor={"blackAlpha.600"}
            aria-label=""
            icon={<EditIcon />}
            marginRight="1rem"
            onClick={() => editData(record)}
          />
          <IconButton
            color="#1a202c"
            backgroundColor={"whitesmoke"}
            border={"1px solid"}
            aria-label=""
            icon={<DeleteIcon />}
            onClick={() => openDeleteAlert(record.id)} />
        </>
      ),
    }
  ];


  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const showModal = () => {
    setIsModalError(true);
  };

  const handleOk = () => {
    setIsModalError(false);
  };

  const handleCancel = () => {
    setIsModalError(false);
  };

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="Name" size="small">
          <Row>
            <Col span={24}>
              <Input
                onKeyDown={(e) => something(e)}
                ref={initialRef}
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.currentTarget.value)} />
            </Col>
          </Row>
        </Card>

        <Card title="E mail" size="small">
          <Row>
            <Col span={24}>
              <Input
                onKeyDown={(e) => something(e)}
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.currentTarget.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: '15px' }}>
            <Col span={6} offset={6}>
            </Col>
            <Col span={6} offset={6}>
              <Button type="primary" onClick={handleOnSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Card>
        <Card title="List" size="small">
          <Table columns={columns} dataSource={list} onChange={onChange} />
        </Card>
      </Space>


      <Modal title=" Delete Customer" open={isModalError} onOk={handleDelete} onCancel={handleCancel}>
        <p> Are you sure? You want to delete this data.</p>
      </Modal>


    </div>
  );
};

export default AddUser;
