import styles from "../../styles/setting.module.scss";
import Layout from "../../components/Layout";

import RetailOutletsList from "../../components/RetailOutletsList";
import SalesPeopleList from "../../components/SalesPeopleList";

import GET_RETAIL_OUTLET_LIST from "../../utils/retailOutletsListQuery";
import { DELETE_RETAIL_OUTLET } from "../../utils/retailOutletMutation";
import { DELETE_SALES_PEOPLE } from "../../utils/salesPeopleMutation";
import GET_SALESPEOPLE_LIST from "../../utils/salesPeopleListQuery";

import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

import RetailOutletsRecord from "../../components/RetailOutletsRecord";
import SalesPepleRecord from "../../components/SalesPepleRecord";

// --------------------------------------------------------------------

const Settings = () => {
  const { data, error, loading } = useQuery(GET_SALESPEOPLE_LIST);

  //----------------------------------

  const {
    data: dataRO,
    error: errorRO,
    loading: loadingRO,
  } = useQuery(GET_RETAIL_OUTLET_LIST);

  const [deleteRetailOutlets, { data: deleteROData, error: deleteROError }] =
    useMutation(DELETE_RETAIL_OUTLET, {
      refetchQueries: [GET_RETAIL_OUTLET_LIST],
    });

  const [deleteSalesPeople, { data: deletePOData, error: deletePOError }] =
    useMutation(DELETE_SALES_PEOPLE, {
      refetchQueries: [GET_SALESPEOPLE_LIST],
    });

  //----------------------------------

  const [RORecord, setRORecord] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const [PORecord, setPORecord] = useState({
    name: "",
    retailOutlet_id: 0,
  });

  const [activeRO, setActiveRO] = useState(false);
  const [activePO, setActivePO] = useState(false);

  const [IDROactive, setIDROActive] = useState("");
  const [IDPOactive, setIDPOActive] = useState("");
  const [errorMsgRO, setErrorMsgRO] = useState("");

  //----------------------------------

  if (loading || loadingRO) return <h1>Loading...</h1>;
  if (error || errorRO || !data || !dataRO) {
    console.log(error);
    return <h2> Error </h2>;
  }

  // --------------------------

  const handlerSelectRetailOutletsList = (id: string) => {
    setIDROActive(id);
    setActiveRO(false);
    setActivePO(false);
  };

  // --------------------------

  const handlerAddRetailOutletsList = async () => {
    setRORecord({ name: "", address: "", phoneNumber: "" });
    setIDROActive("");
    setActiveRO(true);
    setActivePO(false);
  };

  // --------------------------

  const handlerEditRetailOutletsList = (id: string) => {
    setIDROActive(id);
    setActiveRO(true);
    setActivePO(false);
    const resultRO = dataRO.RetailOutlets.filter((RO: any) => RO.id === id);
    if (!resultRO.length) {
      throw new Error("Fatal Internal error - Edit RO inconsistent");
    } else {
      setRORecord({
        name: resultRO[0].name,
        address: resultRO[0].adress,
        phoneNumber: resultRO[0].phoneNumber,
      });
    }
  };

  // --------------------------

  const handlerDeleteRetailOutletsList = async (id: string) => {
    try {
      setActiveRO(false);
      setActivePO(false);
      const result = data.salesPeople.filter(
        (SP: any) => SP.retailOutlet_id.id === id
      );
      if (!result.length) {
        // Rule: It is not possible to delete if there are associated salespeople.
        const res = await deleteRetailOutlets({ variables: { id: id } });
        setIDROActive("");
      } else {
        throw new Error("Fail!  RetailOutlets with associated salespeople. ");
      }
    } catch (e: any) {
      setIDROActive(id);
      setActiveRO(true);
      setErrorMsgRO(e.message);
      setTimeout(() => {
        setActiveRO(false);
        setErrorMsgRO("");
      }, 3000);
    }
  };

  // --------------------------

  const handlerAddSalespersonList = () => {
    setPORecord({ name: "", retailOutlet_id: parseInt(IDROactive) });
    setActivePO(true);
    setIDPOActive("");
    setActiveRO(false);
  };

  // --------------------------

  const handlerEditSalespersonList = (id: string) => {
    const resultPO = data.salesPeople.filter((PO: any) => PO.id === id);
    if (!resultPO.length) {
      throw new Error("Fatal Internal error - Edit SP inconsistent");
    } else {
      setPORecord({
        name: resultPO[0].name,
        retailOutlet_id: resultPO[0].retailOutlet_id,
      });
    }
    setIDPOActive(id);
    setActivePO(true);
    setActiveRO(false);
  };

  // --------------------------

  const handlerDeleteSalespersonList = async (id: string) => {
    try {
      setActivePO(false);
      const res = await deleteSalesPeople({ variables: { id: id } });
      setIDPOActive("");
      setActiveRO(false);
    } catch (e: any) {
      setActiveRO(true);
      setErrorMsgRO(e.message);
      setTimeout(() => {
        setActiveRO(false);
        setErrorMsgRO("");
      }, 3000);
    }
  };

  // --------------------------

  return (
    <Layout>
      {loading || loadingRO ? (
        <p>Loading ...</p>
      ) : (
        <div className={styles.setting}>
          <div>
            <RetailOutletsList
              id={IDROactive}
              data={dataRO.RetailOutlets}
              onSelectRO={handlerSelectRetailOutletsList}
              onAddRO={handlerAddRetailOutletsList}
              onEditRO={handlerEditRetailOutletsList}
              onDeleteRO={handlerDeleteRetailOutletsList}
            />
          </div>
          <div>
            <SalesPeopleList
              id={IDPOactive}
              data={data}
              onAddSP={handlerAddSalespersonList}
              onEditSP={handlerEditSalespersonList}
              onDeleteSP={handlerDeleteSalespersonList}
              IDROActive={IDROactive}
            />
          </div>
          <div>
            {activeRO ? (
              <RetailOutletsRecord
                id={IDROactive}
                RORecord={RORecord}
                setIDROActive={setIDROActive}
                setActiveRO={setActiveRO}
                errorMsgRO={errorMsgRO}
              />
            ) : (
              ""
            )}
          </div>
          <div>
            {activePO ? (
              <SalesPepleRecord
                id={IDPOactive}
                PORecord={PORecord}
                setIDPOActive={setIDPOActive}
                setActivePO={setActivePO}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Settings;
