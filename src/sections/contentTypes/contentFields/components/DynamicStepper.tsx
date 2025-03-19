import React from 'react';

import { Box, Step, Stepper, StepLabel } from '@mui/material';

interface StepDefinition {
  label: string;
  content: React.ReactNode;
}

interface DynamicStepperProps {
  steps: StepDefinition[];
  activeStep: number;
}

export const DynamicStepper: React.FC<DynamicStepperProps> = ({ steps, activeStep }) => (
  <Box sx={{ width: '100%' }}>
    <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    {steps[activeStep]?.content}
  </Box>
);
