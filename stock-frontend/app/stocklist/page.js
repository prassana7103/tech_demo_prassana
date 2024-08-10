"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import withAuth from '../hoc/withAuth';

const StockListPage = () => {
  const [stocks, setStocks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');

        const [stocksRes, favoritesRes] = await Promise.all([
          axios.get('http://192.168.105.5:30001/stock_data/liststocks/', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get(`http://192.168.105.5:30001/stock_data/user_stock/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        setStocks(stocksRes.data);
        setFavorites(favoritesRes.data.map(fav => fav.stock_id));
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const toggleFavorite = async (stockId) => {
    try {
      const token = localStorage.getItem('access_token');
      const userId = localStorage.getItem('user_id');

      if (favorites.includes(stockId)) {
        // Remove from favorites
        await axios.delete(`http://192.168.105.5:30001/stock_data/user_stock_delete/${stockId}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setFavorites(favorites.filter(id => id !== stockId));
      } else {
        // Add to favorites
        await axios.post('http://192.168.105.5:30001/stock_data/user_stocks/create_by_list/', 
          { stock_ids: [stockId] },
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        setFavorites([...favorites, stockId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stock List</h1>
      <table>
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.symbol}</td>
              <td>
                <button onClick={() => toggleFavorite(stock.id)}>
                  {favorites.includes(stock.id) ? '❤️' : '🤍'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withAuth(StockListPage);