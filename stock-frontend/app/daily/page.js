"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import DailyStockTable from '../components/DailyStockTable';
import withAuth from '../hoc/withAuth';
import styles from '../styles/Toggle.module.css';

const DailyStockPage = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [isFavorite, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');

      const res = await axios.get(`http://192.168.105.6:30001/stock_data/report/?is_fav=${isFavorite}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setStockData(res.data.map(item => ({
        stock_name: item.stock_name,
        close_price: item.report_today.close_price,
        change_in_percent: item.report_today.change_in_percent,
        date: item.report_today.to_date
      })));
    } catch (error) {
      console.error('Error fetching stock data:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Daily Stock Data</h1>
      <div className={styles.toggleContainer}>
        <span>All Stocks</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={toggleFavorite}
          />
          <span className={styles.slider}></span>
        </label>
        <span>Favorite Stocks</span>
      </div>
      <DailyStockTable data={stockData} />
    </div>
  );
};

export default withAuth(DailyStockPage);