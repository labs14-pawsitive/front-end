/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// core components
import ShelterOBWizard from "components/Wizard/ShelterOnboardingWizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";

class ShelterOnboardinWizard extends React.Component {

  componentDidMount() {
    
  }

  render() {
    const onboardingStyle={
      zIndex: "5",
      margin: "0"
    }
    return (
      <GridContainer justify="center" style={onboardingStyle}>
        <GridItem xs={12} sm={8}>
          <ShelterOBWizard
            validate
            steps={[
              { stepName: "LEGAL INFO", stepComponent: Step1, stepId: "legal_info" },
              { stepName: "CONTACT", stepComponent: Step2, stepId: "contact" },
              { stepName: "LOCATION", stepComponent: Step3, stepId: "location" }
            ]}
            title="Register Your Shelter"
            subtitle="This information will let us know more about your shelter."
            finishButtonClick={e => alert(e)}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default ShelterOnboardinWizard;
