import styles from './index.scss';
import { useIntl } from 'umi';
import { Tabs } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
const { TabPane } = Tabs;
const Sign = () => {
  const intl = useIntl();
  const tabChange = () => {};
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles['sign-page']}>
      <div className={styles['sign-banner']}>
        <h3>
          {intl.formatMessage({
            id: 'SIGN_TITLE1',
          })}
        </h3>
      </div>
      <div className={styles['sign-main']}>
        <div className={styles['sign-box']}>
          <Tabs
            defaultActiveKey="1"
            onChange={tabChange}
            className={styles['tab-box']}
          >
            <TabPane
              tab={intl.formatMessage({
                id: 'SIGN_TAB_GAME',
              })}
              key="1"
            ></TabPane>
            <TabPane
              tab={intl.formatMessage({
                id: 'SIGN_TAB_GUILD',
              })}
              key="2"
            ></TabPane>
            <TabPane
              tab={intl.formatMessage({
                id: 'SIGN_TAB_NFT',
              })}
              key="3"
            ></TabPane>
          </Tabs>
          <div className={styles['form-box']}>
            <p className={styles['tip']}>
              {intl.formatMessage({
                id: 'SIGN_TAB_GAME_TIP',
              })}
            </p>
            <Form
              name="basic"
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Email2">
                <Form.Item
                  name="year"
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
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                label="Password1"
                name="password1"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input placeholder="ConfiInvitation Code" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles['form-submit']}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sign;
