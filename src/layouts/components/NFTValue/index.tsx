import styles from './index.scss';
import { Layout, Button } from 'antd';
import { Link, useIntl, connect } from 'umi';
import SocialMediaList from '@/components/SocialMediaList';

interface objectT {
  [propName: string]: any;
}

const NFTValue = (props: objectT) => {
  const {
    location: {},
  } = props;
  const intl = useIntl();

  return <></>;
};

export default connect(({ common }: { common: objectT }) => ({
  common,
}))(NFTValue);
