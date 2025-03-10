import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import {Result, ResultSekeleton} from "./_components/result"
import { Suspense } from "react";


export default function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultSekeleton/>}>
        <Result/>
      </Suspense>
    </div>
    
  );
}
