import styles from './index.scss';
import { useIntl } from 'umi';
import { Form, Input, Button, Avatar, Row, Col, Modal } from 'antd';
import { useState } from 'react';

const setting = () => {
  const intl = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { TextArea } = Input;
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
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
              <p>Edit Your Logo</p>
            </Form.Item>
          </Col>
          <Col span={19} className={styles['setting-con-item']}>
            <Form.Item name="name" label="Guild Name">
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Category">
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Telegram ID">
              <Input placeholder="Enter Your Tg" />
            </Form.Item>
            <Form.Item name="name" label="Contact">
              <Input placeholder="Enter Your Contact " />
            </Form.Item>
            <Form.Item name="name" label="Guild Size">
              <Input placeholder="Enter Guild Size" />
            </Form.Item>
            <Form.Item name="name" label="Country">
              <Input placeholder="Enter Your Country" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Guild Size"
              /* className={styles['setting-textArea']} */
              className="setting-textarea"
            >
              <TextArea rows={4} placeholder="Enter Your Description" />
            </Form.Item>
            <Form.Item name="name" label="">
              <div className={styles['btns']}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={showModal}>Change password</Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        title="Change password"
        wrapClassName="pop-pwd"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        <div className={styles.changePop}>
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
              name="Email"
              rules={[
                { required: true, message: 'Please input your Your Email' },
              ]}
            >
              <Input placeholder="Your Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Your Password" />
            </Form.Item>
            <Form.Item
              label="confirmPassword"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your confirm Password!',
                },
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default setting;
