import styles from './index.scss';
import { useIntl, history } from 'umi';
import { Tabs } from 'antd';
import { Form, Input, Button, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'dva';
const { TabPane } = Tabs;
const { Option } = Select;
interface objectT {
  [propName: string]: any;
}
const Register = (props: objectT) => {
  const { location = {}, dispatch, news = {} } = props;
  const { query = {} } = location;
  const [form] = Form.useForm();
  const intl = useIntl();
  const [loading, setLoading] = useState(false as boolean);
  const [regionData, setRegionData] = useState([] as Array<objectT>);
  const [sendEmailTxt, setSendEmailTxt] = useState({
    txt: intl.formatMessage({
      id: 'REGISTER_SEND',
    }),
    disable: false,
  } as objectT);

  //当前tab界面
  const [tabValues, setTabValues] = useState({
    id: 1,
    code: 'GAMERS',
    name: intl.formatMessage({
      id: 'SIGN_TAB_GAME',
    }),
    banner: intl.formatMessage({
      id: 'SIGN_TITLE1',
    }),
    bannerClass: 'sign-banner1',
    tips: intl.formatMessage({
      id: 'SIGN_TAB_GAME_TIP',
    }),
  } as objectT);
  //tab数据
  const [tabDatas, setTabDatas] = useState([
    {
      id: 1,
      code: 'GAMERS',
      name: intl.formatMessage({
        id: 'SIGN_TAB_GAME',
      }),
      banner: intl.formatMessage({
        id: 'SIGN_TITLE1',
      }),
      bannerClass: 'sign-banner1',
      tips: intl.formatMessage({
        id: 'SIGN_TAB_GAME_TIP',
      }),
    },
    {
      id: 2,
      code: 'GUILD',
      name: intl.formatMessage({
        id: 'SIGN_TAB_GUILD',
      }),
      banner: intl.formatMessage({
        id: 'SIGN_TITLE2',
      }),
      bannerClass: 'sign-banner2',
      tips: intl.formatMessage({
        id: 'SIGN_TAB_GAME_TIP1',
      }),
    },
    {
      id: 3,
      code: 'NFTS_OWNER',
      name: intl.formatMessage({
        id: 'SIGN_TAB_NFT',
      }),
      banner: intl.formatMessage({
        id: 'SIGN_TITLE3',
      }),
      bannerClass: 'sign-banner3',
      tips: intl.formatMessage({
        id: 'SIGN_TAB_GAME_TIP2',
      }),
    },
  ] as Array<objectT>);

  useEffect(() => {
    if (query.invitationCode) {
      form.setFieldsValue({ invitationCode: query.invitationCode });
    }
    getCuntry();
    getTabDatas();
  }, []);
  /*tab切换*/
  const tabChange = (e: string) => {
    const currentDatas = tabDatas.find((i: objectT) => i.code == e);
    setTabValues(currentDatas ? currentDatas : {});
    form.resetFields();
  };
  /*提交*/
  const onFinish = (values: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    //验证验证码
    dispatch({
      type: 'register/postCode',
      payload: {
        data: { email: values.email, code: values.verificationCode },
      },
    }).then((result: objectT) => {
      const { code: cCode, msg: cMsg } = result;
      if (cCode === 0) {
        //提交数据

        dispatch({
          type: 'register/postData',
          payload: {
            data: { ...values, registerCategory: tabValues.code },
          },
        }).then((res: objectT) => {
          const { code, data, msg } = res;
          if (code === 0) {
            history.push(`/login`);
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
      } else {
        message.error({
          content: cMsg,
          style: {
            marginTop: '20vh',
          },
        });
        setLoading(false);
      }
    });
  };
  // ;
  /*获取tab*/
  const getTabDatas = () => {
    dispatch({
      type: 'register/getCuntry',
      payload: { id: 'ROLE_REGISTER_CATEGORY' },
    }).then((res: objectT) => {
      const { code, data = [] } = res;
      if (code === 0) {
        const newArr = tabDatas.map((i: objectT) => {
          data.map((j: objectT) => {
            if (i.code === j.code) {
              i.name = j.name;
            }
            return '';
          });
          return i;
        });
        setTabDatas(newArr);
      }
    });
  };

  /*获取地区*/
  const getCuntry = () => {
    dispatch({
      type: 'register/getCuntry',
      payload: { id: 'COMMON_COUNTRY' },
    }).then((res: objectT) => {
      const { code, data = [] } = res;
      if (code === 0) {
        setRegionData(data);
      }
    });
  };

  /*获取验证码*/
  const sendEmail = () => {
    if (sendEmailTxt.disable) {
      return;
    }
    const emailData = form.getFieldsValue(['email']);
    setSendEmailTxt({ ...sendEmailTxt, disable: true });
    dispatch({
      type: 'register/postEmial',
      payload: {
        data: { code: tabValues.code, email: emailData.email },
      },
    }).then((res: objectT) => {
      const { code, data, msg } = res;
      if (code === 0) {
        const txt = intl.formatMessage({
          id: 'REGISTER_RESEND',
        });
        let count = 10;
        setSendEmailTxt({ disable: true, txt: `${txt}(${count})` });
        const timer = setInterval(() => {
          count--;
          if (count < 1) {
            clearInterval(timer);
            setSendEmailTxt({ disable: false, txt: `${txt}` });
            return;
          }
          setSendEmailTxt({ disable: true, txt: `${txt}(${count})` });
        }, 1000);
      } else {
        message.error({
          content: msg,
          style: {
            marginTop: '20vh',
          },
        });
      }
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
              return <TabPane tab={i.name} key={i.code}></TabPane>;
            })}
          </Tabs>
          <div className={styles['form-box']}>
            <p className={styles['tip']}>{tabValues.tips}</p>
            <Form
              form={form}
              name="register"
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
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
                    whitespace: true,
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
                  className={`${styles['form-send']} ${
                    sendEmailTxt.disable ? styles['form-send-disable'] : ''
                  }`}
                  onClick={sendEmail}
                >
                  {sendEmailTxt.txt}
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
              {tabValues.code === 'GAMERS' ? (
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
              ) : (
                ''
              )}
              {tabValues.code === 'GUILD' ? (
                <Form.Item
                  label="country"
                  name="country"
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
                  <Select
                    placeholder={intl.formatMessage({
                      id: 'REGISTER_REGION',
                    })}
                    allowClear
                  >
                    {regionData.map((i: objectT) => {
                      return (
                        <Option value={i.code} key={i.code}>
                          {i.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              ) : (
                ''
              )}
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
