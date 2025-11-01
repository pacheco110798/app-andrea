import React, { ReactNode, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface DialogueProps {
  setVisible: Function;
  visible: boolean;
  handleConfirm: Function;
  handleCancel: Function;
  header: string;
  description: string;
  confirmationText: string;
  cancelText: string;
  children: ReactNode;
}

export const BasicDialogue: React.FC<DialogueProps> = ({
  header,
  visible,
  setVisible,
  handleConfirm,
  handleCancel,
  description,
  confirmationText,
  cancelText,
  children,
}) => {
  return (
    <div className='card flex justify-content-center'>
      <Dialog
        header={header}
        visible={visible}
        style={{ width: '30vw' }}
        modal
        onHide={() => setVisible(false)}
        footer={
          <div>
            <Button
              label={cancelText}
              icon='pi pi-times'
              onClick={() => handleCancel()}
              className='p-button-text'
            />
            <Button
              label={confirmationText}
              icon='pi pi-check'
              onClick={() => handleConfirm()}
              autoFocus
            />
          </div>
        }
      >
        <p className='m-0'>
          <strong>{description}</strong>
        </p>
        {children}
      </Dialog>
    </div>
  );
};
