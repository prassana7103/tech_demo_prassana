'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MonthlyYearlyStockTable from '../components/MonthlyYearlyStockTable';
import withAuth from '../hoc/withAuth';
import { useRouter } from 'next/navigation';
import styles from '../styles/Toggle.module.css';

const MonthlyPage = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [isFavorite, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const res = await axios.get(`http://192.168.105.5:30001/stock_data/report/?is_fav=${isFavorite}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (res.status === 200) {
        const data = res.data.map(item => ({
          stock_name: item.stock_name,
          open_price: item.report_monthly?.open_price,
          close_price: item.report_monthly?.close_price,
          change_in_percent: item.report_monthly?.change_in_percent,
          from_date: item.report_monthly?.from_date,
          to_date: item.report_monthly?.to_date
        }));
  
        setStockData(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Error fetching stock data. Please try again.');
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Monthly Stock Data</h1>
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
      <MonthlyYearlyStockTable data={stockData} />
    </div>
  );
};

export default withAuth(MonthlyPage);