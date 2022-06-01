import styles from './index.scss';
import { useIntl } from 'umi';
import ObsUpload from './components/ObsUpload';
import ChangePassword from './components/ChangePassword';
import {
  Form,
  Input,
  Button,
  Avatar,
  Row,
  Col,
  Modal,
  Upload,
  message,
  Select,
} from 'antd';
import { connect } from 'dva';
import { SetStateAction, useEffect, useState } from 'react';
const { Option } = Select;
interface objectT {
  [propName: string]: any;
}

const Setting = (props: objectT) => {
  const { dispatch, login = {} } = props;
  const { userInfo = {} } = login;
  const { roles = [] } = userInfo;
  const intl = useIntl();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [regionData, setRegionData] = useState([] as Array<objectT>);
  const [isSubmit, setSubmit] = useState(false as boolean);
  const { TextArea } = Input;
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
      type:
        roles.length && roles[0].code === 'GUILD'
          ? 'setting/putGuildInfo'
          : 'setting/putInfo',
      payload: { data: values },
    }).then((res: objectT) => {
      const { code, data = [] } = res;
      if (code === 0) {
        message.success(
          intl.formatMessage({
            id: 'SETTING_SUCCESS',
          }),
        );
        setTimeout(() => {
          // window.location.href = window.location.href;
        }, 1000);
      } else {
        message.error(res.msg);
      }
      setSubmit(false);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  useEffect(() => {
    getCuntry();
    dispatch({
      type: 'setting/getInfo',
      payload: {},
    }).then((res: objectT) => {
      const { code, data = [] } = res;
      if (code === 0) {
        form.setFieldsValue({
          nickName: data.nickName,
          category: data.category,
          telegramId: data.telegramId,
          contacts: data.contacts,
          country: data.country,
          description: data.description,
        });
        // setRegionData(data);
      }
    });
  }, []);
  return (
    <div className={styles['setting']}>
      <Row className={styles['setting-con']}>
        <Col span={5}>
          <div className={styles['avatar']}>
            <ObsUpload userInfo={userInfo}></ObsUpload>

            <p>Edit Your Logo</p>
          </div>
        </Col>
        <Col span={19} className={styles['setting-con-item']}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item
              // name="nickName"
              label={intl.formatMessage({
                id: 'SETTING_NICKNAME',
              })}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: 'SETTING_NICKNAME_TIPS',
                })}
                value={`${userInfo.nickName} (${userInfo.username})`}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="telegramId"
              label={intl.formatMessage({
                id: 'SETTING_TELEGRAM',
              })}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: 'SETTING_TELEGRAM_TIPS',
                })}
              />
            </Form.Item>
            {roles.length && roles[0].code === 'GUILD' ? (
              <>
                <Form.Item
                  name="gameType"
                  label={intl.formatMessage({
                    id: 'SETTING_CATEGORY',
                  })}
                >
                  <Select
                    placeholder={intl.formatMessage({
                      id: 'SETTING_CATEGORY_TIPS',
                    })}
                    allowClear
                  >
                    <Option value="RPG" key="RPG">
                      RPG
                    </Option>
                    <Option value="RTS" key="RTS">
                      RTS
                    </Option>
                    <Option value="AVG" key="AVG">
                      AVG
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="contacts"
                  label={intl.formatMessage({
                    id: 'SETTING_CONTACT',
                  })}
                >
                  <Input
                    placeholder={intl.formatMessage({
                      id: 'SETTING_CONTACT_TIPS',
                    })}
                  />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'SETTING_COUNTRY',
                  })}
                  name="country"
                  rules={[]}
                >
                  <Select
                    placeholder={intl.formatMessage({
                      id: 'SETTING_COUNTRY_TIPS',
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
              </>
            ) : (
              ''
            )}
            <Form.Item
              name="description"
              label={intl.formatMessage({
                id: 'SETTING_DESCRIPTION',
              })}
              className="setting-textarea"
            >
              <TextArea
                rows={4}
                placeholder={intl.formatMessage({
                  id: 'SETTING_DESCRIPTION_TIPS',
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
                <Button onClick={showModal}>
                  {intl.formatMessage({
                    id: 'SETTING_CHANGE_PASSWORD',
                  })}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Modal
        title="Change password"
        wrapClassName="pop-pwd"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <ChangePassword closeModal={handleCancel}></ChangePassword>
      </Modal>
    </div>
  );
};

export default connect(
  ({ setting, login }: { setting: objectT; login: objectT }) => ({
    setting,
    login,
  }),
)(Setting);
