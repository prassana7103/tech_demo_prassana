// app/components/MonthlyYearlyStockTable.js
"use client";


export default function MonthlyYearlyStockTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Stock Name</th>
          <th>Open Price</th>
          <th>Close Price</th>
          <th>Percent Change</th>
          <th>From Date</th>
          <th>To Date</th>
        </tr>
      </thead>
      <tbody>
      {data.map((item, index) => (
          <tr key={index}>
            <td>{item.stock_name}</td>
            <td>{item.open_price ? item.open_price.toFixed(2) : 'N/A'}</td>
            <td>{item.close_price ? item.close_price.toFixed(2) : 'N/A'}</td>
            <td>{item.change_in_percent ? item.change_in_percent.toFixed(2) : 'N/A'}%</td>
            <td>{item.from_date || 'N/A'}</td>
            <td>{item.to_date || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
