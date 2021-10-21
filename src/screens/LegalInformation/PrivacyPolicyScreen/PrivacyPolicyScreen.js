import React from 'react';
import { useBackButton } from '../../../hooks';
import PrivacyPolicyForm from "./PrivacyPolicyScreenForm";

const PrivacyPolicyScreen = ({navigation}) => {
    useBackButton(false);
    return (
        <PrivacyPolicyForm 
            navigation={navigation}/>
    );
};

export default PrivacyPolicyScreen;