import styles from "../styles/tables.module.scss";

const TableRetailOutletsSales = ({ data }: any) => {
  const loading = false;

  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);

  return (
    <div>
      <h3 className={styles.title}>Sales by Retail Outlet</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table className={styles.tables}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.salesByRetailOutletYearMonth.map((sales: any, i: number) => (
                <tr key={i}>
                  <td className={styles.table_align_center}>
                    {sales.retailOutlet_id}
                  </td>
                  <td className={styles.table_align_center}>{sales.name}</td>
                  <td className={styles.table_align_center}>
                    {sales.txn_year}
                  </td>
                  <td className={styles.table_align_center}>
                    {sales.txn_month}
                  </td>
                  <td className={styles.table_amount}>
                    {numberFormat.format(parseFloat(sales.amount))}
                  </td>
                  <td className={styles.table_align_center}>{sales.count}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableRetailOutletsSales;
