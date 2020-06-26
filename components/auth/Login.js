// Render Prop
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth/authContext"
import AuthContextHOC from "./AuthContextHOC"
import { Form, Input, Button, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Typography } from "antd"

function LoginForm() {
  const { Title, Text } = Typography
  const [form] = Form.useForm()
  const [, forceUpdate] = useState() // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const { loginUser } = useContext(AuthContext)

  const onFinish = (values) => {
    console.log("Success:", values)
    loginUser(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }
  return (
    <>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
        className="center-container"
      >
        <LockOutlined style={{ fontSize: "2rem", color: "#08c" }} />
        <Title level={2}>Welcome Back</Title>
        <Text>Login here using your username and password</Text>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AuthContextHOC(LoginForm)
