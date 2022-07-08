import styles from './index.scss';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd';
import { useIntl } from 'umi';
import copy from 'copy-to-clipboard';
import { useState, useEffect } from 'react';
import { isBuffer } from 'lodash';
interface objectT {
  [propName: string]: any;
}

const invitationUser = (props: objectT) => {
  const {
    dispatch,
    login: {
      userInfo: { roles, invitationCode },
    },
  } = props;
  const intl = useIntl();
  const [role, setRole] = useState('GAMERS');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBtnVisible, setBtnVisible] = useState(false);
  const [guildInfo, setGuildInfo] = useState<objectT>({});
  useEffect(() => {
    if (roles) {
      setRole(roles[0].code);
      if (roles[0].code == 'GUILD') {
        dispatch({
          type: 'guilds/getGuildRoleInfo',
        }).then((res: objectT) => {
          setGuildInfo(res.data);
          setBtnVisible(true);
        });
      } else if (roles[0].code == 'GAMERS') {
        if (invitationCode) {
          setGuildInfo({
            invitationCode: invitationCode,
          });
          setBtnVisible(true);
        }
      }
    }
  }, [roles]);
  const copyMsg = (msg: any, tip: string) => {
    copy(msg);
    message.info(tip);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const modalContent = () => {
    const PERSONAL_GUILD_INVITATION_CODE = intl.formatMessage({
      id: 'PERSONAL_GUILD_INVITATION_CODE',
    });
    const PERSONAL_GUILD_INVITATION_CODE_TIP = intl.formatMessage({
      id: 'PERSONAL_GUILD_INVITATION_CODE_TIP',
    });
    const PERSONAL_GUILD_INVITATION_LINK = intl.formatMessage({
      id: 'PERSONAL_GUILD_INVITATION_LINK',
    });
    const PERSONAL_GUILD_INVITATION_LINK_TIP = intl.formatMessage({
      id: 'PERSONAL_GUILD_INVITATION_LINK_TIP',
    });
    const PERSONAL_GUILD_COPY = intl.formatMessage({
      id: 'PERSONAL_GUILD_COPY',
    });

    const PERSONAL_GUILD_COPY1 = intl.formatMessage({
      id: 'PERSONAL_GUILD_COPY1',
    });
    const code = guildInfo.invitationCode;
    const link = `${window.location.origin}/personal/joinguild/?invitationCode=${guildInfo.invitationCode}`;
    return (
      <>
        <p>
          <span>{PERSONAL_GUILD_INVITATION_CODE} </span>
          <span className={styles['link']}> {code}</span>
        </p>
        <p>
          <span>{PERSONAL_GUILD_INVITATION_LINK} </span>
          <span className={styles['link']}>{link}</span>
        </p>
        <div className={styles['links']}>
          <span
            className={styles['link']}
            onClick={() => {
              copyMsg(code, PERSONAL_GUILD_INVITATION_CODE_TIP);
            }}
          >
            {PERSONAL_GUILD_COPY}
          </span>
          <span
            className={styles['link']}
            onClick={() => {
              copyMsg(link, PERSONAL_GUILD_INVITATION_LINK_TIP);
            }}
          >
            {PERSONAL_GUILD_COPY1}
          </span>
        </div>
      </>
    );
  };
  return (
    <>
      {isBtnVisible ? (
        <div className={styles['invite-wrap']}>
          <Button
            className={`${styles['btn-invite']} ${styles['r-btn']}`}
            ghost
            onClick={() => {
              setModalVisible(true);
            }}
          >
            {intl.formatMessage({ id: 'COMMON_BUTTON_INVITE_USER' })}
          </Button>
          <Modal
            onCancel={handleCancel}
            wrapClassName="invitation-modal"
            title="Invite User"
            visible={isModalVisible}
            // onOk={handleOk}
            footer={null}
            // onCancel={handleCancel}
          >
            {modalContent()}
          </Modal>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default connect(
  ({
    gamefi,
    guilds,
    login,
  }: {
    gamefi: objectT;
    guilds: objectT;
    login: objectT;
  }) => ({
    gamefi,
    guilds,
    login,
  }),
)(invitationUser);
