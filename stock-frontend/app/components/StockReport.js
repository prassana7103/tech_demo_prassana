import StockItem from './StockItem';

export default function StockReport({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <StockItem key={index} item={item} />
      ))}
    </div>
  );
}
