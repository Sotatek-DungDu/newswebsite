import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
    return (
        <div className="mt-5 category">
            <h4>Thống kê lượt truy cập</h4>
            <Bar data={chartData} />
            <br />
        </div>
    );
}

export default BarChart;