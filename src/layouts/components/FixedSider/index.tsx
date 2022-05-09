import styles from './index.scss';
import { useIntl } from 'umi';
import { useEffect, useState } from 'react';

const FixedSider = () => {
  const intl = useIntl();
  const [toTopVisible, setToTopVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector('.ant-layout');
    // 监听页面滚动
    scrollContainer?.addEventListener('scroll', () => {
      var scrollTop = scrollContainer.scrollTop;
      if (scrollTop > 800) {
        setToTopVisible(true);
      } else {
        setToTopVisible(false);
      }
    });
  }, []);

  // 回到顶部
  const go2top = () => {
    const scrollContainer = document.querySelector('.ant-layout');
    if (!scrollContainer) {
      return;
    }
    const timer = window.setInterval(() => {
      let pos = scrollContainer.scrollTop;
      if (pos > 0) {
        scrollContainer.scrollTop = pos - 50;
      } else {
        window.clearInterval(timer);
      }
    }, 1);
  };

  return (
    <div className={styles['fixed-sider']}>
      <div
        className={styles['btn-top']}
        onClick={go2top}
        hidden={!toTopVisible}
      >
        {intl.formatMessage({ id: 'COMMON_TO_TOP' })}
      </div>
    </div>
  );
};

export default FixedSider;
