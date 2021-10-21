import React from 'react';
import { useBackButton } from '../../../hooks';
import ContractInformationForm from "./ContractInformationScreenForm";

const ContractInformationScreen = ({navigation}) => {
    useBackButton(false)

    return (
        <ContractInformationForm    
            navigation={navigation}/>
    )
}

export default ContractInformationScreen