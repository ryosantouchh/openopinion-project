import React from "react";

export const AcmeIcon: any = ({ size = 32, ...props }) => (
    <img
        src="/acme.png"
        alt="Acme Icon"
        width={size}
        height={size}
        {...props}
    />
);
