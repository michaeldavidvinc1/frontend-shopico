'use client'
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";


export default function Home() {
  const {data: session} = useSession();
  console.log(session)
  return (
    <Button>Test</Button>
  );
}
