type SubType =
  | 'president'
  | 'district'
  | 'mountainIndigenous'
  | 'plainIndigenous'
  | 'party';

const subTypeMapping: { title: string; name: SubType }[] = [
  { title: '總統', name: 'president' },
  { title: '立法委員', name: 'district' },
  { title: '山地原住民立委', name: 'mountainIndigenous' },
  { title: '平地原住民立委', name: 'plainIndigenous' },
  { title: '不分區立委', name: 'party' },
];

type Districts =
  | 'taipeiCity'
  | 'newTaipeiCity'
  | 'taoyuanCity'
  | 'taichungCity'
  | 'tainanCity'
  | 'kaohsiungCity'
  | 'keelungCity'
  | 'hsinchuCounty'
  | 'hsinchuCity'
  | 'miaoliCounty'
  | 'changhuaCounty'
  | 'nantouCounty'
  | 'yunlinCounty'
  | 'chiayiCounty'
  | 'pingtungCounty'
  | 'yilanCounty'
  | 'hualienCounty'
  | 'taitungCounty'
  | 'penghuCounty'
  | 'kinmenCounty'
  | 'lienchiangCounty'
  | 'chiayiCity';

const districtsMapping: { title: string; name: string }[] = [
  { title: '臺北市', name: 'taipeiCity' },
  { title: '新北市', name: 'newTaipeiCity' },
  { title: '桃園市', name: 'taoyuanCity' },
  { title: '臺中市', name: 'taichungCity' },
  { title: '臺南市', name: 'tainanCity' },
  { title: '高雄市', name: 'kaohsiungCity' },
  { title: '基隆市', name: 'keelungCity' },
  { title: '新竹縣', name: 'hsinchuCounty' },
  { title: '新竹市', name: 'hsinchuCity' },
  { title: '苗栗縣', name: 'miaoliCounty' },
  { title: '彰化縣', name: 'changhuaCounty' },
  { title: '南投縣', name: 'nantouCounty' },
  { title: '雲林縣', name: 'yunlinCounty' },
  { title: '嘉義縣', name: 'chiayiCounty' },
  { title: '屏東縣', name: 'pingtungCounty' },
  { title: '宜蘭縣', name: 'yilanCounty' },
  { title: '花蓮縣', name: 'hualienCounty' },
  { title: '臺東縣', name: 'taitungCounty' },
  { title: '澎湖縣', name: 'penghuCounty' },
  { title: '金門縣', name: 'kinmenCounty' },
  { title: '連江縣', name: 'lienchiangCounty' },
  { title: '嘉義市', name: 'chiayiCity' },
];

export { subTypeMapping, districtsMapping };
export type { SubType, Districts };
