'use client';

import axios from 'axios';
import DailyStockTable from '../components/DailyStockTable';
import withAuth from '../hoc/withAuth';

const DailyStockPage = async () => {
  try {
    // Get the token from local storage
    const token = localStorage.getItem('access_token'); 

    // Log the token to ensure it's available
    console.log('Token:', token);

    const res = await axios.get('http://192.168.105.6:30001/stock_data/report/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Log the entire response for debugging
    console.log('Response:', res);

    const stockData = res.data.map(item => ({
      stock_name: item.stock_name,
      close_price: item.report_today.close_price,
      change_in_percent: item.report_today.change_in_percent,
      date: item.report_today.to_date
    }));

    // Log the processed stock data
    console.log('Stock Data:', stockData);

    return (
      <div>
        <h1>Daily Stock Data</h1>
        <DailyStockTable data={stockData} />
      </div>
    );
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
    return <div>Error loading stock data.</div>;
  }
};

export default withAuth(DailyStockPage);
