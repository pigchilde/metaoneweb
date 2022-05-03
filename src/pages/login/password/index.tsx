import styles from '../index.scss';
import { useIntl } from 'umi';
import { Form, Input, Button, Checkbox } from 'antd';

const Password = () => {
  const onFinish = (values: any) => {};
  const onFinishFailed = (errorInfo: any) => {};
  return (
    <div className={styles['login-page']}>
      <header className={styles['login-head']}>
        <h1>Reset Password</h1>
      </header>
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: 'Please input your Your Email' }]}
        >
          <Input placeholder="Your Email" />
        </Form.Item>
        <Form.Item label="verificationCode">
          <Form.Item
            name="verificationCode"
            rules={[{ required: true }]}
            style={{
              display: 'inline-block',
              width: 'calc(100% - 136px)',
            }}
          >
            <Input placeholder="Verification Code" />
          </Form.Item>

          <Button type="primary" className={styles['form-send']}>
            Send
          </Button>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Your Password" />
        </Form.Item>
        <Form.Item
          label="confirmPassword"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please input your confirm Password!',
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className={styles['form-submit']}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Password;
