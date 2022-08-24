import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ chartData }) {
    return (
        <div className="mt-5 category">
            <h4>Thống kê tỷ lệ quảng cáo</h4>
            <Pie data={chartData} />
            <br />
        </div>
    );
}

export default PieChart;