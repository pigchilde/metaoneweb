import styles from './index.scss';
import { Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import PersonalSider from './components/PersonalSider';
import FixedSider from './components/FixedSider';
import { useState } from 'react';
import { setLocale } from 'umi';
import moment from 'moment';
// import 'moment/locale/en';

const { Content, Sider } = Layout;
interface objectT {
  [propName: string]: any;
}

const BasicLayout = (props: any) => {
  moment.locale('en');
  const { location = {} } = props;
  const [collapsed, setCollapsed] = useState(false as boolean);
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  setLocale('en-US', true);
  return (
    <Layout>
      <Header />

      {location.pathname.indexOf('/personal') > -1 ? (
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            className={styles['personal-sider']}
            width={410}
            trigger={null}
            breakpoint="xxl"
          >
            <PersonalSider
              onCollapse={onCollapse}
              collapsed={collapsed}
            ></PersonalSider>
          </Sider>
          <Content>{props.children}</Content>
        </Layout>
      ) : (
        <Content>{props.children}</Content>
      )}

      <Footer />
      <FixedSider />
    </Layout>
  );
};
export default BasicLayout;
