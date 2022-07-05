import React, { useEffect, useMemo, useState } from 'react';
import styles from './detail.scss';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  ThemeProvider,
} from '@mui/material';

import theme from './muiTheme';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import bigInt from 'big-integer';

import RowStack from './components/RowStack';
import NFTLevel from './components/NFTLevel';

import { queryMarketNFTById } from './utils/mock';
import { connect, Link, useHistory, useRouteMatch } from 'umi';
import { ObjectT } from './typing';
import { initTransactionConf, ContractListObject } from '@/utils/contract';
import { message, Modal } from 'antd';
import TakeOrder from './components/TakeOrder.tsx';

function NFTInfo({ data }: { data: any }) {
  const Attrs = useMemo(() => data.attr, [data.attr]);
  return (
    <Box
      sx={{
        height: 448,
        width: '100%',
        overflow: 'hidden',
        p: 6,
        backgroundColor: '#001F22',
        '.Row': {
          width: '50%',
          display: 'inline-flex',
          py: 2,

          '.Label': {
            fontSize: 14,
            color: 'text.secondary',
            width: '200px',
          },
        },
      }}
    >
      {Object.keys(Attrs).map((key, index) => {
        return (
          <RowStack className="Row" key={index}>
            <Typography className="Label">{key}</Typography>
            <Typography className="Value">{Attrs[key]}</Typography>
          </RowStack>
        );
      })}
    </Box>
  );
}

const NFTDetailsPage: React.FC = (props: ObjectT) => {
  const {
    nftHub: { contract, orderInfo, account },
    dispatch,
  } = props;
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [takeOrderVisible, setTakeOrderVisible] = useState(false);
  const [orderData, setOrderData] = useState<ObjectT>({});
  const rentMethods = contract?.rent.methods;
  const tokenId = 7;
  const targetLeaser = 1;

  // 当前信息Tab
  const [currentInfo, setCurrentInfo] = useState<'order' | 'NFT'>('order');

  useEffect(() => {
    queryMarketNFTById(id as string).then((res) => {
      if (res.code === 0) {
        setData(res.data);
      }
    });
  }, [id]);

  /**
   * 关闭承租弹窗
   */
  const handleCancelTakeOrder = () => {
    setTakeOrderVisible(false);
  };

  /**
   * 处理点击承租按钮
   */
  const handleTakeOrder = () => {
    setTakeOrderVisible(true);
  };

  /**
   * 获取出租出去的nft订单信息
   */
  const getOrderInfo = async () => {
    const orderInfo = await rentMethods.getLendItemMsg(5).call();
    console.log(orderInfo);
    if (!orderInfo) {
      return;
    }
    const { price, renewable } = orderInfo;
    const newOrderInfo = {
      ...orderInfo,
      price: parseInt(price) / 1e18,
      targetLeaser: targetLeaser ? 'My Guild Only' : 'All Guilds',
      renewable: renewable ? 'Yes' : 'No',
    };
    setOrderData(newOrderInfo);
    dispatch({
      type: 'nftHub/setData',
      payload: {
        orderInfo: newOrderInfo,
      },
    });
  };

  /**
   * 处理订单完成
   */
  const handleOrderComplete = () => {
    setTakeOrderVisible(false);
  };

  useEffect(() => {
    initTransactionConf((account, contract: ContractListObject) => {
      dispatch({
        type: 'nftHub/setData',
        payload: {
          account,
          contract,
        },
      });
      dispatch({
        type: 'nftAssets/setData',
        payload: {
          account,
          contract,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (contract) {
      getOrderInfo();
    }
  }, [contract]);

  // 当前租赁模式
  const mode = useMemo(() => {
    if (data && data.leaseInfo) {
      return data.leaseInfo.mode;
    }
    return undefined;
  }, [data]);

  if (!data) return null;
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 4 }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            my: 3,
            a: {
              color: 'primary.light',

              '&:hover': {
                color: 'primary.main',
              },
            },
          }}
        >
          <Box component={Link} color="primary.light" to="/nfts">
            NFTs Hub
          </Box>
          <Box component={Link} color="primary.light" to="/nfts/hub">
            Overall NFTs
          </Box>
          <Typography color="primary.main">{data.name}</Typography>
        </Breadcrumbs>

        <RowStack direction={{ xs: 'column', sm: 'row' }} alignItems="start">
          <Box
            className="Left"
            sx={{ width: '100%', flex: 3, order: { xs: 2, sm: 1 } }}
          >
            <Stack
              sx={{
                height: '440px',
                pt: 2,
              }}
              alignItems="flex-start"
            >
              <Typography sx={{ my: 1 }}>{data.game}</Typography>
              <Typography sx={{ fontSize: 26, fontWeight: 'bold' }}>
                {data.name}
              </Typography>
              <Box
                sx={{
                  width: 143,
                  height: 35,
                  my: 3,
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #F05A23',
                }}
              >
                <NFTLevel level={data.level} />
              </Box>
              <Box
                sx={{
                  minWidth: 122,
                  height: 35,
                  fontSize: 15,
                  px: 1,
                  fontWeight: 'bold',
                  lineHeight: '35px',
                  borderRadius: '3px',
                  textAlign: 'center',
                  border: '1px solid #028189',
                }}
              >
                #{data.hash} / <span style={{ fontWeight: 400 }}>10000</span>
              </Box>
              <div style={{ flex: 1 }}></div>
              <RowStack sx={{ my: 3 }} alignItems="flex-end">
                <Typography
                  sx={{
                    fontSize: 45,
                    lineHeight: 1,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mr: 1,
                  }}
                >
                  {data.leaseInfo.interest}
                </Typography>
                <Typography>USDT/Day</Typography>
              </RowStack>
              <Button
                sx={{ minWidth: 172 }}
                size="large"
                variant="contained"
                startIcon={<AccountBalanceWalletOutlined />}
                onClick={handleTakeOrder}
                disabled={
                  orderInfo.lender.toLowerCase() === account.toLowerCase()
                }
              >
                Take Order
              </Button>
            </Stack>
          </Box>
          <Box
            className="Right"
            sx={{ width: '100%', flex: 4, order: { xs: 1, sm: 2 } }}
          >
            <Box
              sx={{
                width: '100%',
                height: { xs: 'auto', sm: '440px' },
                maxHeight: '440px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                img: {
                  maxWidth: '100%',
                  maxHeight: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                },
              }}
            >
              <img src={data.image} alt="" />
            </Box>
          </Box>
        </RowStack>

        <Box sx={{ mt: 8 }}>
          <RowStack
            className="Tab"
            sx={{
              height: 64,
              lineHeight: '64px',

              '.TabItem': {
                whiteSpace: 'nowrap',
                textAlign: 'left',
                color: 'text.secondary',
                fontSize: 26,
                minWidth: 180,
                cursor: 'pointer',
                fontWeight: 'bold',

                '&:hover': {
                  color: 'text.primary',
                },

                '&.Active': {
                  color: 'text.primary',
                },
              },
            }}
          >
            <Box
              className={currentInfo === 'order' ? 'TabItem Active' : 'TabItem'}
              onClick={() => setCurrentInfo('order')}
            >
              Order Info
            </Box>
            <Box
              className={currentInfo === 'NFT' ? 'TabItem Active' : 'TabItem'}
              onClick={() => setCurrentInfo('NFT')}
            >
              NFT Info
            </Box>
          </RowStack>
          {currentInfo === 'NFT' ? (
            <NFTInfo data={data} />
          ) : (
            <RowStack sx={{ height: 448 }}>
              <Box
                sx={{
                  flexBasis: '292px',
                  height: '100%',
                  backgroundColor: '#00272B',
                }}
              >
                <MenuList
                  sx={{
                    p: 0,
                    '.MuiMenuItem-root': {
                      height: 60,
                      pl: 4,
                      transition: 'all 160ms',

                      '&.Active': {
                        backgroundColor: 'primary.main',
                        color: '#333',
                      },
                    },
                  }}
                >
                  <MenuItem className="Active">Lease Mode</MenuItem>
                </MenuList>
              </Box>
              <Box sx={{ flex: 1, backgroundColor: '#001F22', height: '100%' }}>
                <Box
                  sx={{
                    p: 6,
                    '.Row': {
                      py: 2,

                      '.Label': {
                        fontSize: 14,
                        color: 'text.secondary',
                        width: '200px',
                      },
                    },
                  }}
                >
                  <RowStack className="Row">
                    <Typography className="Label">Rental</Typography>
                    <Typography className="Value">
                      {orderData.price} USDT/Day
                    </Typography>
                  </RowStack>
                  <RowStack className="Row">
                    <Typography className="Label">
                      Minimum lease term
                    </Typography>
                    <Typography className="Value">
                      {orderData.minimumLeaseTime} Day
                    </Typography>
                  </RowStack>
                  <RowStack className="Row">
                    <Typography className="Label">
                      Maximum lease term
                    </Typography>
                    <Typography className="Value">
                      {orderData.maximumLeaseTime} Day
                    </Typography>
                  </RowStack>
                  <RowStack className="Row">
                    <Typography className="Label">Target renter</Typography>
                    <Typography className="Value">
                      {orderData.targetLeaser === 1
                        ? 'My guild only'
                        : 'All guilds'}
                    </Typography>
                  </RowStack>
                </Box>
              </Box>
            </RowStack>
          )}
        </Box>
        <Modal
          title="Order"
          wrapClassName={styles['modal-take-order']}
          visible={takeOrderVisible}
          onCancel={handleCancelTakeOrder}
          destroyOnClose
          footer={null}
          width={480}
        >
          <TakeOrder onComplete={handleOrderComplete} />
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default connect(({ nftHub }: { nftHub: ObjectT }) => ({
  nftHub,
}))(NFTDetailsPage);
