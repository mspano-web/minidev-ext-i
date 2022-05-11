import styles from "../styles/cards.module.scss";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import GET_SALES_PEOPLE_LIST from "../utils/salesPeopleListQuery";

import {
  CREATE_SALESPEOPLE,
  UPDATE_SALESPEOPLE,
} from "../utils/salesPeopleMutation";
import { useMutation } from "@apollo/client";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

// -----------------------------------

const SalesPepleRecord = ({
  id,
  PORecord,
  setIDPOActive,
  setActivePO,
}: any) => {
  // ------------------------------

  const [Record, setRecord] = useState({
    name: PORecord.name,
    retailOutlet_id: PORecord.retailOutlet_id,
  });

  const [saved, setSaved] = useState(false);
  const [cancelled, setCanceled] = useState(false);

  // ------------------------------

  const [createSalesPeople, { data: createSPData, error: createSPError }] =
    useMutation(CREATE_SALESPEOPLE, {
      refetchQueries: [GET_SALES_PEOPLE_LIST],
    });

  const [updateSalesPeople, { data: updateSPata, error: updateSPError }] =
    useMutation(UPDATE_SALESPEOPLE, {
      refetchQueries: [GET_SALES_PEOPLE_LIST],
    });

  // ------------------------------

  useEffect(() => {
    setRecord(PORecord);
  }, [PORecord]);

  // ------------------------------

  const handleChange = (e: InputChange) => {
    setRecord({ ...Record, [e.target.id]: e.target.value });
  };

  // Can add exception control with try/catch
  const handlerSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cancelled) {
      setSaved(true);
      if (!id) {
        // Create RO

        const res = await createSalesPeople({
          variables: {
            name: Record.name,
            retailOutlet_id: parseInt(Record.retailOutlet_id),
          },
        });

        setTimeout(() => {
          setActivePO(false);
          setIDPOActive(res.data.createSalesPeople.id);
        }, 3000);
      } else {
        // Update RO
        const res = await updateSalesPeople({
          variables: {
            id: id,
            name: Record.name,
          },
        });
        setTimeout(() => {
          setActivePO(false);
        }, 3000);
      }
    }
  };

  const handlerCancel = (e: any) => {
    setCanceled(true);
    setTimeout(() => {
      setActivePO(false);
    }, 3000);
  };

  // ------------------------------

  return (
    <div className={styles.cardBox}>
      <form onSubmit={handlerSave}>
        {!id ? (
          <h2 className={styles.card_title}>New Salespeople</h2>
        ) : (
          <h2 className={styles.card_title}>Edit Salespeople</h2>
        )}
        <hr />

        {!id ? (
          ""
        ) : (
          <div className={styles.card_item}>
            <label htmlFor="id" className={styles.card_label}>
              ID
            </label>
            <input type="text" value={id} id="id" name="id" disabled readOnly />
          </div>
        )}
        <div className={styles.card_item}>
          <label htmlFor="name" className={styles.card_label}>
            Name
          </label>
          <input
            type="text"
            value={Record.name}
            id="name"
            name="name"
            onChange={handleChange}
            required
          />
        </div>

        <hr />

        <div className={styles.card_buttons}>
          <button
            onClick={handlerCancel}
            className={styles.card_button}
            formNoValidate
          >
            <a>Cancel</a>
          </button>
          <button type="submit" className={styles.card_button}>
            <a>Save</a>
          </button>
        </div>

        {!saved && !cancelled ? (
          ""
        ) : saved ? (
          <h2 className={styles.card_message}>Record Saved!</h2>
        ) : (
          <h2 className={styles.card_message}>Registration canceled!</h2>
        )}
      </form>
    </div>
  );
};

export default SalesPepleRecord;
