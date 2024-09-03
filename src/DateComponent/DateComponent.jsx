import React, { useEffect, useState } from "react";
import { fetchDateData } from "./dateService";
import "./DateComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DateComponent = () => {
  const [dateData, setDateData] = useState([]);
  const [isHijri, setIsHijri] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedYear, setSelectedYear] = useState("1446");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hijriMonths = [
    "Muḥarram",
    "Ṣafar",
    "Rabi al-Awwal",
    "Rabi al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Shaban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qidah",
    "Dhu al-Hijjah",
  ];

  const gregorianMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const hijriMonth = dateData.length > 0 ? dateData[0].hijri.month.en : "";
  const gregorianMonth =
    dateData.length > 0 ? dateData[0].gregorian.month.en : "";
  const hijriMonth2 = dateData.length > 0 ? dateData[29].hijri.month.en : "";
  const gregorianMonth2 =
    dateData.length > 0 ? dateData[29].gregorian.month.en : "";

  const hijriYear = dateData.length > 0 ? dateData[0].hijri.year : "";
  const gregorianYear = dateData.length > 0 ? dateData[0].gregorian.year : "";

  const hijriYearl = dateData.length > 0 ? dateData[29].hijri.year : "";
  const gregorianYearl = dateData.length > 0 ? dateData[29].gregorian.year : "";

  const years = Array.from(new Array(51), (val, index) =>
    isHijri ? 1446 - 25 + index : 2024 - 25 + index
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDateData(selectedMonth, selectedYear, isHijri);
        setDateData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedMonth, selectedYear, isHijri]);

  const startDayIndex =
    dateData.length > 0
      ? new Date(
          dateData[0].gregorian.year,
          dateData[0].gregorian.month.number - 1,
          1
        ).getDay()
      : 0;

  return (
    <div className="date-component-container">
      <div className="top">
        <button onClick={() => setIsHijri(!isHijri)}>
          <FontAwesomeIcon
            style={{ fontSize: "24px" }}
            icon={faArrowRightArrowLeft}
          />
        </button>
        <p>Islamic Calendar vs Gregorian</p>
      </div>

      <div className="mid">
        <div className="midLeft">
          <h2>
            {isHijri
              ? hijriMonth + " " + hijriYear
              : gregorianMonth + " " + gregorianYear}
          </h2>

          <h3>
            {isHijri
              ? gregorianMonth +
                " " +
                gregorianYear +
                " - " +
                gregorianMonth2 +
                " " +
                gregorianYearl
              : hijriMonth +
                " " +
                hijriYear +
                " - " +
                hijriMonth2 +
                " " +
                hijriYearl}
          </h3>
        </div>
        <div className="midRight">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {(isHijri ? hijriMonths : gregorianMonths).map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="days">
        {days.map((day, index) => (
          <div className="day" key={index}>
            {day}
          </div>
        ))}
      </div>

      <div className="calendar">
        {Array.from({ length: startDayIndex }).map((_, index) => (
          <div className="date-info empty" key={index}></div>
        ))}

        {dateData.map((dateInfo, index) => (
          <div className="date-info" key={index}>
            <h3>{isHijri ? dateInfo.hijri.day : dateInfo.gregorian.day}</h3>
            <p>{isHijri ? dateInfo.gregorian.day : dateInfo.hijri.day}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateComponent;
