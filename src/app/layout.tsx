import "./globals.scss";
import {AuthProvider} from "@/context/AuthContext";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className="main-body-layout"
        >
        <AuthProvider>
            <div className="main-container-layout">
                {children}
            </div>
        </AuthProvider>
        </body>
        </html>
    );
}
