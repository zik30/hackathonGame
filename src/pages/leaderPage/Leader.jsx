import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import styles from './Leader.module.scss'
import axios from 'axios';

const columns = [
    {
        title: '№',
        dataIndex: 'id',
        key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    }
];

const players = [
    { name: "Alice", score: 87 },
    { name: "Bob", score: 92 },
    { name: "Charlie", score: 74 },
    { name: "Diana", score: 88 },
    { name: "Ethan", score: 63 },
    { name: "Fiona", score: 95 },
    { name: "George", score: 81 },
    { name: "Hannah", score: 78 },
    { name: "Ivan", score: 90 },
    { name: "Julia", score: 69 },
    { name: "Kevin", score: 85 },
    { name: "Luna", score: 91 },
    { name: "Mike", score: 77 },
    { name: "Nina", score: 89 },
    { name: "Oscar", score: 66 },
    { name: "Paula", score: 94 },
    { name: "Quinn", score: 72 },
    { name: "Rachel", score: 83 },
    { name: "Steve", score: 76 },
    { name: "Tina", score: 97 }
];

  

function Leader() {


  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.text}>
                <h2 className={styles.title}>Leader Bord</h2>
                <h2 className={styles.p}>Посмотри   на   результаты</h2>
            </div>
            <table>
              <thead>
                  {/* <div> */}
                <tr>
                  {
                    columns.map((column, i) => (
                      <th key={i} className={styles.tableHeader}>
                        {column.title}
                      </th>
                    ))
                  }
                </tr>
                  {/* </div> */}
              </thead>
              <tbody>
                {
                  players.map((player, i) => (
                    <tr key={i} className={styles.tableRow}>
                      <td>{i + 1}</td>
                      <td>{player.name}</td>
                      <td>{player.score}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div>
    </div>
  )
}

export default Leader