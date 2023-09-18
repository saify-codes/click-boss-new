import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import BaseLayout from '@/layouts/base'

export const metadata: Metadata = {
  title: "Click boss",
  description: "Click boss ai manage your ads account",
  // other metadata
};

export default function Home() {
  return (
    <>
    <BaseLayout>
      <ECommerce />
    </BaseLayout>
    </>
  );
}
