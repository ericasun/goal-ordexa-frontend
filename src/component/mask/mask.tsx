import { Spin } from 'antd';
import styles from "./mask.module.scss";

const Mask = ({ visible = false, text = '加载中...' }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className={styles.marks}>
      <Spin tip={text} size="large" />
    </div>
  );
};

export default Mask;
