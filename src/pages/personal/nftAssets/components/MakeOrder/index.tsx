import styles from './index.scss';
import { connect, history, useHistory, useIntl, useParams } from 'umi';
import { Button, Form, InputNumber, message, Radio, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import contractConfig from '@/utils/contract/config';
import { NFTTokenType, ObjectT } from '../../typing';
import bigInt from 'big-integer';
const { Option } = Select;

const MakeOrder = (props: ObjectT) => {
  const {
    data = {},
    mode,
    dispatch,
    common: { contract, account },
  } = props;
  const params: any = useParams();
  const history: ObjectT = useHistory();
  const [tkType, setTkType] = useState<NFTTokenType>(0);
  const [loading, setLoading] = useState(false);
  const [lendItem, setLendItem] = useState<null | ObjectT>();
  const intl = useIntl();
  const erc1155Methods = contract?.erc1155.methods;
  const erc721Methods = contract?.erc721.methods;
  const rentMethods = contract?.rent.methods;
  const tokenId = 10;
  const { op } = history.location.query;

  /**
   * 合约发布前提交订单数据
   * @param data
   */
  const leasePublish = async (data: ObjectT) => {
    const {
      price,
      minimumLeaseTime,
      maximumLeaseTime,
      renewable,
      targetLessor,
    } = data;
    const newData = {
      deposit: 0,
      interast: price,
      leaseTermLeast: minimumLeaseTime,
      leaseTermLongest: maximumLeaseTime,
      nftAssetId: params.id,
      proportion: 0,
      renewable: renewable ? 'Y' : 'N',
      targetLessor: targetLessor ? 'MY_GUILD_ONLY' : 'ALL_GUILDS',
    };
    try {
      setLoading(true);
      const result = await dispatch({
        type: 'nftAssets/leasePublish',
        payload: newData,
      });
      setLoading(false);
      if (result.status !== 200) {
        return false;
      }
      return true;
    } catch (err) {
      message.error((err as Error).message);
      setLoading(false);
      return false;
    }
  };

  /**
   * 合约发布完成调用
   * @returns
   */
  const publishComplete = async () => {
    try {
      await dispatch({
        type: 'nftAssets/publishComplete',
        payload: {
          id: params.id,
        },
      });
    } catch (err) {
      message.error((err as Error).message);
    }
  };

  /**
   * 合约发布失败调用
   * @returns
   */
  const publishFail = async () => {
    try {
      await dispatch({
        type: 'nftAssets/publishFail',
        payload: {
          id: params.id,
        },
      });
    } catch (err) {
      message.error((err as Error).message);
    }
  };

  /**
   * 获取当前的nft
   */
  const getCurrentLendItem = async () => {
    const list: ObjectT[] = await rentMethods?.getMyDepositsList().call();
    let currLendItem = null;
    list.find((item, index) => {
      if (
        item.tokenID == tokenId &&
        item.NFTaddr == contractConfig.erc721.address
      ) {
        currLendItem = {
          ...item,
          index,
        };
        return item;
      }
    });
    setLendItem(currLendItem);
    console.log(currLendItem);
  };

  useEffect(() => {
    if (contract) {
      getCurrentLendItem();
    }
  }, [contract]);

  /**
   * 交易授权
   */
  const approve = async () => {
    const rentAddress = contractConfig.rent.address;
    setLoading(true);
    try {
      if (tkType === NFTTokenType.ERC1155) {
        const isApprovedForAll = await erc1155Methods
          .isApprovedForAll(account, rentAddress)
          .call();
        if (isApprovedForAll) {
          // 已授权
          return true;
        } // 未授权,进行授权操作
        await erc1155Methods.setApprovalForAll(rentAddress, true).send({
          from: account,
        });
        return true;
      } else {
        const approvedAddress = await erc721Methods.getApproved(tokenId).call();
        if (approvedAddress === rentAddress) {
          // 已授权
          setLoading(false);
          return true;
        }
        // 未授权
        await erc721Methods.approve(rentAddress, tokenId).send({
          from: account,
        });
        setLoading(false);
        return true;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      await publishFail();
      return false;
    }
  };

  /**
   * 合约发布订单
   * @param params
   */
  const deposit = async (params: ObjectT) => {
    setLoading(true);
    try {
      const depositResult = await rentMethods
        .deposit(
          params.tkType,
          params.nftAddr,
          params.tokenId,
          !!params.renewable,
          params.coinIndex,
          params.minimumLeaseTime,
          params.maximumLeaseTime,
          params.price,
          params.gameBonus,
        )
        .send({
          from: account,
        });
      await publishComplete();
      message.success('make order success');
      setLoading(false);
    } catch (err) {
      message.error((err as Error).message);
      setLoading(false);
      await publishFail();
    }
  };

  /**
   * 修改订单
   * @param params
   */
  const resetDeposit = async (params: ObjectT) => {
    setLoading(true);
    try {
      const resetResult = await rentMethods
        .resetDeposit(
          lendItem?.index,
          params.minimumLeaseTime,
          params.maximumLeaseTime,
          params.price,
          params.gameBonus,
        )
        .send({
          from: account,
        });
      message.success('reset order success');
      setLoading(false);
    } catch (err) {
      message.error((err as Error).message);
      setLoading(false);
    }
  };

  /**
   * 修改续租状态
   * @param params
   */
  const resetRenewableStatus = async (params: ObjectT) => {
    setLoading(true);
    try {
      const resetResult = await rentMethods
        .renewableStatus(lendItem?.index, params.renewable)
        .send({
          from: account,
        });
      message.success('reset renewable status success');
      setLoading(false);
      console.log(resetResult);
    } catch (err) {
      message.error((err as Error).message);
      setLoading(false);
    }
  };

  // 验证成功后提交
  const onFinish = async (values: any) => {
    const { price, renewable } = values;
    const params = {
      ...values,
      tkType,
      nftAddr: contractConfig[NFTTokenType[tkType].toLowerCase()].address,
      tokenId,
      coinIndex: 0,
      renewable: !!renewable,
      price: bigInt(`${price}e18`).toString(),
      gameBonus: 0,
    };
    if (op === 'modify') {
      // const result1 = await resetDeposit(params);
      // const result2 = await resetRenewableStatus(params);
      return;
    }
    const leasePublishResult = await leasePublish(values);
    if (!leasePublishResult) {
      return;
    }
    const result = await approve();
    if (!result) {
      // 授权失败
      return false;
    }
    const depositResult = await deposit(params);
  };

  return (
    <div className={styles['form-main']}>
      <Form
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          targetLeaser: 0,
          renewable: 0,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={intl.formatMessage({ id: 'NFTASSETS_RENTAL' })}
          name="price"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'NFTASSETS_RENTAL_REQUIRE_ERROR',
              }),
            },
          ]}
        >
          <InputNumber
            placeholder={`USDT/${intl.formatMessage({ id: 'NFTASSETS_DAY' })}`}
            controls={false}
          />
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
          label={intl.formatMessage({ id: 'NFTASSETS_LEAST_LEASE_TERM' })}
          name="minimumLeaseTime"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'NFTASSETS_LEAST_LEASE_TERM_REQUIRE_ERROR',
              }),
            },
          ]}
        >
          <InputNumber
            placeholder={intl.formatMessage({ id: 'NFTASSETS_DAY' })}
            controls={false}
          />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'NFTASSETS_LONGEST_LEASE_TERM' })}
          name="maximumLeaseTime"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'NFTASSETS_LONGEST_LEASE_TERM_REQUIRE_ERROR',
              }),
            },
          ]}
        >
          <InputNumber
            placeholder={intl.formatMessage({ id: 'NFTASSETS_DAY' })}
            controls={false}
          />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'NFTASSETS_TARGET_LEASER' })}
          name="targetLeaser"
          rules={[]}
        >
          <Select value={0} suffixIcon={<CaretDownOutlined />}>
            <Option value={0}>
              {intl.formatMessage({ id: 'NFTASSETS_ALL_GUILDS' })}
            </Option>
            <Option value={1}>
              {intl.formatMessage({ id: 'NFTASSETS_MY_GUILDS_ONLY' })}
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="Renewable" name="renewable" rules={[]}>
          <Radio.Group value={1}>
            <Radio value={1}>
              {intl.formatMessage({ id: 'NFTASSETS_YES' })}
            </Radio>
            <Radio value={0}>
              {intl.formatMessage({ id: 'NFTASSETS_NO' })}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Button
          type="primary"
          className={styles['btn']}
          htmlType="submit"
          disabled={loading}
        >
          {intl.formatMessage({
            id: 'NFTASSETS_MAKE_ORDER',
          })}
        </Button>
      </Form>
    </div>
  );
};

export default connect(
  ({ nftAssets, common }: { nftAssets: ObjectT; common: ObjectT }) => ({
    nftAssets,
    common,
  }),
)(MakeOrder);
