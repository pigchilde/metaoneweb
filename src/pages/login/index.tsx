import styles from './index.scss';
import { useIntl } from 'umi';
import { Form, Input, Button } from 'antd';

const Login = () => {
  const intl = useIntl();
  const onFinish = (values: any) => {};
  const onFinishFailed = (errorInfo: any) => {};
  return (
    <div className={styles['login-page']}>
      <header className={styles['login-head']}>
        <h1>Login</h1>
        <p>WELCOME BACK</p>
      </header>
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: 'Please input your Your Email' }]}
        >
          <Input placeholder="Your Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Your Password" />
        </Form.Item>
        <Form.Item>
          <a href="/login/password">Forgot password?</a>
          <a className={styles['resgister']} href="/register">
            Sign Up
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className={styles['form-submit']}
          >
            Sign I
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
