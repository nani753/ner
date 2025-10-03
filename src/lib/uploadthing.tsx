"use client";

import { UploadButton, UploadDropzone, Uploader } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import React from "react";

export { UploadButton, UploadDropzone, Uploader };
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const UploadThingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};