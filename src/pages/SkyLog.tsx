import { useState } from 'react';
import { Select, DatePicker, DatePickerProps, Button, Collapse } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { WeatherLocation } from '../types/skyLog';
import { WeatherElementSection } from '../components/WeatherElementSection';
import { apiUrl, AuthorizationCode, elementNameMap } from '../constants/skyLog';

const SkyLog = () => {
  const { t } = useTranslation();
  const locations = [
    {
      label: t('page.skyLog.locations.yilin'),
      value: 'F-D0047-003',
    },
    {
      label: t('page.skyLog.locations.taoyuan'),
      value: 'F-D0047-007',
    },
    {
      label: t('page.skyLog.locations.hsinchu'),
      value: 'F-D0047-011',
    },
    {
      label: t('page.skyLog.locations.miaoli'),
      value: 'F-D0047-015',
    },
    {
      label: t('page.skyLog.locations.changhua'),
      value: 'F-D0047-019',
    },
    {
      label: t('page.skyLog.locations.nantou'),
      value: 'F-D0047-023',
    },
    {
      label: t('page.skyLog.locations.yunlin'),
      value: 'F-D0047-027',
    },
    {
      label: t('page.skyLog.locations.chiayi'),
      value: 'F-D0047-031',
    },
    {
      label: t('page.skyLog.locations.pingtung'),
      value: 'F-D0047-035',
    },
    {
      label: t('page.skyLog.locations.taitung'),
      value: 'F-D0047-039',
    },
    {
      label: t('page.skyLog.locations.hualien'),
      value: 'F-D0047-043',
    },
    {
      label: t('page.skyLog.locations.penghu'),
      value: 'F-D0047-047',
    },
    {
      label: t('page.skyLog.locations.keelung'),
      value: 'F-D0047-051',
    },
    {
      label: t('page.skyLog.locations.hsinchuCity'),
      value: 'F-D0047-055',
    },
    {
      label: t('page.skyLog.locations.chiayiCity'),
      value: 'F-D0047-059',
    },
    {
      label: t('page.skyLog.locations.taipei'),
      value: 'F-D0047-063',
    },
    {
      label: t('page.skyLog.locations.kaohsiung'),
      value: 'F-D0047-067',
    },
    {
      label: t('page.skyLog.locations.newTaipei'),
      value: 'F-D0047-071',
    },
    {
      label: t('page.skyLog.locations.taichung'),
      value: 'F-D0047-075',
    },
    {
      label: t('page.skyLog.locations.tainan'),
      value: 'F-D0047-079',
    },
  ];
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locationCode, setLocationCode] = useState<string>(locations[0].value);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [selectedElementName, setSelectedElementName] = useState<string>(
    elementNameMap[0]
  );

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/${locationCode}?Authorization=${AuthorizationCode}&ElementName=${selectedElementName}&timeFrom=${startTime}&timeTo=${endTime}`
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
    if (date === null) {
      setStartTime('');
      setEndTime('');
      return;
    }

    const selectedDate = dayjs(date);
    const today = dayjs();
    const isToday = selectedDate.isSame(today, 'day');

    const startTime = isToday
      ? today.format('YYYY-MM-DDTHH:mm:ss')
      : selectedDate.subtract(1, 'day').format('YYYY-MM-DDT18:00:00');

    const endTime = selectedDate.add(1, 'day').format('YYYY-MM-DDT00:00:00');

    setStartTime(startTime);
    setEndTime(endTime);
  };

  const returnCollapseChildItem = () => {
    if (!weatherData) return [];

    return weatherData.map((item: WeatherLocation, index: number) => ({
      key: index,
      label: item.LocationName,
      children: (
        <>
          {item.WeatherElement.map((element) => (
            <WeatherElementSection
              key={element.ElementName}
              element={element}
            />
          ))}
        </>
      ),
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
      <div className="flex flex-row gap-4 mb-8 border-solid border p-4 border-gray-300 rounded-lg">
        <Select
          value={locationCode}
          onChange={(value) => setLocationCode(value)}
          style={{ width: 120 }}
          size="large"
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
          size="large"
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
          size="large"
        />
        <Button
          onClick={fetchWeatherData}
          icon={<SearchOutlined />}
          type="primary"
          size="large"
        >
          {t('page.skyLog.search')}
        </Button>
      </div>
      {weatherData && (
        <Collapse
          items={returnCollapseChildItem()}
          defaultActiveKey={0}
          size="large"
          accordion
        />
      )}
    </div>
  );
};

export default SkyLog;
