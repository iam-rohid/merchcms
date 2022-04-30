import { styled, alpha } from "@mui/material";
import { FC, InputHTMLAttributes } from "react";

export type InputProps = {
  size?: "small" | "medium" | "large";
  error?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;
const Input: FC<InputProps> = ({ size, ...props }) => <input {...props} />;

export const StyledInput = styled(Input)`
  outline: none;
  border: none;
  font-size: ${({ theme, size = "medium" }) =>
    theme.spacing(size === "small" ? 3 : size === "medium" ? 3.5 : 4)};
  width: 100%;
  display: inline-block;
  background-color: ${({ theme, error }) =>
    error ? alpha(theme.palette.error.main, 0.05) : theme.palette.grey[100]};
  border-radius: ${({ theme, size = "medium" }) =>
    theme.spacing(size === "small" ? 1.5 : size === "medium" ? 1.75 : 2)};
  padding: ${({ theme, size = "medium" }) =>
    theme.spacing(
      size === "small" ? 2 : size === "medium" ? 2.5 : 3,
      size === "small" ? 3 : size === "medium" ? 4 : 5
    )};
  line-height: ${({ theme, size = "medium" }) =>
    theme.spacing(size === "small" ? 4 : size === "medium" ? 5 : 6)};
  box-shadow: ${({ theme, error }) =>
    error ? `0 0 0 1px ${theme.palette.error.main}` : "none"};
  transition: ${({ theme }) =>
    theme.transitions.create(["box-shadow", "background-color", "color"])};
  &:hover {
    box-shadow: ${({ theme, error }) =>
      `0 0 0 4px ${alpha(
        error ? theme.palette.error.main : theme.palette.primary.main,
        0.2
      )}`};
  }
  &:focus {
    box-shadow: ${({ theme, error }) =>
      `0 0 0 4px ${alpha(
        error ? theme.palette.error.main : theme.palette.primary.main,
        0.2
      )}, 0 0 0 1px ${
        error ? theme.palette.error.main : theme.palette.primary.main
      }`};
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
  &:active {
    box-shadow: ${({ theme, error }) =>
      `0 0 0 1px ${
        error ? theme.palette.error.main : theme.palette.primary.main
      }`};
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

export const Label = styled("label")`
  font-size: ${({ theme }) => theme.spacing(3.5)};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  display: inline-block;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const Container = styled("div")`
  width: 100%;
  margin-block: ${({ theme }) => theme.spacing(4)};
`;

export const HintText = styled("p")`
  font-size: ${({ theme }) => theme.spacing(3.5)};
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: inline-block;
`;
