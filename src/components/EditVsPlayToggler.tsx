import React from 'react';
import { useStore } from './Store';
import { useObserver } from 'mobx-react-lite';
import styled from 'styled-components';

interface ButtonProps {
};
const Button: React.FC<ButtonProps> = p => <div>{p.children}</div>;

const Container = styled.div`
  cursor: pointer;
`;

export function EditVsPlayToggler() {
  const store = useStore();
  const isEdit = store.editVsPlay === 0;
  const isPlay = !isEdit;
  
  return useObserver(() =>
    <Container
      onClick={store.toggleEditVsPlayWithTransition}
    >
      <Button>
        Edit Scale
      </Button>
      <Button>
        Play Sounds
      </Button>
    </Container>
  );
}