import styles from './index.scss';
import { Layout, Button } from 'antd';
import { Link, useIntl, setLocale, connect } from 'umi';
import { useRef } from 'react';
import SocialMediaList from '@/components/SocialMediaList';

interface objectT {
  [propName: string]: any;
}

const Footer = (props: objectT) => {
  const {
    common: { platformInfo },
    location: {},
  } = props;
  const intl = useIntl();
  const lang = useRef('US');

  //切换语言
  const setLang = (lang: string) => {
    setLocale(lang, true);
  };

  return (
    <Layout.Footer
      className={`${
        location && location.pathname.indexOf('/personal') > -1
          ? styles['footer-fix']
          : ''
      } ${styles['footer']}`}
    >
      <div className={styles['ft-l']}>
        <div className={styles['logo']}>
          <Link to="/">
            <img src={require('@/assets/common/img/logo.png')} />
          </Link>
        </div>
        <div className={styles['cp']}>
          <p>© COPYRIGHT</p>
          <p>2022 MetaOne Global Inc. All rights reserved</p>
        </div>
      </div>
      <div className={styles['ft-r']}>
        <dl>
          <dt>{intl.formatMessage({ id: 'FOLLOW_US' })}</dt>
          <dd>
            <SocialMediaList className={styles['social-media']} />
          </dd>
        </dl>
      </div>
    </Layout.Footer>
  );
};

export default connect(({ common }: { common: objectT }) => ({
  common,
}))(Footer);
