import styles from '../index.scss';
import { connect, useIntl, useHistory } from 'umi';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useEffect, useState } from 'react';

interface objectT {
  [propName: string]: any;
}

// 默认获取验证码的间隔时间(s)
const CODE_REMAIN_TIME = 60;

const Password = (props: any) => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  const intl = useIntl();
  const { getFieldError, getFieldValue } = form;
  const [codeRemainTime, setCodeRemainTime] = useState(0);
  const [canSendCode, setCanSendCode] = useState(false);
  const history = useHistory();

  /**
   * 表单验证通过时的提交
   * @param values 表单数据
   */
  const onFinish = (values: any) => {
    dispatch({
      type: 'login/resetPassword',
      payload: values,
    }).then((res: any) => {
      if (!res.code) {
        // 成功
        message.success(res.msg);
        history.push({
          pathname: '/login',
        });
      } else {
        message.error(res.msg);
      }
    });
  };

  /**
   * 处理获取验证码倒计时
   */
  const handleCountDown = () => {
    let remainTime = CODE_REMAIN_TIME;
    setCanSendCode(false);
    const timer = setInterval(() => {
      if (remainTime) {
        remainTime -= 1;
        setCodeRemainTime(remainTime);
        setCanSendCode(false);
      } else {
        setCanSendCode(true);
        clearInterval(timer);
      }
    }, 1000);
  };

  /**
   * 处理字段数据变化
   */
  const onFieldsChange = (changedValues: objectT) => {
    const { email } = changedValues;
    if (!email) {
      return;
    }
    const err = getFieldError('email');
    if (err.length) {
      setCanSendCode(false);
    } else {
      setCanSendCode(true);
    }
  };

  /**
   * 处理发送验证码
   */
  const handleSendCode = () => {
    const email = getFieldValue('email');
    if (!canSendCode || !email) {
      return;
    }
    handleCountDown();
    dispatch({
      type: 'login/sendCode',
      payload: {
        email,
      },
    }).then((res: any) => {
      if (!res.code) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };

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
        onValuesChange={onFieldsChange}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Your Email',
            },
            {
              type: 'email',
              message: 'This email address is invalid.',
            },
          ]}
        >
          <Input placeholder="Your Email" />
        </Form.Item>
        <Form.Item label="VerificationCode">
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

          <Button
            type="primary"
            className={styles['form-send']}
            disabled={!canSendCode}
            onClick={handleSendCode}
          >
            {!codeRemainTime ? 'Send' : `${codeRemainTime}s`}
          </Button>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'REGISTER_PASSWORD_TIP',
              }),
              whitespace: true,
            },
            // {
            //   min: 7,
            //   message: intl.formatMessage({
            //     id: 'REGISTER_PASSWORD_TIP2',
            //   }),
            // },
            {
              pattern:
                /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{7,20}$/,
              message: intl.formatMessage({
                id: 'REGISTER_PASSWORD_TIP3',
              }),
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Your Password" />
        </Form.Item>
        <Form.Item
          label="ConfirmPassword"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please input your confirm Password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
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
export default connect(
  ({ login, loading }: { login: objectT; loading: objectT }) => ({
    login,
    loading,
  }),
)(Password);
