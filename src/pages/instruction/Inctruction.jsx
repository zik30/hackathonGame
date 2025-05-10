import React, { useState } from 'react';
import { ArrowUpOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'; // Импорт иконок
import styles from './Instruction.module.scss';

const Instruction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <div>
      <button onClick={toggleModal} className={styles.openButton}>
        Правила
      </button>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Правила игры</h2>
            <p>Управление:</p>
            <div className={styles.controls}>
              <div className={styles.row}>
                <div className={styles.key}>
                  <ArrowUpOutlined />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.key}>
                  <ArrowLeftOutlined />
                </div>
                <div className={`${styles.key} ${styles.spaceKey}`}>
                  <span>Пробел</span>
                </div>
                <div className={styles.key}>
                  <ArrowRightOutlined />
                </div>
              </div>
            </div>
            <div className={styles.explanation}>
                <div className={styles.text}>
                    <div className={styles.key}>
                        <ArrowUpOutlined />
                    </div> 
                    <span>— Прыжок</span>
                </div>
                <div className={styles.text}>
                    <div className={styles.key}>
                        <ArrowLeftOutlined />
                    </div> 
                    <span>— Движение влево</span>
                </div>
                <div className={styles.text}>
                    <div className={styles.key}>
                        <ArrowRightOutlined />
                    </div> 
                    <span>— Движение вправо</span>
                </div>
                <div className={styles.text}>
                    <div className={`${styles.key} ${styles.spaceKey}`}>
                        <span>Пробел</span>
                    </div> 
                    <span>— Удар</span>
                </div>
            </div>
            <button onClick={toggleModal} className={styles.closeButton}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instruction;