import * as React from "react";
import { StyledEngineProvider, GlobalStyles } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

export default function CustomTimePicker() {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{
          timePickerToolbarTitle: "Select time",
        }}
      >
        <GlobalStyles
          styles={{
            /* aguja */
            ".MuiTimeClock-pointer": { backgroundColor: "#e53935 !important" },
            ".MuiTimeClock-thumb": { backgroundColor: "#0d0d0d !important" },
            ".MuiTimeClock-pin": { backgroundColor: "#0d0d0d !important" },
            ".MuiClockPointer-root": { backgroundColor: "#e53935 !important" },
            ".MuiClockPointer-thumb": {
              borderColor: "#e53935 !important",
              backgroundColor: "#0d0d0d !important",
            },
            ".MuiClock-pin": { backgroundColor: "#0d0d0d !important" },

            /* contenedor de los números grandes */
            ".MuiTimePickerToolbar-hourMinuteLabel": {
              fontSize: "2.6rem !important",
              fontWeight: "700 !important",
              color: "#000 !important",
              backgroundColor: "#f5f5f5 !important", // fondo gris claro
              borderRadius: "8px !important",        // bordes redondeados
              padding: "4px 12px !important",        // espacio interno
            },

            /* números individuales (hora y minuto) */
            ".MuiTimePickerToolbar-hourMinuteLabel .MuiTypography-root": {
              fontSize: "2.6rem !important",
              fontWeight: "700 !important",
              color: "#000 !important",
            },

            /* botones AM/PM */
            ".MuiTimePickerToolbar-ampmSelection .MuiButtonBase-root": {
              fontWeight: "600 !important",
              minWidth: "52px !important",
              borderRadius: "8px !important",
            },
          }}
        />

        <StaticTimePicker
          orientation="landscape"
          displayStaticWrapperAs="mobile"
         
          ampm
        />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}
