'use client';
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import {useRouter} from 'next/navigation';

const Login = () => {
    type FieldType = {
        username?: string;
        password?: string;
      };
      
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
        
    const resp = await fetch('/api/user',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: values.username,
            password: values.password,
            email: 'hardcoded@mail.com'
        }),
    })
      console.log("Response status: ",resp.status,resp.ok)
    if(resp.ok){
        router.push('/dashboard');
    }else{
        console.log("Login failed");
    }
    };
      
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
      
    const router = useRouter();

    return(
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
    </Form>
    )
};

export default Login;