"use client";
import { Suspense } from "react";
import ProductPageContent from "./ProductPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Cargando producto...</div>}>
      <ProductPageContent />
    </Suspense>
  );
}
