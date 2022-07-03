import { connect } from 'dva';
import styles from './index.scss';
import { useIntl } from 'umi';
import { Form, Input, message, Button, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { ObjectT } from '../../typing';
import { FieldData } from 'rc-field-form/lib/interface';
import contractConfig from '@/utils/contract/config';
import bigInt from 'big-integer';
interface objectT {
  [propName: string]: any;
}
const TakeOrder = (props: objectT) => {
  const {
    onComplete,
    nftHub: { account, contract, orderInfo },
  } = props;
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setFieldsValue, getFieldValue } = form;
  const rentMethods = contract?.rent.methods;
  const erc20Methods = contract?.erc20.methods;

  /**
   * 处理表单字段变化
   * @param changedFields
   * @returns
   */
  const onFieldsChange = (changedFields: FieldData[]) => {
    const leaseTermChange = changedFields.find((item) => {
      const fieldName: any = item.name;
      return fieldName[0] === 'leaseTerm';
    });
    if (!leaseTermChange) {
      return;
    }
    // 计算总价格
    setFieldsValue({
      totalPrice: orderInfo.price * leaseTermChange.value,
    });
  };

  /**
   * 交易授权
   */
  const approve = async () => {
    const rentAddress = contractConfig.rent.address;
    const leaseTerm = getFieldValue('leaseTerm');
    const ownerAddress = '0xCdE6f9fD2A5789EF5aDFdF499676cC0979E33cd0';
    const { tokenID } = orderInfo;
    setLoading(true);
    try {
      // const allowance = await erc20Methods.allowance(rentAddress, account).call();
      // 未授权,进行授权操作
      const approveResult = await erc20Methods
        ._approve(account, rentAddress, bigInt(200e18).toString())
        .send({
          from: account,
        });
      setLoading(false);
    } catch (err) {
      message.error((err as Error).message);
      setLoading(false);
    }
    try {
      const rentResult = await rentMethods.rent(tokenID, leaseTerm).send({
        from: account,
      });
      message.success('success');
      setLoading(false);
      onComplete && onComplete();
    } catch (err) {
      message.error((err as Error).message);
      setLoading(false);
    }
  };

  /**
   * 验证成功提交
   */
  const onFinish = async () => {
    await approve();
  };

  useEffect(() => {
    const { price } = orderInfo;
    setFieldsValue({ price });
  }, [orderInfo]);

  return (
    <div className={styles['take-order-form']}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
        initialValues={{
          totalPrice: 0,
        }}
      >
        <Form.Item label="Rental" name="price">
          <InputNumber disabled addonAfter="USDT/DAY" />
        </Form.Item>
        <Form.Item
          label="Lease term"
          name="leaseTerm"
          rules={[
            {
              required: true,
              message: 'Please input lease term',
            },
          ]}
        >
          <InputNumber controls={false} addonAfter="DAY" min={1} />
        </Form.Item>
        <Form.Item label="Total rent" name="totalPrice">
          <InputNumber
            disabled
            addonAfter="USDT"
            formatter={(value, info) => {
              if (!value) {
                return '0';
              }
              return value.toString();
            }}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Approve
        </Button>
      </Form>
    </div>
  );
};
export default connect(({ nftHub }: { nftHub: ObjectT }) => ({
  nftHub,
}))(TakeOrder);
