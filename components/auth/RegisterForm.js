// Render Prop
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth/authContext"
import AuthContextHOC from "./AuthContextHOC"
import { Form, Input, Button, Alert, Spin } from "antd"
import {
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
  MailOutlined,
} from "@ant-design/icons"
import Link from "next/link"

import { Typography } from "antd"
import Router from "next/router"

function RegisterForm() {
  const { Title, Text } = Typography
  const [form] = Form.useForm()
  const [, forceUpdate] = useState() // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const { loginUser, state, authReset, registerUser } = useContext(AuthContext)
  const { loading, token, error, errResponse } = state

  useEffect(() => {
    if (token) {
      Router.push("/dashboard")
    }
  }, [token])

  const onFinish = (values) => {
    registerUser(values)
  }

  const onFinishFailed = (errorInfo) => {}
  const onClose = () => {
    authReset()
  }

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
  )

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

        <Title level={2}>Welcome To Price Tracker</Title>

        <Text>Register here to start tracking prices like an OG</Text>
        {error ? (
          <Alert
            message={errResponse}
            type="error"
            closable
            onClose={onClose}
            showIcon
          />
        ) : null}

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
            placeholder="username"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password1"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value.length >= 8) {
                  return Promise.resolve()
                }

                return Promise.reject(
                  "The Password has to be 8 characters long"
                )
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter Password" />
        </Form.Item>

        <Form.Item
          name="password2"
          dependencies={["password1"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password1") === value) {
                  return Promise.resolve()
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                )
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
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
                  .length ||
                loading
              }
              onClick={() => authReset()}
            >
              {" "}
              {loading ? <Spin indicator={antIcon} /> : " Log in"}
            </Button>
          )}
        </Form.Item>

        <Link href="/login/">
          <a>
            <Text className="link-text">Already have an account? Sign in</Text>
          </a>
        </Link>
      </Form>
    </>
  )
}

export default AuthContextHOC(RegisterForm)
