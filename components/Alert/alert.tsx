import { useCallback } from 'react';
import styles from './alert.module.css';

interface IAlert {
  type: String;
  message: String;
}

const Alert: React.FC<IAlert> = ({ type, message }) => {
  const renderAlertMessage = useCallback(() => {
      console.log('> Aqui')
    if (type === "Sucess") {
      return (
        <p style={{ color: '#55C1FF', zIndex: 99 }}>{message}</p>
      )
    }

    if (type === "Error") {
      return (
        <p style={{ color: '#FD151B', zIndex: 99 }}>{message}</p>
      )
    }
  }, [type]);

  return (
    <div className={styles.alert_message}>
      { renderAlertMessage()}
    </div>
  );
};

export default Alert;