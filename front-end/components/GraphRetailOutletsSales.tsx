import React, { useCallback, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface IDataSet {
  label: string;
  data: number[];
  backgroundColor: string;
}

const GraphRetailOutletsSales = ({ data }: any) => {
  const [dataSet, setDataSet] = useState<IDataSet[]>([]);
  const [labelsList] = useState<string[]>([
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
  ]);
  // Support until 6 retail outlets
  const [backgroundColorList] = useState<string[]>([
    "rgba(53, 162, 235, 0.7)",
    "rgba(255, 99, 132, 0.7)",
    "rgba(80, 100, 235, 0.7)",
    "rgba(100, 42, 135, 0.7)",
    "rgba(140, 12, 35, 0.7)",
    "rgba(160, 152, 45, 0.7)",
  ]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Retail Outlets Sales",
        fontSize: 30,
      },
    },
  };
  
  const fillDataSet = useCallback(
    async (data: any) => {
      let dataSetInternal: IDataSet[] = [];
      let i = 0;
      let color = 0;

      let branch = data.salesByRetailOutletYearMonth[i].retailOutlet_id;
      let dataInternal: IDataSet = {
        label: data.salesByRetailOutletYearMonth[i].name,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: backgroundColorList[color],
      };
      dataInternal.data[
        parseInt(data.salesByRetailOutletYearMonth[i].txn_month) - 1
      ] = parseFloat(data.salesByRetailOutletYearMonth[i].amount);
      const countData = data.salesByRetailOutletYearMonth.length;
      i++;

      let pending = false;

      while (i < countData) {
        if (branch !== data.salesByRetailOutletYearMonth[i].retailOutlet_id) {
          dataSetInternal.push(dataInternal);
          color++;
          dataInternal = {
            label: data.salesByRetailOutletYearMonth[i].name,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: backgroundColorList[color],
          };
          dataInternal.data[
            parseInt(data.salesByRetailOutletYearMonth[i].txn_month) - 1
          ] = parseFloat(data.salesByRetailOutletYearMonth[i].amount);
          branch = data.salesByRetailOutletYearMonth[i].retailOutlet_id;
          pending = true;
        } else {
          dataInternal.data[
            parseInt(data.salesByRetailOutletYearMonth[i].txn_month) - 1
          ] += parseFloat(data.salesByRetailOutletYearMonth[i].amount);
        }
        i++;
      }
      if (pending) {
        dataSetInternal.push(dataInternal);
      }
      setDataSet(dataSetInternal);
    },
    [backgroundColorList]
  );

  useEffect(() => {
    if (data) {
      fillDataSet(data);
    }
  }, [data, fillDataSet]);

  return (
    <div>
      <Bar options={options} data={{ labels: labelsList, datasets: dataSet }} />
    </div>
  );
};

export default GraphRetailOutletsSales;
