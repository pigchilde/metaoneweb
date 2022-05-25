import { useEffect } from 'react';
import { connect } from 'umi';
import styles from './index.scss';

interface objectT {
  [propName: string]: any;
}

const SocialMediaList = (props: objectT) => {
  const {
    common: { socialMediaList },
    className,
  } = props;

  return (
    <div className={`${styles['social-media']} ${className}`}>
      {socialMediaList && socialMediaList.length
        ? socialMediaList.map((item: objectT) =>
            item.status ? (
              <a href={item.url} target="_blank" title="" key={item.id}>
                <img src={item.logo} alt={item.name} />
              </a>
            ) : null,
          )
        : null}
    </div>
  );
};

export default connect(({ common }: { common: objectT }) => ({
  common,
}))(SocialMediaList);
