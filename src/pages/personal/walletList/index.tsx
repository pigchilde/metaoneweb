import styles from './index.scss';
import { Link, useIntl } from 'umi';
import { Table, Modal, Input, Button } from 'antd';
import { useState } from 'react';
const WalletList = () => {
  const intl = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: intl.formatMessage({
        id: 'WALLET_NO',
      }),
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: intl.formatMessage({
        id: 'WALLET_ADDRESS',
      }),
      dataIndex: 'gamer',
      key: 'gamer',
    },
    {
      title: intl.formatMessage({
        id: 'WALLET_OPERATE',
      }),
      dataIndex: 'earnings',
      key: 'earnings',
      render: () => {
        return (
          <>
            <span
              className={`${styles['bin']} ${styles['on']}`}
              onClick={showModal}
            >
              {intl.formatMessage({
                id: 'WALLET_BIND',
              })}
            </span>
            <span className={`${styles['set']} ${styles['on']}`}>
              {intl.formatMessage({
                id: 'WALLET_MAIN',
              })}
            </span>
          </>
        );
      },
    },
  ];
  const data = [
    {
      rank: '1',
      gamer: 'kuku',
      earnings: '381.6',
      hours_played: '47',
      hours_played1: 'moxis@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.17',
      hours_played4: 'Online',
    },
    {
      rank: '2',
      gamer: 'shasha',
      earnings: '365.7',
      hours_played: '45',
      hours_played1: 'shasha18@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.17',
      hours_played4: 'Online',
    },

    {
      rank: '3',
      gamer: 'xun',
      earnings: '297',
      hours_played: '37',
      hours_played1: '536dhxun1@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.18',
      hours_played4: 'Online',
    },
    {
      rank: '4',
      gamer: 'qiqi',
      earnings: '289.9',
      hours_played: '36',
      hours_played1: 'qiqi626@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.18',
      hours_played4: 'in-game',
    },
    {
      rank: '5',
      gamer: 'ddudprlq2180',
      earnings: '276.1',
      hours_played: '34',
      hours_played1: 'ddudprlq2180@5133game.com',
      hours_played2: 'Player',
      hours_played3: '2022.04.10',
      hours_played4: 'Online',
    },
  ];
  return (
    <div className={styles['wallet']}>
      <Link to="/" className={styles['back']}>
        {'< '}
        {intl.formatMessage({
          id: 'WALLET_LIST',
        })}
      </Link>
      <section className={styles['list-box']}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['bottomCenter'] }}
        />
      </section>
      <Modal
        title=""
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ background: '#001a20', border: '1px solid #1cbbb4' }}
      >
        <h3 className={styles['modal-title']}>
          {intl.formatMessage({
            id: 'WALLET_BIND_ACCOUNT',
          })}
        </h3>
        <p className={styles['modal-tip']}>
          {intl.formatMessage({
            id: 'WALLET_BIND_TIP',
          })}
        </p>
        <div className={styles['modal-input']}>
          <Input type="text" />
          <Button>
            {intl.formatMessage({
              id: 'WALLET_BIND_SEND',
            })}
          </Button>
        </div>
        <Button className={styles['modal-btn']}>
          {intl.formatMessage({
            id: 'WALLET_BIND_CONFIRM',
          })}
        </Button>
      </Modal>
    </div>
  );
};
export default WalletList;
