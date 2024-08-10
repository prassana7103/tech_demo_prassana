// app/components/TopGainersLosersTable.js
"use client";

export default function TopGainersLosersTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Stock Name</th>
          <th>Close Price</th>
          <th>Change in Percent</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.stock_name}</td>
            <td>{item.close_price ? item.close_price.toFixed(2) : 'N/A'}</td>
            <td>{item.change_in_percent ? item.change_in_percent.toFixed(2) : 'N/A'}%</td>
            <td>{item.date || 'N/A'}</td> {/* Ensure date is displayed */}
          </tr>
        ))}
      </tbody>
      <style jsx>{`
          /* app/globals.css */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
  }
  
  h1 {
    color: #333;
    text-align: center;
    margin-top: 20px;
  }
  
  table {
    width: 90%;
    margin: 20px auto;
    border-collapse: collapse;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  th {
    background-color: #0070f3;
    color: #fff;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
  
  nav {
    background-color: #0070f3;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  nav a {
    color: #fff;
    margin: 0 10px;
    text-decoration: none;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  
        `}</style>
    </table>
  );
}
