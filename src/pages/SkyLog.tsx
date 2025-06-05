import { useState } from 'react';
import { Select, DatePicker, DatePickerProps, Card, Button } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const apiUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore`;
const AuthorizationCode = 'CWA-0B9E9FF2-A15F-4F00-9826-83EE0954FF33';
const limit = null;

const locations: { label: string; value: string }[] = [
  {
    label: '宜蘭縣',
    value: 'F-D0047-003',
  },
  {
    label: '桃園市',
    value: 'F-D0047-007',
  },
  {
    label: '新竹縣',
    value: 'F-D0047-011',
  },
  {
    label: '苗栗縣',
    value: 'F-D0047-015',
  },
  {
    label: '彰化縣',
    value: 'F-D0047-019',
  },
  {
    label: '南投縣',
    value: 'F-D0047-023',
  },
  {
    label: '雲林縣',
    value: 'F-D0047-027',
  },
  {
    label: '嘉義縣',
    value: 'F-D0047-031',
  },
  {
    label: '屏東縣',
    value: 'F-D0047-035',
  },
  {
    label: '臺東縣',
    value: 'F-D0047-039',
  },
  {
    label: '花蓮縣',
    value: 'F-D0047-043',
  },
  {
    label: '澎湖縣',
    value: 'F-D0047-047',
  },
  {
    label: '基隆市',
    value: 'F-D0047-051',
  },
  {
    label: '新竹市',
    value: 'F-D0047-055',
  },
  {
    label: '嘉義市',
    value: 'F-D0047-059',
  },
  {
    label: '臺北市',
    value: 'F-D0047-063',
  },
  {
    label: '高雄市',
    value: 'F-D0047-067',
  },
  {
    label: '新北市',
    value: 'F-D0047-071',
  },
  {
    label: '臺中市',
    value: 'F-D0047-075',
  },
  {
    label: '臺南市',
    value: 'F-D0047-079',
  },
];

const elementNameMap = [
  '天氣現象',
  '天氣預報綜合描述',
  '12小時降雨機率',
  '平均溫度',
  '最高溫度',
  '最低溫度',
  '最高體感溫度',
  '最低體感溫度',
  '風向',
  '風速',
  '最大舒適度指數',
  '最小舒適度指數',
  '紫外線指數',
  '平均相對濕度',
  '平均露點溫度',
];

const SkyLog = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locationCode, setLocationCode] = useState<string>(locations[0].value);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [selectedElementName, setSelectedElementName] =
    useState<string>('天氣現象');
  const { t } = useTranslation();

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/${locationCode}?Authorization=${AuthorizationCode}&limit=${limit}&ElementName=${selectedElementName}&timeFrom=${startTime}&timeTo=${endTime}`
      );
      const data = await response.json();
      const weatherElementArray = returnWeatherElementArray(data);
      setWeatherData([...weatherElementArray]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  const returnWeatherElementArray = (data: any) => {
    const weatherElementArray: any[] = [];
    data.records.Locations.forEach((location: any) => {
      location.Location.forEach((weatherElement: any) => {
        weatherElementArray.push(weatherElement);
      });
    });
    return weatherElementArray;
  };

  const datePickerOnChange: DatePickerProps['onChange'] = (date) => {
    const selectedDate = dayjs(date);
    const today = dayjs();

    // 檢查選擇的日期是否是今天
    const isToday = selectedDate.isSame(today, 'day');

    let startTime: string;
    let endTime: string;

    if (isToday) {
      // 如果是今天，使用當前時間作為開始時間
      startTime = today.format('YYYY-MM-DDTHH:mm:ss');
    } else {
      // 如果不是今天，使用選擇日期的凌晨 00:00:00
      startTime =
        selectedDate.subtract(1, 'day').format('YYYY-MM-DD') + 'T18:00:00';
    }

    // 結束時間統一使用隔日的凌晨 00:00:00
    endTime = selectedDate.add(1, 'day').format('YYYY-MM-DD') + 'T00:00:00';

    // 更新狀態
    setStartTime(startTime);
    setEndTime(endTime);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
      <div className="flex flex-row gap-4">
        <Select
          value={locationCode}
          onChange={(value) => setLocationCode(value)}
          style={{ width: 120 }}
        >
          {locations.map((location) => (
            <Select.Option key={location.value} value={location.value}>
              {location.label}
            </Select.Option>
          ))}
        </Select>
        <Select
          value={selectedElementName}
          onChange={(value) => setSelectedElementName(value)}
          style={{ width: 120 }}
        >
          {elementNameMap.map((elementName) => (
            <Select.Option key={elementName} value={elementName}>
              {elementName}
            </Select.Option>
          ))}
        </Select>
        <DatePicker
          onChange={datePickerOnChange}
          minDate={dayjs()}
          maxDate={dayjs().add(6, 'day')}
          placeholder={t('page.skyLog.selectDate')}
        />
        <Button onClick={fetchWeatherData}>{t('page.skyLog.search')}</Button>
      </div>
      <div className="mt-4">
        {weatherData?.map((item: any) => (
          <Card className="card-1 mb-4" key={item.LocationName}>
            <p className="font-bold mb-4 text-3xl">{item.LocationName}</p>
            {item.WeatherElement.map((element: any) => (
              <div
                className="card-2 flex flex-row flex-wrap gap-4"
                key={element.ElementName}
              >
                {element.Time.map((time: any) => (
                  <Card
                    className="card-3 flex flex-col w-[240px]"
                    key={time.StartTime}
                  >
                    <p className="font-bold mb-2">
                      {`${dayjs(time.StartTime).format('MM/DD HH:mm')} ~ ${dayjs(time.EndTime).format('MM/DD HH:mm')}`}
                    </p>
                    {time.ElementValue.map((value: any, index: number) => {
                      const keyNames = Object.keys(value);
                      return (
                        <div key={index}>
                          {keyNames.map((key: string) => (
                            <p key={key}>{value[key]}</p>
                          ))}
                        </div>
                      );
                    })}
                  </Card>
                ))}
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkyLog;
