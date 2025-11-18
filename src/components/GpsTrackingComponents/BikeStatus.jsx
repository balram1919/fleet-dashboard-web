import React, { useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./BikeStatus.module.css";
import DateTimeBox from "../DateTimeBox";
import DateRangePicker from "../DateTimeBox";

/* -------------------------------------------------
    SVG icons
    ------------------------------------------------- */
// Note: SVG components remain the same
const BikeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="14"
    viewBox="0 0 22 14"
    fill="none"
  >
    <path
      d="M18.51 7.33478C16.8212 7.33478 15.4473 8.70873 15.4473 10.3974C15.4473 12.0863 16.8212 13.4603 18.51 13.4603C20.1988 13.4603 21.5727 12.0863 21.5727 10.3974C21.5727 8.70873 20.1988 7.33478 18.51 7.33478ZM18.51 12.326C17.4465 12.326 16.5814 11.4609 16.5814 10.3974C16.5814 9.33398 17.4465 8.46885 18.51 8.46885C19.5735 8.46885 20.4386 9.33399 20.4386 10.3974C20.4386 11.4609 19.5735 12.326 18.51 12.326Z"
      fill="white"
    />
    <path
      d="M4.96467 10.7165C4.81087 11.649 4.01072 12.3257 3.06206 12.3257C1.99921 12.3257 1.13451 11.4609 1.13451 10.398C1.13451 9.43879 1.84934 8.61727 2.79731 8.48698L2.9688 8.46338L2.04152 7.50867L1.98791 7.52867C0.798881 7.97372 0 9.12676 0 10.398C0 12.0865 1.37361 13.4601 3.06206 13.4601C4.31257 13.4601 5.42681 12.7118 5.90059 11.5534L5.9223 11.5002L4.99288 10.5453L4.96467 10.7165Z"
      fill="white"
    />
    <path
      d="M18.5089 6.6287C18.8836 6.6287 19.2517 6.6834 19.6028 6.79112C19.7051 6.8231 19.8147 6.78224 19.8707 6.69281C19.9293 6.59895 19.9155 6.47909 19.8369 6.40113L15.017 1.62684C14.8157 1.41655 14.4897 1.40304 14.2744 1.59539C13.637 2.16507 12.2824 3.76453 13.4655 6.30744C13.6543 6.71316 13.6367 7.19752 13.4184 7.6029L12.7198 8.90094C12.5641 9.19041 12.263 9.37027 11.9342 9.37027H10.2204C10.0002 9.37027 9.78532 9.28051 9.63076 9.12373L8.65152 8.13157C8.52396 8.00214 8.3747 7.8999 8.20775 7.82739L0.603322 4.53306C0.49998 4.48879 0.388153 4.52058 0.324296 4.61275C0.260351 4.70523 0.270021 4.82167 0.348405 4.90238L6.47809 11.2074C6.63685 11.3707 6.85842 11.4642 7.08607 11.4642H14.305C14.4261 11.4642 14.5394 11.4165 14.624 11.3296C14.7084 11.2429 14.7533 11.1286 14.7502 11.0075C14.7449 10.801 14.7396 10.5541 14.7396 10.398C14.7396 8.31963 16.4305 6.6287 18.5089 6.6287Z"
      fill="white"
    />
    <path
      d="M0.623937 3.81444L8.06833 7.03918C8.1462 7.07287 8.22844 7.08979 8.31077 7.08979C8.38677 7.08979 8.46284 7.07543 8.53559 7.04654C8.68726 6.98653 8.80641 6.87094 8.87105 6.72116L9.34696 5.61907C9.53921 5.17386 9.58743 4.70983 9.4863 4.27709C9.39055 3.86761 9.18641 3.56926 8.87952 3.39024C8.33188 3.0712 7.59952 3.21431 7.21174 3.32818C7.04975 3.37554 6.8822 3.39947 6.71361 3.39947H0.709943C0.604611 3.39947 0.51938 3.46873 0.498007 3.572C0.476648 3.67509 0.527251 3.77255 0.623937 3.81444Z"
      fill="white"
    />
    <path
      d="M16.5741 2.5533C16.8327 2.77899 17.1093 2.95475 17.3528 3.04845C17.4898 3.10094 17.5979 3.12129 17.6834 3.12129C17.8147 3.12129 17.8923 3.07341 17.9378 3.02127C18.1701 2.75488 17.7773 2.15887 17.2898 1.73314C16.8023 1.30758 16.1584 0.999151 15.9261 1.26519C15.6937 1.5314 16.0865 2.12757 16.5741 2.5533Z"
      fill="white"
    />
    <path
      d="M11.3824 1.26418H12.4182C12.4387 1.26418 12.4577 1.27444 12.469 1.29154L13.0158 2.11769C13.0416 2.15666 13.0847 2.18044 13.1311 2.18095C13.1317 2.18095 13.1324 2.18095 13.133 2.18095C13.1783 2.18095 13.2208 2.15889 13.247 2.12145C13.4654 1.80771 13.7408 1.45226 14.1278 1.19392L14.1282 1.19374C14.1917 1.15082 14.2092 1.06448 14.1673 1.00106L14.0645 0.846325C14.0559 0.833495 14.0535 0.817944 14.0528 0.807001C14.0263 0.354426 13.6495 0 13.195 0C12.8787 0 12.5885 0.174909 12.4404 0.45H11.3619C11.2412 0.45 11.1272 0.503002 11.0494 0.595504C10.9721 0.687318 10.9396 0.808025 10.9601 0.926845C10.9934 1.11919 11.1749 1.26418 11.3824 1.26418Z"
      fill="white"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.08294 7.60021V5.19986C2.08294 2.32844 4.50848 0 7.49962 0C10.4916 0 12.9171 2.32844 12.9171 5.19986V7.60021H13.5418C14.3474 7.60021 15 8.22673 15 9V16.6002C15 17.3735 14.3474 18 13.5418 18H1.45816C0.652644 18 0 17.3735 0 16.6002V9C0 8.22673 0.652644 7.60021 1.45816 7.60021H2.08294ZM4.58339 5.19986C4.58339 3.65331 5.88947 2.40035 7.49962 2.40035C9.11065 2.40035 10.4167 3.65337 10.4167 5.19986V7.60021H4.58318L4.58339 5.19986ZM8.3331 12.5492C8.71121 12.2959 8.95862 11.8761 8.95862 11.4003C8.95862 10.627 8.30516 9.99973 7.49964 9.99973C6.69495 9.99973 6.04148 10.627 6.04148 11.4003C6.04148 11.8761 6.2889 12.2959 6.667 12.5492V14.7997C6.667 15.2415 7.04017 15.5997 7.49964 15.5997C7.95994 15.5997 8.3331 15.2415 8.3331 14.7997V12.5492Z"
      fill="white"
    />
  </svg>
);

const PowerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.08294 7.60021V5.19986C2.08294 2.32844 4.50848 0 7.49962 0C10.4916 0 12.9171 2.32844 12.9171 5.19986V7.60021H13.5418C14.3474 7.60021 15 8.22673 15 9V16.6002C15 17.3735 14.3474 18 13.5418 18H1.45816C0.652644 18 0 17.3735 0 16.6002V9C0 8.22673 0.652644 7.60021 1.45816 7.60021H2.08294ZM4.58339 5.19986C4.58339 3.65331 5.88947 2.40035 7.49962 2.40035C9.11065 2.40035 10.4167 3.65337 10.4167 5.19986V7.60021H4.58318L4.58339 5.19986ZM8.3331 12.5492C8.71121 12.2959 8.95862 11.8761 8.95862 11.4003C8.95862 10.627 8.30516 9.99973 7.49964 9.99973C6.69495 9.99973 6.04148 10.627 6.04148 11.4003C6.04148 11.8761 6.2889 12.2959 6.667 12.5492V14.7997C6.667 15.2415 7.04017 15.5997 7.49964 15.5997C7.95994 15.5997 8.3331 15.2415 8.3331 14.7997V12.5492Z"
      fill="white"
    />
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
    type: "category", // << FIX HERE
    categories: categories, // your formatted timestamps
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
    data: raw.map((v) => (v === 0 ? 100 : 0)),
    color: offColor,
  },
  {
    name: "On",
    data: raw.map((v) => (v === 1 ? 100 : 0)),
    color: onColor,
  },
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div className={`${styles.bikeStatusIconCircle} ${data.iconClass}`}>
            <IconComponent />
          </div>
          <div className={styles.bikeStatusCardTitleWrapper}>
            <div className={styles.bikeStatusCardTitle}>{data.title}</div>
          </div>
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
    const timeLabels = gpsData.map((item) =>
      new Date(item._time).toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    const engineRaw = gpsData.map((d) => d.eds);
    const lockRaw = gpsData.map((d) => d.lock);
    const ignitionRaw = gpsData.map((d) => (d.lock === 0 ? 1 : 0));

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
        <DateRangePicker
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
        />
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
