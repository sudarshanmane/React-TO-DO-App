import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router";

const CreateToDo = () => {
  const [form] = Form.useForm();

  const { index } = useParams();

  useEffect(() => {
    if (index) {
      const updateList = JSON.parse(localStorage.getItem("list"));
      form.setFieldsValue(updateList[[index]]);
    }
  }, [index, form]);

  useEffect(() => {
    if (!index) {
      form.setFieldsValue({ days: "Every Day" });
    }
  }, [form, index]);

  const onFinish = (values) => {
    const localList = JSON.parse(localStorage.getItem("list")) || [];

    if (index) {
      localList[index] = {
        task: values.task,
        days: values.days.includes(",")
          ? values.days.split(",")
          : [values.days],
        status: false,
      };
    } else {
      localList.push({
        task: values.task,
        days: values.days.split(","),
        status: false,
      });
    }

    localStorage.setItem("list", JSON.stringify(localList));
    form.resetFields();
  };

  return (
    <div>
      <div className="mt-3">
        <div className="mb-3">
          <div>
            <span className="text-black text-lg font-semibold">
              Create Task
            </span>
          </div>
          <div className="border-b mt-1 b-2 border-black"></div>
        </div>
      </div>
      <div>
        <Form onFinish={onFinish} form={form}>
          <div className="flex flex-wrap gap-3 w-full justify-center">
            <Form.Item name={"task"}>
              <Input className="w-96" placeholder="Enter Task"></Input>
            </Form.Item>
            <Form.Item name={"days"}>
              <Input className="w-96" placeholder="Enter days"></Input>
            </Form.Item>
            <Form.Item name={"to_do"}>
              <Button
                type="default"
                htmlType="submit"
                className="bg-green-400 text-black font-semibold"
              >
                CREATE
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateToDo;
const FormItem = Form.Item;
