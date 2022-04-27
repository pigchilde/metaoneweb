import styles from './index.less';
import { Layout, Menu } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';

const { Content } = Layout;
interface objectT {
  [propName: string]: any;
}

const BasicLayout = (props: any) => {
  return (
    <Layout>
      <Header />
      <Content> {props.children}</Content>
      <Footer />
    </Layout>
  );
};
export default BasicLayout;
