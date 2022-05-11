import styles from "../styles/tables.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faCirclePlus,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

// -------------------------------------------------------

const RetailOutletsList = ({
  id,
  data,
  onSelectRO,
  onAddRO,
  onEditRO,
  onDeleteRO,
}: any) => {
  const refRow = React.useRef<null | HTMLTableRowElement>(null);

  React.useEffect(() => {
    const scrollToBottom = () => {
      if (refRow.current !== null)
        refRow.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
    };

    if (refRow.current) {
      scrollToBottom();
    }
  }, [id]);

  return (
    <div>
      <div>
        <div className={styles.table_header}>
          <h3 className={styles.title}>Retail Outlet List</h3>

          <button onClick={() => onAddRO()}>
            <FontAwesomeIcon
              className={styles.table_awesome}
              icon={faCirclePlus}
            />
          </button>
        </div>

        <div className={styles.especial}>
          <table className={styles.tables}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phonenumber</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((retailOutlet: any, i: number) => (
                  <tr
                    key={i}
                    className={
                      retailOutlet.id == id ? styles.table_item_selected : ""
                    }
                    ref={retailOutlet.id == id ? refRow : null}
                  >
                    <td className={styles.table_align_center}>
                      {retailOutlet.id}
                    </td>
                    <td className={styles.table_align_center}>
                      {retailOutlet.name}
                    </td>
                    <td className={styles.table_align_center}>
                      {retailOutlet.adress}
                    </td>
                    <td className={styles.table_align_center}>
                      {retailOutlet.phoneNumber}
                    </td>
                    <td className={styles.table_align_center}>
                      <div className={styles.table_buttons}>
                        <button
                          onClick={() => onEditRO(retailOutlet.id)}
                          className={styles.button}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          onClick={() => onDeleteRO(retailOutlet.id)}
                          className={styles.button}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <button
                          onClick={() => onSelectRO(retailOutlet.id)}
                          className={styles.button}
                        >
                          <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      )
    </div>
  );
};

export default RetailOutletsList;
