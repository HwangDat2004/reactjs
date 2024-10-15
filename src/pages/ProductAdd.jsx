import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductAdd = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (product) => {
      const res = await axios.post('http://localhost:3000/products', product);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      nav('/');
    },
  })
  const onFinish = (values) => {
    mutate(values);
  };
  return (
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="title"
      name="title"
      rules={[
        {
          required: true,
          message: 'Please input your title!',
        },
        {
          min: 5,
          message: 'it nhat 5 ky tu',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="thumbnail"
      name="thumbnail"
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="price"
      name="price"
      rules={[
        {
          required: true,
          message: 'Please input your price!',
        },
        {
          type: 'number',
          min: 0,
          message: 'not am',
        },
      ]}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item
      label="description"
      name="description"
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}
  

export default ProductAdd;