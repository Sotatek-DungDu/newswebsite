import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
    return (
        <div className="mt-5 category">
            <h4>Thống kê người xem theo chủ đề</h4>
            <Line data={chartData} />
            <br />
        </div>
    );
}

export default LineChart;