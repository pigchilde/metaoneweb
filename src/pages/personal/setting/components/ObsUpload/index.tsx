import { Upload, message } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styles from './index.scss';
import { connect } from 'dva';
import ObsClient from 'esdk-obs-browserjs';

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: Blob) {
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
interface objectT {
  [propName: string]: any;
}
const ObsUpload = (props: objectT) => {
  const { dispatch, userInfo = {} } = props;
  const [imageUrl, setImageUrl] = useState('' as string);
  const [loading, setLoading] = useState(false as boolean);
  const upload = (file: { name: string }) => {
    const that = this;
    const bucketName = 'bucket-metaone'; // 桶名
    const serverUrl = 'https://obs.ap-southeast-3.myhuaweicloud.com'; // 服务器地址
    // 后端生成秘钥，调取接口进行获取
    var obsClient = new ObsClient({
      access_key_id: 'UTGV3KMVFNK1OBH57Y06',
      secret_access_key: '8SNqzncfqhuIftDPGWiAvIqdE5Zrzwf0uW58kuxD',
      server: serverUrl,
    });
    obsClient.putObject(
      {
        Bucket: bucketName, // 桶名
        Key: 'avatar/' + userInfo.uid + file.name,
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
              'https://static.metaone.gg/avatar/' + userInfo.uid + file.name;
            setImageUrl(fileUrl);
            dispatch({
              type: 'setting/putAvatars',
              payload: { data: { avatras: fileUrl } },
            }).then((res: objectT) => {
              const { code, data = [] } = res;
              if (code === 0) {
                // setRegionData(data);
              }
            });
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
    // if (info.file.status === 'uploading') {
    upload(info.file.originFileObj);
    getBase64(info.file.originFileObj, (imageUrl: SetStateAction<string>) => {
      setImageUrl(imageUrl);
      setLoading(false);
    });
    setLoading(true);
    //   return;
    // }
  };

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={styles['avatar-uploader']}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={() => {}}
    >
      {imageUrl || userInfo.avatar ? (
        <div className={styles['img-box']}>
          <span className={styles['img-hover']}>
            <UploadOutlined />
          </span>
          <img
            src={imageUrl || userInfo.avatar}
            alt="avatar"
            style={{ width: '100%' }}
          />
        </div>
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
export default connect(({ setting }: { setting: objectT }) => ({
  setting,
}))(ObsUpload);
