import React from 'react';
import { useStore } from './Store';
import { Button } from './common/Button';
import { useObserver } from 'mobx-react-lite';

export function EditVsPlayToggler() {
  const store = useStore();
  
  return useObserver(() =>
    <div>
      <Button
        onClick={store.toggleEditVsPlayWithTransition}
      >
        Toggle
      </Button>
      
      Value: {store.editVsPlay}
      --
      ({store.editVsPlay ? "play" : store.editVsPlay === 0 ? "edit" : "transitioning"})

    </div>
  );
}