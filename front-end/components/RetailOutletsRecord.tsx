import styles from "../styles/cards.module.scss";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import GET_RETAIL_OUTLET_LIST from "../utils/retailOutletsListQuery";
import {
  CREATE_RETAIL_OUTLET,
  UPDATE_RETAIL_OUTLET,
} from "../utils/retailOutletMutation";
import { useMutation } from "@apollo/client";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

// --------------------------------------------------

const RetailOutletsRecord = ({
  id,
  RORecord,
  setIDROActive,
  setActiveRO,
  errorMsgRO,
}: any) => {
  const [Record, setRecord] = useState({
    name: RORecord.name,
    address: RORecord.address,
    phoneNumber: RORecord.phoneNumber,
  });
  const [saved, setSaved] = useState(false);
  const [cancelled, setCanceled] = useState(false);

  //-----------------------

  useEffect(() => {
    setRecord(RORecord);
  }, [RORecord]);

  //-----------------------

  const [createRetailOutlets, { data: createROData, error: createROError }] =
    useMutation(CREATE_RETAIL_OUTLET, {
      refetchQueries: [GET_RETAIL_OUTLET_LIST],
    });

  const [updateRetailOutlets, { data: updateROData, error: updateROError }] =
    useMutation(UPDATE_RETAIL_OUTLET, {
      refetchQueries: [GET_RETAIL_OUTLET_LIST],
    });

  //-----------------------

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
        const res = await createRetailOutlets({
          variables: {
            name: Record.name,
            address: Record.address,
            phoneNumber: Record.phoneNumber,
          },
        });
        setTimeout(() => {
          setActiveRO(false);
          setIDROActive(res.data.createRetailOutlets.id);
        }, 2000);
      } else {
        // Update RO
        const res = await updateRetailOutlets({
          variables: {
            id: id,
            name: Record.name,
            address: Record.address,
            phoneNumber: Record.phoneNumber,
          },
        });
        setTimeout(() => {
          setActiveRO(false);
        }, 3000);
      }
    }
  };

  const handlerCancel = () => {
    setCanceled(true);
    setTimeout(() => {
      setActiveRO(false);
    }, 3000);
  };

  //-----------------------

  return (
    <div className={styles.cardBox}>
      {errorMsgRO ? (
        <h2 className={styles.card_error}>{errorMsgRO}</h2>
      ) : (
        <form onSubmit={handlerSave}>
          {!id ? (
            <h2 className={styles.card_title}>New Retail Outlet</h2>
          ) : (
            <h2 className={styles.card_title}>Edit Retail Outlet</h2>
          )}
          <hr />

          {!id ? (
            ""
          ) : (
            <div className={styles.card_item}>
              <label htmlFor="id" className={styles.card_label}>
                ID
              </label>
              <input
                type="text"
                value={id}
                id="id"
                name="id"
                disabled
                readOnly
              />
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
          <div className={styles.card_item}>
            <label htmlFor="address" className={styles.card_label}>
              Address
            </label>
            <input
              type="text"
              value={Record.address}
              id="address"
              name="address"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.card_item}>
            <label htmlFor="phoneNumber" className={styles.card_label}>
              Phonenumber
            </label>
            <input
              type="text"
              value={Record.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
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
      )}
    </div>
  );
};

export default RetailOutletsRecord;
