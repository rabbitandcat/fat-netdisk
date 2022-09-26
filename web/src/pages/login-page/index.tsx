import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import './index.scss'

const LoginPage: React.FC = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="login-form"
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    className={'login-form-username'}
                >
                    <Input className={'login-form-username-input'}/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    className={'login-form-password'}

                >
                    <Input.Password className={'login-form-password-input'} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginPage