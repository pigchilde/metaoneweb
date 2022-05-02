import styles from './index.scss';
import React from 'react';
import { Collapse } from 'antd';
const Helps = () => {
  const { Panel } = Collapse;
  function callback() {
    console.log('ss');
  }

  const text = `
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
      `;
  return (
    <div className={styles['help-wrapper']}>
      <header className={styles.banner}>
        <div className="wrapper">
          <h1>Help center</h1>
          <p>Are you in trouble? We hope we can give you an answer here.</p>
        </div>
      </header>
      <div className={`wrapper ${styles['help-list']}`}>
        <Collapse defaultActiveKey={['1']} onChange={callback}>
          <Panel header="why play gamefi?" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="why metaone?" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="Why create a guild in metaone?" key="3">
            <p>{text}</p>
          </Panel>
          <Panel
            header="why join guild in metaone? Hover  Hover  Hover  Hover  Hover"
            key="4"
          >
            <p>{text}</p>
          </Panel>
          <Panel header="How to find a good game" key="5">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
export default Helps;
