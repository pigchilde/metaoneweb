import styles from './index.scss';
import { connect, useIntl, useHistory } from 'umi';
import { Form, Input, Button, message } from 'antd';
import { encryptedData } from '@/utils/rsaUtils';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

interface objectT {
  [propName: string]: any;
}

const Login = (props: objectT) => {
  const { dispatch, loading } = props;
  const intl = useIntl();
  const history = useHistory();

  useEffect(() => {
    // 如果没有token清楚已保存的用户信息
    const token = Cookies.get('token');
    if (!token) {
      dispatch({
        type: 'login/removeUserInfo',
      });
    }
  }, []);

  /**
   * 获取登录的用户信息
   */
  const getUserInfo = () => {
    dispatch({
      type: 'login/getUserInfo',
    });
  };

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
      message.success(msg);
      const token = `${data.tokenHead}${data.token}`;
      Cookies.set('token', token, { expires: 30 });
      getUserInfo();
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
              message: intl.formatMessage({ id: 'LOGIN_EMAIL_TIP1' }),
            },
            {
              type: 'email',
              message: intl.formatMessage({ id: 'LOGIN_EMAIL_TIP2' }),
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
            disabled={loading.global}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default connect(
  ({ login, loading }: { login: objectT; loading: objectT }) => ({
    login,
    loading,
  }),
)(Login);
