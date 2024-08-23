'use client';

import axios from 'axios';
import TopGainersLosersTable from '../components/TopGainersLosersTable';
import withAuth from '../hoc/withAuth';

const TopGainersLosersPage = async () => {
  let stockData = [];

  try {
    const token = localStorage.getItem('access_token'); 

    const res = await axios.get('http://192.168.105.6:30001/stock_data/report/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    stockData = res.data.map(item => ({
      stock_name: item.stock_name,
      close_price: item.report_today?.close_price,
      change_in_percent: item.report_today?.change_in_percent,
      date: item.report_today?.to_date
    }));
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }

  const topGainers = stockData.filter(item => item.change_in_percent > 0).sort((a, b) => b.change_in_percent - a.change_in_percent).slice(0, 10);
  const topLosers = stockData.filter(item => item.change_in_percent < 0).sort((a, b) => a.change_in_percent - b.change_in_percent).slice(0, 10);

  return (
    <div>
      <h1>Top Gainers</h1>
      <TopGainersLosersTable data={topGainers} />
      <h1>Top Losers</h1>
      <TopGainersLosersTable data={topLosers} />
    </div>
  );
};

export default withAuth(TopGainersLosersPage);
