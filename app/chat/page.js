'use client'
import dynamic from "next/dynamic";

// Dynamically load the Chatbot component only on the client
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });

export default function Page() {
  return <Chatbot />;
}
