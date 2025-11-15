import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "../GpsTrackingComponents/ImuData.module.css";

const SplineChart = ({ categories, series }) => {
    const chartOptions = {
        chart: {
            type: "spline",
            backgroundColor: "transparent",
            height: 180,
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0,
        }, title: { text: null },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: {
            categories: categories,
            labels: { style: { color: "#9CA3AF", fontSize: "11px" } },
            gridLineWidth: 1,
            gridLineColor: "#F3F4F6",
        },
        yAxis: {
            title: { text: null },
            labels: { style: { color: "#9CA3AF", fontSize: "11px" } },
            gridLineColor: "#F3F4F6",
        },
        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function () {
                let msg = `<div style="font-size: 11px; margin-bottom: 4px;">${this.x}</div>`;
                this.points.forEach((p) => {
                    msg += `
            <div style="display:flex; gap:6px; align-items:center;">
              <span style="width:8px; height:8px; background:${p.color}; border-radius:50%;"></span>
              <b>${p.series.name}:</b> ${p.y}
            </div>
          `;
                });
                return msg;
            },
        },
        series: series,
    };

    return (
        <>


            <div className={styles.imuDataChartWrapper}>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>

            <div className={styles.imuDataLegend}>
                {series?.map((item, index) => {
                    return (<div className={styles.imuDataLegendItem} key={index}>
                        <div className={`${styles.imuDataLegendDot} ${styles.imuDataLegendDotGreen}`}></div>
                        <span>{item?.name}</span>
                    </div>)
                })}
            </div>
        </>
    );
};

export default SplineChart;
