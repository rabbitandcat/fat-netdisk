import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import './index.scss'
import { login, register } from '../../api/user';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [isLoginPage, setIsLoginPage] = React.useState(true)

    const onFinish = async (values: any) => {
        if(isLoginPage) {
            try {
                const res: any = await login(values)
                if(res.status == 200) {
                    message.success('登录成功')
                    localStorage.setItem('token', res.token)
                    navigate('/')
                } else {
                    message.error(res.message)
                }
            } catch (e: any) {
                message.error('登录失败，出现未知错误')
            }
        } else {
            try {
                const res: any = await register(values)
                message.success('注册成功,请切换至登录界面登录') 
            } catch (e: any) {
                message.error('注册失败')
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page">
            {isLoginPage ?
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
                    <div className="toggle" onClick={() => {setIsLoginPage(false)}}>切换到注册</div>
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                        className={'login-form-username'}
                    >
                        <Input className={'login-form-username-input'} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
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
                :
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
                    <div className="toggle" onClick={() => {setIsLoginPage(true)}}>切换到登录</div>
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                        className={'login-form-username'}
                    >
                        <Input className={'login-form-username-input'} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                        className={'login-form-password'}

                    >
                        <Input.Password className={'login-form-password-input'} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" className='input-btn'>
                            注册
                        </Button>
                    </Form.Item>
                </Form>


            }


        </div>
    )
}

export default LoginPage