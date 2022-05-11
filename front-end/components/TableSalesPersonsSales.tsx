import styles from "../styles/tables.module.scss";

const TableSalesPersonsSales = ({ data }: any) => {
  const loading = false;
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);

  return (
    <div>
      <h3 className={styles.title}>Sales by Salesperson</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table className={styles.tables}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.salesBySalesPersonYear.map((sales: any, i: number) => (
                <tr key={i}>
                  <td className={styles.table_align_center}>
                    {sales.salesPeople_id}
                  </td>
                  <td className={styles.table_align_center}>{sales.name}</td>
                  <td className={styles.table_align_center}>
                    {sales.txn_year}
                  </td>
                  <td className={styles.table_amount}>
                    {numberFormat.format(parseFloat(sales.amount))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableSalesPersonsSales;
