import React, { useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./BikeStatus.module.css";
import DateTimeBox from "../DateTimeBox";

/* -------------------------------------------------
    SVG icons
    ------------------------------------------------- */
// Note: SVG components remain the same
const BikeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-2.8 9.5c-.5-.5-.8-1.2-.8-2 0-.8.3-1.5.8-2h-2.7c-.6 0-1 .4-1 1v1h-2c-.6 0-1 .4-1 1v2h2v1c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-1h2zm6.3-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-13-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M12 2C9.24 2 7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v3H9V7c0-1.66 1.34-3 3-3z" />
  </svg>
);

const PowerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M13 3h-2v7h2V3zm4.83 3.17l-1.42 1.42C17.99 9.2 19 11.27 19 13.5c0 3.04-2.46 5.5-5.5 5.5S8 16.54 8 13.5c0-2.23 1.01-4.3 2.59-5.61l-1.42-1.42C7.5 8.03 6.5 10.26 6.5 12.5 6.5 16.64 9.86 20 13.5 20s7-3.36 7-7.5c0-2.24-1-4.47-2.67-6.33z" />
  </svg>
);
const createChartConfig = (series, categories) => ({
  chart: {
    type: "column",
    backgroundColor: "transparent",
    spacing: [10, 0, 10, 0],
    height: 90,
  },
  title: { text: null },
  credits: { enabled: false },
  legend: { enabled: false },
  tooltip: { enabled: false },

  xAxis: {
    type: "category",            // << FIX HERE
    categories: categories,      // your formatted timestamps
    labels: {
      style: { color: "#aaa", fontSize: "10px" },
      rotation: -45,
    },
  },

  yAxis: {
    visible: false,
    min: 0,
    max: 100,
  },

  plotOptions: {
    column: {
      pointWidth: 6,
      borderRadius: 3,
      groupPadding: 0.08,
      pointPadding: 0,
      animation: false,
    },
  },

  series,
});


/* -------------------------------------------------
    Sample data (remains the same)
    ------------------------------------------------- */

const makeSeries = (raw, offColor, onColor) => [
  {
    name: "Off",
    data: raw.map(v => (v === 0 ? 100 : 0)),
    color: offColor,
  },
  {
    name: "On",
    data: raw.map(v => (v === 1 ? 100 : 0)),
    color: onColor,
  }
];

/* -------------------------------------------------
    Card Data Structure
    ------------------------------------------------- */


/* -------------------------------------------------
    Reusable Component for Status Card
    ------------------------------------------------- */
const StatusCard = ({ data }) => {
  const IconComponent = data.icon; // Dynamic component rendering

  return (
    <div className={styles.bikeStatusCard}>
      <div className={styles.bikeStatusCardHeader}>
        <div className={`${styles.bikeStatusIconCircle} ${data.iconClass}`}>
          <IconComponent />
        </div>
        <div className={styles.bikeStatusCardTitleWrapper}>
          <div className={styles.bikeStatusCardTitle}>{data.title}</div>
        </div>
        <div className={styles.bikeStatusLegend}>
          <div className={styles.bikeStatusLegendItem}>
            <div
              className={`${styles.bikeStatusLegendDot} ${data.legendColors.off}`}
            ></div>
            <span>Off</span>
          </div>
          <div className={styles.bikeStatusLegendItem}>
            <div
              className={`${styles.bikeStatusLegendDot} ${data.legendColors.on}`}
            ></div>
            <span>On</span>
          </div>
        </div>
      </div>

      <div className={styles.bikeStatusChartSection}>
        {/* Static Tooltip Area */}
        <div className={styles.bikeStatusTooltip}>
          <div className={styles.bikeStatusTooltipTitle}>
            {data.tooltipTitle}
          </div>
          <div className={styles.bikeStatusTooltipSubtitle}>
            31/10/2025 | 6:10 min
          </div>
        </div>

        {/* Legend */}

        {/* Chart */}
        <div className={styles.bikeStatusChartWrapper}>
          <HighchartsReact
            highcharts={Highcharts}
            options={createChartConfig(data.series, data.categories)}
          />
        </div>

        {/* X-Axis Labels (Static for the demo) */}
        {/* <div className={styles.bikeStatusXAxis}>
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div> */}
      </div>
    </div>
  );
};

/* -------------------------------------------------
    Main Component
    ------------------------------------------------- */
const BikeStatus = ({ gpsData }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const STATUS_CARDS = useMemo(() => {
    if (!gpsData) return [];
    const timeLabels = gpsData.map(item =>
      new Date(item._time).toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
    );
    const engineRaw = gpsData.map(d => d.eds);
    const lockRaw = gpsData.map(d => d.lock);
    const ignitionRaw = gpsData.map(d => (d.lock === 0 ? 1 : 0));

    return [
      {
        key: "engine",
        title: "Engine Disabling System",
        icon: BikeIcon,
        iconClass: styles.bikeStatusIconPurple,
        tooltipTitle: "EDS Status",
        categories: timeLabels,
        legendColors: {
          off: styles.bikeStatusLegendDotPurpleLight,
          on: styles.bikeStatusLegendDotPurple,
        },
        series: makeSeries(engineRaw, "#DDD6FE", "#A78BFA"),
      },
      {
        key: "lock",
        title: "Lock Status",
        icon: LockIcon,
        iconClass: styles.bikeStatusIconPink,
        tooltipTitle: "LOCK Status",
        categories: timeLabels,
        legendColors: {
          off: styles.bikeStatusLegendDotOrangeLight,
          on: styles.bikeStatusLegendDotPurpleAlt,
        },
        series: makeSeries(lockRaw, "#FED7AA", "#C084FC"),
      },
      {
        key: "ignition",
        title: "Ignition Status",
        icon: PowerIcon,
        iconClass: styles.bikeStatusIconCyan,
        tooltipTitle: "IGN Status",
        categories: timeLabels,
        legendColors: {
          off: styles.bikeStatusLegendDotTealLight,
          on: styles.bikeStatusLegendDotOrange,
        },
        series: makeSeries(ignitionRaw, "#99F6E4", "#FB923C"),
      },
    ];
  }, [gpsData]);


  return (
    <div className={styles.bikeStatusContainer}>
      {/* Header */}
      <div className={styles.bikeStatusHeader}>
        <h1 className={styles.bikeStatusTitle}>Bike Status</h1>
      </div>

      {/* Date/Time Row */}
      <div className={styles.bikeStatusDateTimeRow}>
        <DateTimeBox date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime} />
        <div className={styles.bikeStatusActions}>
          <button className={styles.bikeStatusExportBtn}>Export Data</button>
        </div>

      </div>
      {/* Cards: Using map for repetitive components */}
      <div className={styles.bikeStatusCardsWrapper}>
        {STATUS_CARDS.map((cardData) => (
          <StatusCard key={cardData.key} data={cardData} />
        ))}
      </div>
    </div>
  );
};

export default BikeStatus;
