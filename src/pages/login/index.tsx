import styles from './index.scss';
import { connect, useIntl, useHistory } from 'umi';
import { Form, Input, Button, message } from 'antd';
import { encryptedData } from '@/utils/rsaUtils';
import Cookies from 'js-cookie';

interface objectT {
  [propName: string]: any;
}

const Login = (props: objectT) => {
  const { dispatch } = props;
  const intl = useIntl();
  const history = useHistory();

  /**
   * 表单验证成功提交
   * @param values
   */
  const onFinish = (values: objectT) => {
    const auth = encryptedData(JSON.stringify(values));
    dispatch({
      type: 'login/login',
      payload: {
        auth,
      },
    }).then((res: objectT) => {
      const { code, msg, data } = res;
      if (code) {
        // 登录失败
        message.error(msg);
        return;
      }
      // 登录成功
      Cookies.set('token', `${data.tokenHead}${data.token}`, { expires: 30 });
      history.goBack();
    });
  };
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
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Your Email',
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
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
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default connect(({ login }: { login: objectT }) => ({
  login,
}))(Login);
