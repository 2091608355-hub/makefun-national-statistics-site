// Numbers for the China statistics explorer.
// Every number below comes from the National Bureau of Statistics of China
// and covers 2024, with a ten-year run for output. Amounts are yuan except
// where a note says otherwise; population counts are in millions.

export const ABOUT = {
  place: 'China',
  edition: 2024,
  publisher: 'National Bureau of Statistics of China',
  refreshed: '26 November 2026',
};

// The six headline tiles on the front page.
export const HEADLINE = [
  { id: 'pop', heading: 'People', reading: '1,408.3m', shift: 'down 1.39m on 2023', aside: 'counted at year end' },
  { id: 'output', heading: 'National output', reading: '¥134.9tr', shift: 'up 5.0% in real terms', aside: 'about $18.5tr' },
  { id: 'perhead', heading: 'Output per person', reading: '¥95,749', shift: 'up 5.1% in real terms', aside: 'about $13,100' },
  { id: 'lifespan', heading: 'Expected lifespan', reading: '79.0 years', shift: 'up 0.3 years', aside: 'measured at birth' },
  { id: 'cities', heading: 'City dwellers', reading: '67.0%', shift: 'up 0.84 points', aside: '943.5m people in towns and cities' },
  { id: 'jobs', heading: 'City jobless rate', reading: '5.1%', shift: 'down 0.1 points', aside: 'surveyed, yearly average' },
];

// Output in trillions of yuan, with the real growth rate beside each year.
export const YEARLY_OUTPUT = [
  { yr: 2015, total: 68.9, pace: 7.0 },
  { yr: 2016, total: 74.6, pace: 6.8 },
  { yr: 2017, total: 83.2, pace: 6.9 },
  { yr: 2018, total: 91.9, pace: 6.7 },
  { yr: 2019, total: 98.7, pace: 6.0 },
  { yr: 2020, total: 101.4, pace: 2.2 },
  { yr: 2021, total: 114.9, pace: 8.6 },
  { yr: 2022, total: 120.5, pace: 3.0 },
  { yr: 2023, total: 126.1, pace: 5.2 },
  { yr: 2024, total: 134.9, pace: 5.0 },
];

// How the population splits by age at the end of 2024.
export const AGE_SPLIT = [
  { band: '0–14', headcount: 232, portion: 16.5 },
  { band: '15–59', headcount: 857, portion: 60.9 },
  { band: '60 and over', headcount: 310, portion: 22.0 },
  { band: '65 and over', headcount: 220, portion: 15.6 },
];

// Where output comes from, 2024: value added in trillions of yuan.
export const SECTOR_MIX = [
  { sector: 'Services', portion: 54.6, added: 73.7, tint: '#1e40af' },
  { sector: 'Industry', portion: 38.3, added: 51.7, tint: '#0e7490' },
  { sector: 'Farming', portion: 7.1, added: 9.6, tint: '#4d7c0f' },
];

// Buying, selling and prices in 2024.
export const TRADE_BOARD = [
  { item: 'Exports of goods', reading: '¥25.45tr', shift: '+7.1%' },
  { item: 'Imports of goods', reading: '¥18.39tr', shift: '+2.3%' },
  { item: 'Goods surplus', reading: '¥7.06tr', shift: '+21.1%' },
  { item: 'Shop prices (CPI)', reading: '+0.2%', shift: 'yearly average' },
  { item: 'Shop takings', reading: '¥48.79tr', shift: '+3.5%' },
  { item: 'Investment in fixed assets', reading: '¥51.44tr', shift: '+3.2%' },
  { item: 'Income per person, after tax', reading: '¥41,314', shift: '+5.3%' },
  { item: 'Research spending', reading: '¥3.61tr', shift: '2.7% of output' },
];

// The biggest ten provinces by output, 2024.
export const PROVINCE_RANK = [
  { province: 'Guangdong', output: 14.16, residents: 127.4, seat: 'Guangzhou' },
  { province: 'Jiangsu', output: 13.70, residents: 85.3, seat: 'Nanjing' },
  { province: 'Shandong', output: 9.86, residents: 101.9, seat: 'Jinan' },
  { province: 'Zhejiang', output: 9.01, residents: 66.6, seat: 'Hangzhou' },
  { province: 'Sichuan', output: 6.47, residents: 83.8, seat: 'Chengdu' },
  { province: 'Henan', output: 6.36, residents: 98.1, seat: 'Zhengzhou' },
  { province: 'Hubei', output: 6.00, residents: 58.5, seat: 'Wuhan' },
  { province: 'Fujian', output: 5.77, residents: 41.9, seat: 'Fuzhou' },
  { province: 'Shanghai', output: 5.39, residents: 24.8, seat: 'Shanghai' },
  { province: 'Hunan', output: 5.32, residents: 65.6, seat: 'Changsha' },
];

// Health and schooling in 2024.
export const WELLBEING = [
  { item: 'Hospital beds, per 10,000 people', reading: '75.6' },
  { item: 'Doctors, per 10,000 people', reading: '33.9' },
  { item: 'Babies lost in their first year', reading: '4.0‰' },
  { item: 'Mothers lost per 100,000 births', reading: '14.3' },
  { item: 'Young people in higher education', reading: '62.6%' },
  { item: 'Students at university', reading: '47.6m' },
  { item: 'Finishing nine years of school', reading: '95.9%' },
  { item: 'Public libraries', reading: '3,311' },
];

// Land, energy and the built country in 2024.
export const GREEN_GRID = [
  { item: 'Land covered by forest', reading: '25.1%' },
  { item: 'New-energy cars built', reading: '12.89m' },
  { item: 'Solar power installed', reading: '887 GW' },
  { item: 'Wind power installed', reading: '521 GW' },
  { item: 'Grain harvested', reading: '706.5m t' },
  { item: 'Fast rail in service', reading: '48,000 km' },
  { item: '5G masts', reading: '4.25m' },
  { item: 'Parcels delivered', reading: '193.7bn' },
];
