import React from 'react'
import { Link } from 'react-router-dom'
import styles from './MainPage.module.scss'
import Instruction from '../instruction/Inctruction'
const MainPage = () => {
  return (
    <div className={styles.bgc}>
        <div className={styles.container}>
        <header>
            <h1>COINHUNTERS</h1>
            <ul>
                <Link to='/leader'>
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
                
            </div>
        </main>
        </div>
    </div>
  )
}

export default MainPage