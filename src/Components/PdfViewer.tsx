"use client";

import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface PdfViewerProps {
    fileUrl: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
    return (
        <div className="border rounded-lg overflow-hidden h-[80vh]">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.311/build/pdf.worker.min.js">
                <Viewer fileUrl={fileUrl} />
            </Worker>
        </div>
    );
};
