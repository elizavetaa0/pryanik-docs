import { TextField } from "@mui/material";

interface IInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function Input({ label, type, value, onChange, error }: IInputProps) {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      margin="normal"
      error={!!error}
      helperText={error}
    />
  );
};
