// add children
import React from "react";

export const HourWidget = (props: any) => {
  const date = new Date();
  const hour = date.getHours();
  if (hour < 6 || hour > 18)
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <h1>¡Estamos fuera de horario!</h1>
        <p>El horario de atención es de 6:00 a 18:00</p>
      </div>
    );
  else return <div>{props.children}</div>;
};
