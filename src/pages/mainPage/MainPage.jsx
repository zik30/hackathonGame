import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './MainPage.module.scss'
import Instruction from '../instruction/Inctruction'
import RegistrationModal from "../../modules/RegistrationModal/RegistrationModal.jsx";
const MainPage = () => {
    const [modal, setModal] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setModal(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const onCloseModal = ()=>{
        setModal(false)
    }
  return (
    <div className={styles.bgc}>
        <div className={styles.container}>
        <header>
            <h1>COINHUNTERS</h1>
            <ul>
                <Link to='/liderBoard'>
                    <li>leaderBoard</li>
                </Link>
            </ul>
        </header>
        <main>
            <h2>COINHUNTERS</h2>
            <p>Исследуй карту и открывай новые способности</p>
            <div className={styles.buttons}>
                <Link to="/game">
                    <button>Играть</button>
                </Link>
                <Link to="#">
                    <Instruction />
                </Link>
                <RegistrationModal modal={modal} onClose={onCloseModal}/>
            </div>
        </main>
        </div>
    </div>
  )
}

export default MainPage