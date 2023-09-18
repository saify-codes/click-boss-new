import React from "react";
import Chat from "@/components/Chat";
import BaseLayout from "@/layouts/base";

export default function page() {
  return (
    <>
      <BaseLayout>
        <Chat />
      </BaseLayout>
    </>
  );
}
