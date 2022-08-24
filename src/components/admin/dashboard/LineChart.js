import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
    return (
        <div className="">
            <h4>Thống kê người xem theo chủ đề</h4>
            <Line data={chartData} style={{maxHeight: "240px"}}/>
            <br />
        </div>
    );
}

export default LineChart;