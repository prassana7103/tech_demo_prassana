export default function StockItem({ item }) {
    const { report_today, report_monthly, report_yearly, stock_name } = item;
  
    return (
      <div className="stock-item">
        <h2>{stock_name}</h2>
        <div className="report-section">
          <h3>Today's Report</h3>
          <p>Open Price: {report_today.open_price}</p>
          <p>Close Price: {report_today.close_price}</p>
          <p>Change in Price: {report_today.change_in_price}</p>
          <p>Change in Percent: {report_today.change_in_percent}%</p>
          <p>From Date: {report_today.from_date}</p>
          <p>To Date: {report_today.to_date}</p>
        </div>
        <div className="report-section">
          <h3>Monthly Report</h3>
          <p>Open Price: {report_monthly.open_price}</p>
          <p>Close Price: {report_monthly.close_price}</p>
          <p>Change in Price: {report_monthly.change_in_price}</p>
          <p>Change in Percent: {report_monthly.change_in_percent}%</p>
          <p>From Date: {report_monthly.from_date}</p>
          <p>To Date: {report_monthly.to_date}</p>
        </div>
        <div className="report-section">
          <h3>Yearly Report</h3>
          <p>Open Price: {report_yearly.open_price}</p>
          <p>Close Price: {report_yearly.close_price}</p>
          <p>Change in Price: {report_yearly.change_in_price}</p>
          <p>Change in Percent: {report_yearly.change_in_percent}%</p>
          <p>From Date: {report_yearly.from_date}</p>
          <p>To Date: {report_yearly.to_date}</p>
        </div>
      </div>
    );
  }
  