import React, { useState } from 'react';
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
            <ul>
              <li>Движение вправо: стрелка вправо</li>
              <li>Движение влево: стрелка влево</li>
              <li>Прыжок: стрелка вверх</li>
              <li>Нанести удар: пробел</li>
            </ul>
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