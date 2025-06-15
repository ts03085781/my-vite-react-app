import { useState } from 'react';
import { Select, DatePicker, DatePickerProps, Button, Collapse } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { WeatherLocation } from '../types/skyLog';
import { WeatherElementSection } from '../components/WeatherElementSection';
import {
  apiUrl,
  AuthorizationCode,
  elementNameMap,
  locations,
} from '../constants/skyLog';

interface WeatherApiResponse {
  records: {
    Locations: Array<{
      Location: WeatherLocation[];
    }>;
  };
}

const SkyLog = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<WeatherLocation[] | null>(
    null
  );
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
      const data: WeatherApiResponse = await response.json();
      const weatherElementArray = returnWeatherElementArray(data);
      setWeatherData([...weatherElementArray]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const returnWeatherElementArray = (
    data: WeatherApiResponse
  ): WeatherLocation[] => {
    const weatherElementArray: WeatherLocation[] = [];
    data.records.Locations.forEach((location) => {
      location.Location.forEach((weatherElement) => {
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
          className="w-[120px]"
          value={locationCode}
          onChange={(value) => setLocationCode(value)}
          size="large"
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
        >
          {locations.map((location) => (
            <Select.Option key={location.value} value={location.value}>
              {t(location.label)}
            </Select.Option>
          ))}
        </Select>
        <Select
          value={selectedElementName}
          onChange={(value) => setSelectedElementName(value)}
          style={{ width: 120 }}
          size="large"
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
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
