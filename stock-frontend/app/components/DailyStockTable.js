

// app/components/DailyStockTable.js
"use client";

export default function DailyStockTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Stock Name</th>
          <th>Closing Price</th>
          <th>Percent Change</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      {data.map((item, index) => (
          <tr key={index}>
            <td>{item.stock_name}</td>
            <td>{item.close_price.toFixed(2)}</td>
            <td>{item.change_in_percent.toFixed(2)}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

