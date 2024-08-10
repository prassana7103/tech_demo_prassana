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
        const userId = localStorage.getItem('user_id');

        const [stocksRes, favoritesRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/stock_data/liststocks/', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get(`http://127.0.0.1:8000/user_stock/user/${userId}`, {
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
        await axios.delete(`http://127.0.0.1:8000/user_stock/user/${userId}/stock/${stockId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setFavorites(favorites.filter(id => id !== stockId));
      } else {
        // Add to favorites
        await axios.post('http://127.0.0.1:8000/stock_data/user_stock/create_by_list/', 
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
            <th>Price</th>
            <th>Change</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.name}</td>
              <td>{stock.price}</td>
              <td>{stock.change}%</td>
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