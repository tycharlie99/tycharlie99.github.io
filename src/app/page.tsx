import Page from './page/[page]/page'; // Directly reference the component above
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  // Simulate passing params: { page: '1' }
  return <Page params={Promise.resolve({ page: '1' })} />;
}
