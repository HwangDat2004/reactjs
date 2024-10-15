import { useQuery } from '@tanstack/react-query';
import { Popconfirm, Skeleton, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react'

const ProductList = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/products')
            return res.data.map((product) => ({...product, key: product.id}))
        }
    });
    const handleDelete = async (productId) => {
        await axios.delete(`http://localhost:3000/products/${productId}`);
        window.location.reload();
    }
      const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Image',
          dataIndex: 'thumbnail',
          key: 'thumbnail',
          render: (thumbnail) => <img src={thumbnail} width={100} alt=""/>
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, product) => (
            <Space size="middle">
              <Link to={`/edit/${product.id}`}>Edit</Link>
              <Popconfirm
                title="Are you sure to delete this product?"
                onConfirm={() => handleDelete(product.id)}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          ),
        },
      ];
      if (isLoading) {
        return <Skeleton active />;
      }
      if (isError) {
        return <div>{error.message}</div>
      }
      return <>
      <Link to={'/add'}>Them san pham</Link>
          <h2>Danh sach san pham</h2>
         <Table dataSource={data} columns={columns} />;
      </>
}

export default ProductList