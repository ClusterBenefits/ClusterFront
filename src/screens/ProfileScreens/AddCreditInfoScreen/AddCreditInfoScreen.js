import React, { useState, useContext, useEffect } from "react";
import AddCreditInfoScreenForm from "./AddCreditInfoScreenForm";
import { UserContext } from "../../../reducers/context";
import { getInfoForSubscription } from "../../../actions/userActions";
import { LoadingHOC } from "../../../components";

const AddCreditInfoScreenWithLoading = LoadingHOC(AddCreditInfoScreenForm);

export default function AddCreditInfoScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setInfoSubscription] = useState({ data: null, signature: null });
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setIsLoading(true);
    console.log(state.token);
    try {
      let response = await getInfoForSubscription({
        dispatch,
        token: state.token
      });
      console.log("subscribe", response);
      setInfoSubscription({
        data: response.data,
        signature: response.signature
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return <AddCreditInfoScreenWithLoading isLoading={isLoading} subscription={subscription} />;
}
