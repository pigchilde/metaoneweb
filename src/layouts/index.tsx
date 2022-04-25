import styles from './index.less';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;
interface objectT {
  [propName: string]: any;
}

const BasicLayout = (props: any) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content> {props.children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default BasicLayout;
