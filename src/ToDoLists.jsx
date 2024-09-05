import { DeleteFilled, DeleteOutlined, EditFilled } from "@ant-design/icons";
import { render } from "@testing-library/react";
import { Button, Checkbox, Divider, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ToDoLists = () => {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );

  const navigate = useNavigate();

  const handleChange = (status, index) => {
    status = status.target.checked;

    const localList = JSON.parse(localStorage.getItem("list"))[index];
    localList.status = status;

    const updateList = list;
    updateList[index] = localList;

    localStorage.setItem("list", JSON.stringify(updateList));
  };

  const handleDelete = (index) => {
    const updateList = JSON.parse(localStorage.getItem("list"));
    updateList.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(updateList));
    window.location.reload();
  };

  const handleEdit = (index) => {
    navigate("/create-to-do/" + index);
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      render: (el) => {
        let list = el.split(",").map((e, index) => {
          return (
            <span
              className="p-1 bg-teal-700   rounded-full px-3 text-white capitalize"
              key={e}
            >
              {e}
            </span>
          );
        });
        return <div className="flex flex-wrap gap-y-1 gap-1">{list}</div>;
      },
    },
    {
      title: "Days",
      dataIndex: "days",
      render: (el) => {
        let list = [];
        if (el.length) {
          list = el.map((e, index) => {
            return (
              <span
                className="p-1 bg-teal-700  rounded-full px-3 capitalize"
                style={{ background: "#13c2c2" }}
                key={e}
              >
                {e}
              </span>
            );
          });
        }
        return <div className="flex flex-wrap gap-y-1 gap-1">{list}</div>;
      },
    },
    {
      title: "Status",
      render: (el) => {
        return (
          <Checkbox
            onChange={(val) => handleChange(val, el.index)}
            key={el}
            defaultChecked={el.status}
          >
            Status
          </Checkbox>
        );
      },
      dataIndex: "status",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (index) => {
        return (
          <div className="flex gap-1">
            <Button
              onClick={() => handleEdit(index)}
              className="bg-red-500 hover:text-black text-white"
            >
              <EditFilled></EditFilled>
            </Button>
            <Button
              onClick={() => handleDelete(index)}
              className="bg-red-500 hover:text-black text-white"
            >
              <DeleteFilled></DeleteFilled>
            </Button>
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    if (list.length) {
      const newList = list.map((el, index) => {
        return {
          key: index,
          ...el,
          status: { status: el.status, index },
          delete: index,
        };
      });
      setData(() => newList);
    }
  }, [list]);

  const handleClearStatus = () => {
    const localList = JSON.parse(localStorage.getItem("list"));

    for (const el of localList) {
      el.status = false;
    }

    localStorage.setItem("list", JSON.stringify(localList));

    window.location.reload();
  };

  return (
    <div className="mt-3">
      <div className="mb-3">
        <div className="flex justify-between ">
          <span className="text-black text-lg font-semibold">
            Daily To Do List{" "}
          </span>
          <Button
            onClick={handleClearStatus}
            className="bg-green-400 font-semibold"
          >
            Clear Tasks
          </Button>
        </div>

        <div className="border-b mt-1 b-2 border-black"></div>
      </div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  );
};

export default ToDoLists;
