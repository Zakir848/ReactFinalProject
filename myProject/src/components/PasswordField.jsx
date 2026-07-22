import { forwardRef, useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordField = forwardRef(function PasswordField(
  { label, error, helperText, ...rest },
  ref,
) {
  const [show, setShow] = useState(false);

  return (
    <TextField
      inputRef={ref}
      label={label}
      type={show ? "text" : "password"}
      fullWidth
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShow((prev) => !prev)}
              edge="end"
              aria-label={show ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
});

export default PasswordField;
