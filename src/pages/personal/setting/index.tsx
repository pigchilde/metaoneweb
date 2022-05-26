import styles from './index.scss';
import { useIntl } from 'umi';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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
} from 'antd';
import { SetStateAction, useState } from 'react';
import ObsClient from 'esdk-obs-browserjs';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const setting = () => {
  const intl = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false as boolean);

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

  const upload = (file: { name: string }) => {
    const that = this;
    const bucketName = 'bucket-metaone'; // 桶名
    const serverUrl = 'https://obs.ap-southeast-3.myhuaweicloud.com'; // 服务器地址
    console.log(23234324, file);
    // 后端生成秘钥，调取接口进行获取
    var obsClient = new ObsClient({
      access_key_id: 'UTGV3KMVFNK1OBH57Y06',
      secret_access_key: '8SNqzncfqhuIftDPGWiAvIqdE5Zrzwf0uW58kuxD',
      server: serverUrl,
    });
    obsClient.putObject(
      {
        Bucket: bucketName, // 桶名
        Key: 'avatar/' + file.name,
        SourceFile: file,
        Metadata: {
          property: 'property-value',
        },
      },
      function (
        err: string,
        result: {
          CommonMsg: { Status: number; Code: string; Message: string };
        },
      ) {
        if (err) {
          console.error('Error-->' + err);
        } else {
          if (result.CommonMsg.Status < 300) {
            // 上传成功后，文件地址
            const fileUrl =
              'https://' + bucketName + '.' + serverUrl + '/' + file.name;
          } else {
            console.log('Code-->' + result.CommonMsg.Code);
            console.log('Message-->' + result.CommonMsg.Message);
          }
        }
      },
    );
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = (info: {
    file: { status: string; originFileObj: { name: string } };
  }) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      upload(info.file.originFileObj);
      getBase64(info.file.originFileObj, (imageUrl: SetStateAction<string>) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
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
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>

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
