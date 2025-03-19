import React, { useState, useEffect } from 'react';
import { useWatch, useFormState } from 'react-hook-form';

import { DynamicStepper } from './components/DynamicStepper';
import { FieldDetailsForm } from './components/FieldDetailsForm';
import { FieldTypeSelector } from './components/FieldTypeSelector';

import type { ContentFieldFormProps } from './contentFields.type';

export const AddFieldForm: React.FC<ContentFieldFormProps> = ({
  control,
  setValue,
  setIsLastStep,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const formValues = useWatch({ control });
  const { errors } = useFormState({ control });

  const handleTypeSelection = (value: string) => {
    setValue('type', value, { shouldValidate: true });
    if (!errors.type) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const steps = [
    {
      label: 'Select field type',
      content: (
        <FieldTypeSelector
          control={control}
          setValue={setValue}
          onTypeSelect={handleTypeSelection}
          selectedType={formValues.type || ''}
          error={errors.type?.message as string}
        />
      ),
    },
    {
      label: 'Field details',
      content: <FieldDetailsForm control={control} setValue={setValue} onBack={handleBack} />,
    },
  ];

  useEffect(() => {
    if (setIsLastStep) {
      if (activeStep === steps.length - 1) setIsLastStep(true);
      else setIsLastStep(false);
    }
  }, [activeStep, setIsLastStep, steps.length]);

  return <DynamicStepper steps={steps} activeStep={activeStep} />;
};
