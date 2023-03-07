import type { Error } from '../../types';
import { SFullPageErrorContainer} from './FullPageError.styles'

function FullPageError({ error }: { error: Error }) {
  return (
    <SFullPageErrorContainer role="alert">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </SFullPageErrorContainer>
  );
}

export { FullPageError };
