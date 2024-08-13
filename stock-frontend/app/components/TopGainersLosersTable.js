"use client";

import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function TopGainersLosersTable({ data }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = () => {
    setIsDownloading(true);
    const doc = new jsPDF();

    doc.autoTable({
      head: [['Stock Name', 'Close Price', 'Change in Percent', 'Date']],
      body: data.map(item => [
        item.stock_name,
        item.close_price ? item.close_price.toFixed(2) : 'N/A',
        item.change_in_percent ? `${item.change_in_percent.toFixed(2)}%` : 'N/A',
        item.date || 'N/A'
      ]),
    });

    doc.save('top_gainers_losers_table.pdf');
    setIsDownloading(false);
  };

  return (
    <div>
      <button 
        onClick={downloadPDF} 
        disabled={isDownloading}
      >
        {isDownloading ? 'Downloading...' : 'Download as PDF'}
      </button>
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
              <td>{item.change_in_percent ? `${item.change_in_percent.toFixed(2)}%` : 'N/A'}</td>
              <td>{item.date || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}