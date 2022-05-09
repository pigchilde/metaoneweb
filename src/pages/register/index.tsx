import styles from './index.scss';
import { useIntl } from 'umi';
import { Tabs } from 'antd';
import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { connect } from 'dva';
const { TabPane } = Tabs;
interface objectT {
  [propName: string]: any;
}
const Register = (props: objectT) => {
  const { location = {}, dispatch, news = {} } = props;
  const [form] = Form.useForm();
  const intl = useIntl();
  const [loading, setLoading] = useState(false as boolean);
  const [tabValues, setTabValues] = useState({
    id: 1,
    name: intl.formatMessage({
      id: 'SIGN_TAB_GAME',
    }),
    banner: intl.formatMessage({
      id: 'SIGN_TITLE1',
    }),
    bannerClass: 'sign-banner1',
  } as objectT);
  const tabDatas = [
    {
      id: 1,
      name: intl.formatMessage({
        id: 'SIGN_TAB_GAME',
      }),
      banner: intl.formatMessage({
        id: 'SIGN_TITLE1',
      }),
      bannerClass: 'sign-banner1',
    },
    {
      id: 2,
      name: intl.formatMessage({
        id: 'SIGN_TAB_GUILD',
      }),
      banner: intl.formatMessage({
        id: 'SIGN_TITLE2',
      }),
      bannerClass: 'sign-banner2',
    },
    {
      id: 3,
      name: intl.formatMessage({
        id: 'SIGN_TAB_NFT',
      }),
      banner: intl.formatMessage({
        id: 'SIGN_TITLE3',
      }),
      bannerClass: 'sign-banner3',
    },
  ];
  const tabChange = (e: string) => {
    const currentDatas = tabDatas.find((i: objectT) => i.id == e);
    setTabValues(currentDatas ? currentDatas : {});
  };
  /*提交*/
  const onFinish = (values: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    dispatch({
      type: 'register/postData',
      payload: {
        data: { ...values, registerCategory: tabValues.id + '' },
      },
    }).then((res: objectT) => {
      const { code, data, msg } = res;
      if (code === 0) {
      } else {
        message.error({
          content: msg,
          style: {
            marginTop: '20vh',
          },
        });
      }

      setLoading(false);
    });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  /*获取验证码*/
  const sendEmail = () => {
    const emailData = form.getFieldsValue(['email']);
    dispatch({
      type: 'register/postEmial',
      payload: {
        data: { code: tabValues.id + '', email: emailData.email },
      },
    }).then((res: objectT) => {
      const { code, data } = res;
      if (code === 0) {
        console.log(8897867);
      }

      setLoading(false);
    });
  };
  return (
    <div className={styles['sign-page']}>
      <div
        className={`${styles['sign-banner']} ${styles[tabValues.bannerClass]}`}
      >
        <span className={styles['img']}></span>
        <h3>{tabValues.banner}</h3>
      </div>
      <div className={styles['sign-main']}>
        <div className={styles['sign-box']}>
          <Tabs
            defaultActiveKey="1"
            onChange={tabChange}
            className={styles['tab-box']}
          >
            {tabDatas.map((i: objectT) => {
              return <TabPane tab={i.name} key={i.id}></TabPane>;
            })}
          </Tabs>
          <div className={styles['form-box']}>
            <p className={styles['tip']}>
              {intl.formatMessage({
                id: 'SIGN_TAB_GAME_TIP',
              })}
            </p>
            <Form
              form={form}
              name="register"
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              scrollToFirstError
            >
              <Form.Item
                label="nickName"
                name="nickName"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'REGISTER_NAME_TIP',
                    }),
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'REGISTER_NAME',
                  })}
                />
              </Form.Item>
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  // {
                  //   required: true,
                  //   message: intl.formatMessage({
                  //     id: 'REGISTER_EMAIL_TIP',
                  //   }),
                  // },
                  {
                    type: 'email',
                    message: intl.formatMessage({
                      id: 'REGISTER_EMAIL_TIP1',
                    }),
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'REGISTER_EMAIL',
                  })}
                />
              </Form.Item>
              <Form.Item label="verificationCode">
                <Form.Item
                  name="verificationCode"
                  rules={
                    [
                      // {
                      //   required: true,
                      //   message: intl.formatMessage({
                      //     id: 'REGISTER_VERFICATION_TIP',
                      //   }),
                      // },
                    ]
                  }
                  style={{
                    display: 'inline-block',
                    width: 'calc(100% - 136px)',
                  }}
                >
                  <Input
                    placeholder={intl.formatMessage({
                      id: 'REGISTER_VERFICATION',
                    })}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  className={styles['form-send']}
                  onClick={sendEmail}
                >
                  {intl.formatMessage({
                    id: 'REGISTER_SEND',
                  })}
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
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder={intl.formatMessage({
                    id: 'REGISTER_PASSWORD',
                  })}
                />
              </Form.Item>
              <Form.Item
                label="confirmPassword"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'REGISTER_CONFIRM_PASSWORD_TIP',
                    }),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          intl.formatMessage({
                            id: 'REGISTER_PASSWORD_TIP1',
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
                    id: 'REGISTER_CONFIRM_PASSWORD',
                  })}
                />
              </Form.Item>
              <Form.Item
                label="invitationCode"
                name="invitationCode"
                rules={
                  [
                    // {
                    //   required: true,
                    //   message: intl.formatMessage({
                    //     id: 'REGISTER_INVITATION_CODE_TIP',
                    //   }),
                    // },
                  ]
                }
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'REGISTER_INVITATION_CODE',
                  })}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles['form-submit']}
                >
                  {intl.formatMessage({
                    id: 'REGISTER_SUBMIT',
                  })}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ register }: { register: objectT }) => ({
  register,
}))(Register);
