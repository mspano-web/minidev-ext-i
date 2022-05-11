import React, { useCallback, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IDataSet {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}


const GraphSalespersonsSales = ({ data }: any) => {
  const [dataSet, setDataSet] = useState<IDataSet[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Salesperson Sales",
        fontSize: 30,
      },
    },
  };
  
  const fillDataSet = useCallback(async (data: any) => {
    let dataSetInternal: IDataSet[] = [];
    let labelSetInternal: string[] = [];

    let dataInternal: IDataSet = {
      label: "",
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 0,
    };

    let i = 0;
    let color: string;
    let backgroundColor: string;
    let borderColor: string;
    let red = 0;
    let green = 0;
    let blue = 0;

    const countData = data.salesBySalesPersonYear.length;
    while (i < countData) {
      red = Math.floor(Math.random() * 256);
      green = Math.floor(Math.random() * 256);
      blue = Math.floor(Math.random() * 256);

      color = `rgba(${red}, ${green}, ${blue}`;

      borderColor = `${color}` + ", 1)";
      backgroundColor = `${color}` + ", 0.7)";

      labelSetInternal.push(data.salesBySalesPersonYear[i].name);
      dataInternal.data.push(parseFloat(data.salesBySalesPersonYear[i].amount));
      dataInternal.backgroundColor.push(backgroundColor);
      dataInternal.borderColor.push(borderColor);
      i++;
    }
    dataInternal.label = "Salesperson Ranking Sales";
    dataInternal.borderWidth = 0;
    dataSetInternal.push(dataInternal);
    setDataSet(dataSetInternal);
    setLabels(labelSetInternal);
  }, []);

  useEffect(() => {
    if (data) {
      fillDataSet(data);
    }
  }, [data, fillDataSet]);

  return (
    <div>
      <Doughnut
        height={"350%"}
        options={options}
        data={{ labels: labels, datasets: dataSet }}
      />
    </div>
  );
};

export default GraphSalespersonsSales;
