/** @jsxImportSource @emotion/react */
import { SButtonContainer, Button, Spinner } from "shared/ui";

interface IProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

function SubmitButton({ isLoading = false, children }: IProps) {
  return (
    <SButtonContainer>
      <Button type="submit" disabled={isLoading}>
        {children} {isLoading ? <Spinner css={{ marginLeft: 7 }} /> : null}
      </Button>
    </SButtonContainer>
  );
}

export { SubmitButton };
