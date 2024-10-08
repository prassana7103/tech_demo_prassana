CREATE DATABASE IF NOT EXISTS stock_db;

USE stock_db;


CREATE TABLE IF NOT EXISTS stock_data_stocklist (
    id INT PRIMARY KEY,
    symbol VARCHAR(10)
);

INSERT INTO stock_data_stocklist (id, symbol) VALUES
('1', 'AAPL'),
('36', 'ABBV'),
('30', 'ABT'),
('41', 'ACN'),
('20', 'ADBE'),
('47', 'AMGN'),
('4', 'AMZN'),
('44', 'AVGO'),
('40', 'BMY'),
('22', 'CMCSA'),
('38', 'COST'),
('35', 'CRM'),
('28', 'CSCO'),
('49', 'CVX'),
('48', 'DHR'),
('15', 'DIS'),
('3', 'GOOGL'),
('14', 'HD'),
('43', 'HON'),
('27', 'INTC'),
('9', 'JNJ'),
('23', 'KO'),
('32', 'LLY'),
('17', 'MA'),
('33', 'MCD'),
('34', 'MDT'),
('25', 'MRK'),
('2', 'MSFT'),
('42', 'NEE'),
('18', 'NFLX'),
('24', 'NKE'),
('12', 'NVDA'),
('46', 'ORCL'),
('26', 'PEP'),
('21', 'PFE'),
('11', 'PG'),
('50', 'PM'),
('16', 'PYPL'),
('29', 'T'),
('37', 'TMO'),
('6', 'TSLA'),
('45', 'TXN'),
('13', 'UNH'),
('10', 'V'),
('19', 'VZ'),
('39', 'WMT'),
('31', 'XOM');
