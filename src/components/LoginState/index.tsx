import { useCallback } from 'react';
import { Spinner, Cube1, Cube2 } from './style';

const LoginState = ({ status }: any) => {
  const renderLoading = useCallback(() => {
    if (!status) {
      return <div></div>;
    }

    return (
      <Spinner>
        <aside>
          <Cube1 />
          <Cube2 />
        </aside>
      </Spinner>
    );
  }, [status]);

  return renderLoading();
};

export default LoginState;
