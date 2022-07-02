import styles from './index.scss';
import { connect, history, useIntl } from 'umi';
import { Button, Form, InputNumber, message, Radio, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import contractConfig from '@/utils/contract/config';
import { NFTTokenType, ObjectT } from '../../typing';
import bigInt from 'big-integer';
const { Option } = Select;

const MakeOrder = (props: ObjectT) => {
  const {
    data = {},
    mode,
    nftAssets: { account, contract },
  } = props;
  const [tkType, setTkType] = useState<NFTTokenType>(0);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const erc1155Methods = contract?.erc1155.methods;
  const erc721Methods = contract?.erc721.methods;
  const rentMethods = contract?.rent.methods;

  /**
   * 交易授权
   */
  const approve = async () => {
    const rentAddress = contractConfig.rent.address;
    let contractMethods = erc721Methods;
    console.log(account, contract);
    if (tkType === NFTTokenType.ERC1155) {
      contractMethods = erc1155Methods;
    }
    try {
      const isApprovedForAll = await contractMethods
        .isApprovedForAll(account, rentAddress)
        .call();
      if (isApprovedForAll) {
        // 已授权
        return;
      }
      // 未授权,进行授权操作
      const approveResult = await contractMethods
        .setApprovalForAll(rentAddress, true)
        .send({
          from: account,
        });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // 验证成功后提交
  const onFinish = async (values: any) => {
    const { price } = values;
    const params = {
      ...values,
      tkType,
      nftAddr: contractConfig[NFTTokenType[tkType].toLowerCase()].address,
      tokenId: 5,
      coinIndex: 0,
      price: bigInt(`${price}e18`).toString(),
      gameBonus: 0,
    };
    setLoading(true);
    await approve();
    try {
      const depositResult = await rentMethods
        .deposit(
          params.tkType,
          params.nftAddr,
          params.tokenId,
          params.renewable,
          params.coinIndex,
          params.minimumLeaseTime,
          params.maximumLeaseTime,
          params.price,
          params.gameBonus,
        )
        .send({
          from: account,
        });
      message.success('make order success');
      setLoading(false);
    } catch (err) {
      message.error((err as Error).message);
      setLoading(false);
    }
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
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input Rental!',
            },
          ]}
        >
          <InputNumber placeholder="USDT/DAY" controls={false} />
        </Form.Item>
        {/* {mode === ModeType.share ? (
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
        ) : null} */}
        <Form.Item
          label="Least lease term"
          name="minimumLeaseTime"
          rules={[
            {
              required: true,
              message: 'Please input least lease term!',
            },
          ]}
        >
          <InputNumber placeholder="Day" controls={false} />
        </Form.Item>
        <Form.Item
          label="Longest lease term"
          name="maximumLeaseTime"
          rules={[
            {
              required: true,
              message: 'Please input longest lease term!',
            },
          ]}
        >
          <InputNumber placeholder="Day" controls={false} />
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
        <Button
          type="primary"
          className={styles['btn']}
          htmlType="submit"
          disabled={loading}
        >
          {intl.formatMessage({
            id: 'PERSONAL_GUILD_BTN1',
          })}
        </Button>
      </Form>
    </div>
  );
};

export default connect(({ nftAssets }: { nftAssets: ObjectT }) => ({
  nftAssets,
}))(MakeOrder);
