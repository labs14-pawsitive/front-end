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
import Wizard from "components/Wizard/ApplicationWizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";
import Step4 from "./WizardSteps/Step4.jsx";

class ApplicationWizard extends React.Component {

  /*componentDidMount() {
    if(this.props.animalId && this.props.shelterId)
    localStorage.setItem("animalId", this.props.animalId)
    localStorage.setItem('shelterId', this.props.shelterId)
  }
 */

  render() {
    const regFormStyle={
      zIndex: "5",
      margin: "0"
    }
    return (
      <GridContainer justify="center" style={regFormStyle}>
        <GridItem xs={12} sm={8}>
          <Wizard
            validate
            steps={[
              { stepName: "About You", stepComponent: Step1, stepId: "about" },
              { stepName: "About Your Home", stepComponent: Step2, stepId: "home" },
              { stepName: "References", stepComponent: Step3, stepId: "references" },
              { stepName: "Notes and Declarations", stepComponent: Step4, stepId: "declaration" }

            ]}
            title="Adoption Application"
            subtitle="Please fill out this application to adopt that special animal today"
            finishButtonClick={e => alert(e)}
            animalId={this.props.animalId}
            shelterId={this.props.shelterId}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default ApplicationWizard;
