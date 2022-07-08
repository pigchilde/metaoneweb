import styles from './index.scss';
import { history, useIntl } from 'umi';
import { Button, Form, Input, message, Radio, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import web3Utils, { eth2Wei, wei2Eth } from '@/utils/web3';
import config from '@/utils/web3Config';
const { Option } = Select;

interface objectT {
  [propName: string]: any;
}

const MakeOrder = (props: objectT) => {
  const { data = {}, mode } = props;
  const [contract, setContract] = useState<any>();
  const [account, setAccount] = useState('');
  const intl = useIntl();

  // useEffect(() => {
  //   ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
  //     setAccount(accounts[0]);
  //     const contract = web3Utils.initContract(
  //       config.CDMContractABI,
  //       config.CDMContractAddress,
  //       accounts[0],
  //     );
  //     setContract(contract);
  //     contract.methods
  //       .getMyDepositsList()
  //       .call()
  //       .then((res) => {
  //         console.log(res, 'getMyDepositsList res');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // }, []);

  // 验证成功后提交
  const onFinish = (values: any) => {
    // const params = {
    //   _tkType: '',
    //   _NFTaddr: '0xB3867cdb57944807C97DD97d445CC8Fa54BE6911',
    //   _tokenID: '1',
    //   _renewable: values.renewable,
    //   _coinIndex: '',
    //   _minimumLeaseTime: values.leastTerm,
    //   _maximumLeaseTime: values.longestTerm,
    //   _price: 1000,
    //   _gameBonus: 10,
    // };
    message.success('Successful!');
    history.push('/personal/nftAssets');
  };

  return (
    <div className={styles['form-main']}>
      <Form
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          // interast: '12',
          // proportion: '5',
          // leastTerm: '1',
          // longestTerm: '2',
          targetLeaser: 0,
          renewable: 0,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Rental"
          name="rental"
          rules={[
            {
              required: true,
              message: 'Please input Rental!',
            },
          ]}
        >
          <Input placeholder="USDT/DAY" />
        </Form.Item>
        {mode === 'share' ? (
          <Form.Item
            label="Proportion"
            name="proportion"
            rules={[
              {
                required: true,
                message: 'Please input proportion!',
              },
            ]}
          >
            <Input placeholder="%" />
          </Form.Item>
        ) : null}
        <Form.Item
          label="Least lease term"
          name="leastTerm"
          rules={[
            {
              required: true,
              message: 'Please input least lease term!',
            },
          ]}
        >
          <Input placeholder="Day" />
        </Form.Item>
        <Form.Item
          label="Longest lease term"
          name="longestTerm"
          rules={[
            {
              required: true,
              message: 'Please input longest lease term!',
            },
          ]}
        >
          <Input placeholder="Day" />
        </Form.Item>
        <Form.Item label="Target leaser" name="targetLeaser" rules={[]}>
          <Select value={0} suffixIcon={<CaretDownOutlined />}>
            <Option value={0}>All guild</Option>
            <Option value={1}>My guild only</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Renewable" name="renewable" rules={[]}>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Button type="primary" className={styles['btn']} htmlType="submit">
          {intl.formatMessage({
            id: 'PERSONAL_GUILD_BTN1',
          })}
        </Button>
      </Form>
    </div>
  );
};

export default MakeOrder;
