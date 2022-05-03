import styles from './index.scss';
import { useIntl, Link } from 'umi';
import { Form, Input, Button, Avatar, Row, Col } from 'antd';

const setting = () => {
  const intl = useIntl();
  const { TextArea } = Input;
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
          id: 'PERSONAL_GUILD_BACK',
        })}
      </Link>
      <div className={styles['setting']}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row className={styles['setting-con']}>
            <Col span={5}>
              <Form.Item label="" name="" className="avatar">
                <Avatar size={163} src="http://dummyimage.com/163x163" />
                <p>
                  {intl.formatMessage({
                    id: 'PERSONAL_SETTING_EDIT_AVATAR',
                  })}
                </p>
              </Form.Item>
            </Col>
            <Col span={19} className={styles['setting-con-item']}>
              <Form.Item
                name="name"
                label={intl.formatMessage({
                  id: 'PERSONAL_SETTING_EDIT_GUILD_NAME',
                })}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="name"
                label={intl.formatMessage({
                  id: 'PERSONAL_SETTING_EDIT_GUILD_CATEGORY',
                })}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="name"
                label={intl.formatMessage({
                  id: 'PERSONAL_SETTING_EDIT_GUILD_TELEGRAMID',
                })}
              >
                <Input placeholder="Enter Your Tg" />
              </Form.Item>
              <Form.Item
                name="name"
                label={intl.formatMessage({
                  id: 'PERSONAL_SETTING_EDIT_GUILD_CONTACT',
                })}
              >
                <Input placeholder="Enter Your Contact " />
              </Form.Item>
              <Form.Item
                name="name"
                label={intl.formatMessage({
                  id: 'PERSONAL_SETTING_EDIT_GUILD_SIZE',
                })}
              >
                <Input placeholder="Enter Guild Size" />
              </Form.Item>
              <Form.Item
                name="name"
                label={intl.formatMessage({
                  id: 'PERSONAL_SETTING_EDIT_GUILD_COUNTRY',
                })}
              >
                <Input placeholder="Enter Your Country" />
              </Form.Item>
              <Form.Item
                name="name"
                label={intl.formatMessage({
                  id: 'PERSONAL_SETTING_EDIT_GUILD_SIZE',
                })}
                /* className={styles['setting-textArea']} */
                className="setting-textarea"
              >
                <TextArea rows={4} placeholder="Enter Your Description" />
              </Form.Item>
              <Form.Item name="name" label="">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
export default setting;
