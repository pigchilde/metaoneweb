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
      history.push('/personal/info');
    });
  };
  const onFinishFailed = (errorInfo: any) => {};
  return (
    <div className={styles['login-page']}>
      <header className={styles['login-head']}>
        <h1>{intl.formatMessage({ id: 'LOGIN' })}</h1>
        <p>{intl.formatMessage({ id: 'LOGIN_WELCOME_TEXT' })}</p>
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
          label={intl.formatMessage({ id: 'LOGIN_EMAIL' })}
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
          <Input
            placeholder={intl.formatMessage({ id: 'LOGIN_EMAIL_PLACEHOLDER' })}
          />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'LOGIN_PASSWORD' })}
          name="password"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'LOGIN_PASSWORD_TIP' }),
            },
          ]}
        >
          <Input.Password
            placeholder={intl.formatMessage({
              id: 'LOGIN_PASSWORD_PLACEHOLDER',
            })}
          />
        </Form.Item>
        <Form.Item>
          <a href="/login/password">
            {intl.formatMessage({ id: 'LOGIN_FORGOT_PASSWORD' })}?
          </a>
          <a className={styles['resgister']} href="/register">
            {intl.formatMessage({ id: 'LOGIN_SIGN_UP' })}
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
            {intl.formatMessage({ id: 'SIGN_IN' })}
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
