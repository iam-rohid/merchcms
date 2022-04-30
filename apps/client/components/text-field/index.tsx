import { useMemo } from "react";
import { Container, HintText, Label, StyledInput } from "./styles";

export type TextFieldProps = {
  size?: "small" | "medium" | "large";
  label?: string;
  inputProps?: typeof StyledInput;
  labelProps?: typeof Label;
  hintTextProps?: typeof HintText;
  containerProps?: typeof Container;
  hintText?: string;
  error?: boolean;
};

export const TextField = ({
  size,
  label,
  inputProps,
  labelProps,
  hintTextProps,
  containerProps,
  hintText,
  error,
}: TextFieldProps) => {
  const id = useMemo(
    () =>
      inputProps?.defaultProps?.id ||
      `text-field-${Math.random().toString(36).substring(7)}`,
    []
  );
  return (
    <Container {...containerProps}>
      <Label htmlFor={id} {...labelProps}>
        {label}
      </Label>
      <StyledInput
        id={id}
        size={size || "medium"}
        error={error}
        {...inputProps}
      />
      {hintText && (
        <HintText
          sx={{
            color: (theme) =>
              error ? theme.palette.error.main : theme.palette.text.secondary,
          }}
          {...hintTextProps}
        >
          {hintText}
        </HintText>
      )}
    </Container>
  );
};
