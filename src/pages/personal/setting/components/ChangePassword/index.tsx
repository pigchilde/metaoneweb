import { connect } from 'dva';
import styles from './index.scss';
import { useIntl } from 'umi';
import { Form, Input, message, Button } from 'antd';
import Cookies from 'js-cookie';
import { useState } from 'react';
interface objectT {
  [propName: string]: any;
}
const ChangePassword = (props: objectT) => {
  const { dispatch, closeModal } = props;
  const intl = useIntl();
  const [form] = Form.useForm();
  const [isSubmit, setSubmit] = useState(false as boolean);
  const onFinish = (values: any) => {
    if (isSubmit) {
      message.error(
        intl.formatMessage({
          id: 'SETTING_SUBMIT_TIP',
        }),
      );
      return '';
    }
    setSubmit(true);
    dispatch({
      type: 'setting/changePassword',
      payload: { data: values },
    }).then((res: objectT) => {
      const { code, data = [] } = res;
      if (code === 0) {
        // message;
        message.success(res.msg);
        setTimeout(() => {
          dispatch({
            type: 'setting/siginOut',
            payload: {},
          }).then((res: objectT) => {
            const { code, data = [] } = res;
            if (code === 0) {
              Cookies.remove('token');
              window.location.href = '//' + window.location.host + '/login';
            } else {
              message.error(res.msg);
            }
          });
        }, 500);
        // setRegionData(data);
      } else {
        message.error(res.msg);
      }
      setSubmit(false);
    });
  };
  return (
    <div className={styles.changePop}>
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label={intl.formatMessage({
            id: 'SETTING_CURRENT',
          })}
          name="oldPassword"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'SETTING_CURRENT_TIPS',
              }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: 'SETTING_CURRENT_TIPS',
            })}
          />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            id: 'SETTING_PASSWORD',
          })}
          name="newPassword"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'SETTING_PASSWORD_TIPS',
              }),
            },

            {
              pattern:
                /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{7,20}$/,
              message: intl.formatMessage({
                id: 'REGISTER_PASSWORD_TIP3',
              }),
            },
          ]}
        >
          <Input.Password
            placeholder={intl.formatMessage({
              id: 'SETTING_PASSWORD_TIPS',
            })}
          />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            id: 'SETTING_REPASSWORD',
          })}
          name="confirmNewPassowrd"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'SETTING_REPASSWORD_TIPS',
              }),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    intl.formatMessage({
                      id: 'SETTING_REPASSWORD_TIPS1',
                    }),
                  ),
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder={intl.formatMessage({
              id: 'SETTING_REPASSWORD_TIPS',
            })}
          />
        </Form.Item>
        <Form.Item name="name" label="">
          <div className={styles['btns']}>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({
                id: 'SETTING_SUBMIT',
              })}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default connect(({ setting }: { setting: objectT }) => ({
  setting,
}))(ChangePassword);
