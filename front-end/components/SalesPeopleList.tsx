import styles from "../styles/tables.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

//-------------------------------------------

const SalesPeopleList = ({
  id,
  data,
  onAddSP,
  onEditSP,
  onDeleteSP,
  IDROActive,
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
      {data.length === 0 || IDROActive === "" ? (
        <p className={styles.table_message}>
          {" "}
          {
            "Use > on the Retail Outlet list items to see the associated salesperson"
          }
        </p>
      ) : (
        <div>
          <div className={styles.table_header}>
            <h3 className={styles.title}> Salespeople List</h3>

            <button onClick={() => onAddSP()}>
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
                  <th className={styles.table_actions}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.salesPeople
                    .filter((SP: any) => SP.retailOutlet_id.id == IDROActive)
                    .map((people: any, i: number) => (
                      <tr
                        key={i}
                        className={
                          people.id == id ? styles.table_item_selected : ""
                        }
                        ref={people.id == id ? refRow : null}
                      >
                        <td>{people.id}</td>
                        <td>{people.name}</td>
                        <td className={styles.table_align_center}>
                          <div className={styles.table_buttons}>
                            <button onClick={() => onEditSP(people.id)}>
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button onClick={() => onDeleteSP(people.id)}>
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPeopleList;
