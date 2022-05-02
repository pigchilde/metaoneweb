import { Link } from 'umi';
import styles from './index.scss';
import { useIntl } from 'umi';
import defaultPic from '../../../assets/personal/pic/avatar.jpg';
import { Button, Radio, Tabs, Select } from 'antd';
import { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import { Line } from '@ant-design/plots';
const { TabPane } = Tabs;
const { Option } = Select;
interface objectT {
  [propName: string]: any;
}

const guild = () => {
  const [radioValue, setRadioValue] = useState('large' as string);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json',
    )
      .then((response) => response.json())
      .then((json) => setLineData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const intl = useIntl();
  const handleChange = () => {};
  const lineConfig = {
    data: lineData,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: (v: number) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <>
      <Link to="/" className={styles['back']}>
        {'< '}
        {intl.formatMessage({
          id: 'PERSONAL_GUILD_BACK',
        })}
      </Link>
      <div className={styles['main']}>
        <div className={styles['box']}>
          <p className={styles['txt-item']}>
            <span>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_TXT1',
              })}
            </span>
            <span>ER5FVL8B</span>
            <span className={styles['copy']}>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_COPY',
              })}
            </span>
          </p>
          <p className={styles['txt-item']}>
            <span>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_TXT2',
              })}
            </span>
            <span className={styles['link']}>ER5FVL8B</span>
            <span className={styles['copy']}>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_COPY1',
              })}
            </span>
          </p>
        </div>
        <div className={styles['box']}>
          <p className={styles['txt-wallet']}>
            <span>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_TXT3',
              })}
            </span>
            <Link to={`/personal/guild/wallet`} className={styles['view']}>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_VIEW',
              })}
            </Link>
          </p>
        </div>
        <div className={styles['box']}>
          <ul className={styles['ico-list']}>
            <li className={`${styles['ico-item']} ${styles['ico-item1']}`}>
              <p className={styles['txt']}>
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_TXT4',
                })}
              </p>
              <p className={styles['txt1']}>
                <strong>87675</strong>
              </p>
            </li>
            <li className={`${styles['ico-item']} ${styles['ico-item2']}`}>
              <p className={styles['txt']}>
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_TXT5',
                })}
              </p>
              <p className={styles['txt1']}>
                <strong>87675</strong>
              </p>
            </li>
            <li className={`${styles['ico-item']} ${styles['ico-item3']}`}>
              <p className={styles['txt']}>
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_TXT6',
                })}
              </p>
              <p className={styles['txt1']}>
                <strong>87675</strong>
              </p>
            </li>
            <li className={`${styles['ico-item']} ${styles['ico-item4']}`}>
              <p className={styles['txt']}>
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_TXT7',
                })}
              </p>
              <p className={styles['txt1']}>
                <strong>87675</strong>
              </p>
            </li>
          </ul>
        </div>

        <div className={styles['chart-box']}>
          <div className={`${styles['box']} ${styles['box1']}`}>
            <h6 className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_TXT8',
              })}
            </h6>
            <Pie {...config} />
          </div>
          <div className={`${styles['box']} ${styles['box2']}`}>
            <h6 className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_TXT9',
              })}
            </h6>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              className={styles['line-select']}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
            <Line {...lineConfig} />
          </div>
        </div>
      </div>
    </>
  );
};
export default guild;
