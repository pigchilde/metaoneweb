import { Link } from 'umi';
import styles from './wallet.scss';
import { useIntl } from 'umi';
import defaultPic from '../../../assets/personal/pic/avatar.jpg';
import { Button, Radio, Tabs, Input, Form } from 'antd';
import { useState } from 'react';
const { TabPane } = Tabs;
interface objectT {
  [propName: string]: any;
}

const guild = () => {
  const [radioValue, setRadioValue] = useState('large' as string);
  const intl = useIntl();
  const handleSizeChange = (e: objectT) => {
    const { target } = e;
    setRadioValue(target.value);
  };
  const tabChange = () => {};
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Link to="/" className={styles['back']}>
        {'< '}
        {intl.formatMessage({
          id: 'PERSONAL_BACK',
        })}
      </Link>
      <section className={styles['main']}>
        <div className={styles['img-box']}>
          <img src={defaultPic} alt="" />
        </div>
        <div className={styles['content-box']}>
          <Radio.Group
            value={radioValue}
            onChange={handleSizeChange}
            className={styles['radio-btn']}
          >
            <Radio.Button value="large">
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_RADIO1',
              })}
            </Radio.Button>
            <Radio.Button value="default">
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_RADIO2',
              })}
            </Radio.Button>
          </Radio.Group>
          <p className={styles['lessess-address']}>
            {intl.formatMessage({
              id: 'PERSONAL_GUILD_ADDRESS',
            })}
            <span> kjlsdjgkjsdgfjgdfjhdjhfgdhjfgdhjfgj</span>
          </p>
          <div className={styles['rounded-rectangle']}>
            <Tabs
              defaultActiveKey="1"
              onChange={tabChange}
              className={styles['tab-box']}
            >
              <TabPane
                tab={intl.formatMessage({
                  id: 'PERSONAL_GUILD_TABS1',
                })}
                key="1"
              ></TabPane>
              <TabPane
                tab={intl.formatMessage({
                  id: 'PERSONAL_GUILD_TABS1',
                })}
                key="2"
              ></TabPane>
            </Tabs>
            {radioValue === 'large' ? (
              <div className={styles['tabs-main']}>
                <p className={styles['tabs-item']}>
                  <span className={styles['item1']}>sdfsdfsdfsdf</span>
                  <span className={styles['item2']}>
                    dddddddddddddddddddddddddddd dddddddddddddd dddddddddddddd
                  </span>
                </p>
                <p className={styles['tabs-item']}>
                  <span className={styles['item1']}>sdfsdfsdfsdf</span>
                  <span className={styles['item2']}>sdfsfsdfds</span>
                </p>
                <p className={styles['tabs-item']}>
                  <span className={styles['item1']}>sdfsdfsdfsdf</span>
                  <span className={styles['item2']}>sdfsfsdfds</span>
                </p>
                <Button type="primary" className={styles['cancel-btn']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GUILD_BTN',
                  })}
                </Button>
              </div>
            ) : (
              <div className={styles['form-main']}>
                <Form
                  name="basic"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Form>
                <Button type="primary" className={styles['cancel-btn']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GUILD_BTN1',
                  })}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default guild;
