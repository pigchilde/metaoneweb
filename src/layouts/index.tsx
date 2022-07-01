import styles from './index.scss';
import { Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import PersonalSider from './components/PersonalSider';
import FixedSider from './components/FixedSider';
import { useEffect, useRef, useState } from 'react';
import { connect, setLocale } from 'umi';
import moment from 'moment';
import Cookies from 'js-cookie';
// import 'moment/locale/en';

const { Content, Sider } = Layout;
interface objectT {
  [propName: string]: any;
}

const BasicLayout = (props: any) => {
  moment.locale('en');
  const pageRef = useRef({} as HTMLBodyElement);
  const {
    location = {},
    dispatch,
    login: { userInfo },
  } = props;
  const { pathname, search } = location;
  const [collapsed, setCollapsed] = useState(false as boolean);
  const [queryKey, setQueryKey] = useState('' as unknown as boolean);
  const [sideH, setSideH] = useState(200 as number);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const onResize = () => {
    const cw = document.body.clientWidth;
    setSideH(
      document.body.clientHeight -
        (cw > 1300 ? (cw > 1500 ? (cw > 1680 ? 255 : 235) : 170) : 150),
    );
  };

  useEffect(() => {
    if (pathname.indexOf('/news/') > -1) {
      pageRef.current.scrollTop = 330;
    } else {
      pageRef.current.scrollTop = 0;
    }
  }, [pathname, search]);

  useEffect(() => {
    const cw = document.body.clientWidth;
    setSideH(
      document.body.clientHeight -
        (cw > 1300 ? (cw > 1500 ? (cw > 1680 ? 255 : 235) : 170) : 150),
    );
    window.addEventListener('resize', onResize);
    if (userInfo.uid) {
      // 已登录
      return;
    }
    // 未登录
    const token = Cookies.get('token');
    if (token) {
      dispatch({
        type: 'login/getUserInfo',
      });
    }
  }, []);

  useEffect(() => {
    // 获取社交媒体平台列表
    dispatch({
      type: 'common/getSocialMediaList',
    });

    // 获取站点信息
    dispatch({
      type: 'common/getPlatformInfo',
    });
  }, []);

  setLocale('en-US', true);
  return (
    <Layout className={styles['page-layout']} ref={pageRef}>
      <Header pathname={pathname} />

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
              sideHeight={sideH}
            ></PersonalSider>
          </Sider>
          <Content
            className={`${styles['content']} ${
              collapsed ? styles['close'] : styles['open']
            }`}
          >
            {props.children}
          </Content>
        </Layout>
      ) : (
        <Content>{props.children}</Content>
      )}

      <Footer location={location} />
      <FixedSider />
    </Layout>
  );
};
export default connect(({ login }: { login: objectT }) => ({
  login,
}))(BasicLayout);
