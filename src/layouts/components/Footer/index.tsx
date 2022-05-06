import styles from './index.scss';
import { Layout, Button } from 'antd';
import { Link, useIntl, setLocale } from 'umi';
import { useRef } from 'react';

const Footer = () => {
  const intl = useIntl();
  const lang = useRef('US');

  //切换语言
  const setLang = (lang: string) => {
    setLocale(lang, true);
  };

  return (
    <Layout.Footer className={styles['footer']}>
      <div className={styles['ft-l']}>
        <Link to="" className={styles['logo']}>
          <img src={require('@/assets/common/img/logo.png')} />
        </Link>
        <div className={styles['cp']}>
          <p>© COPYRIGHT</p>
          <p>2022 MetaOne Global Inc. All rights reserved</p>
        </div>
      </div>
      <div className={styles['ft-r']}>
        <dl>
          <dt>{intl.formatMessage({ id: 'FOLLOW_US' })}</dt>
          <dd></dd>
        </dl>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
