import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../../components/Header";
import { useRouter } from "next/router";

export default function Component() {
  const redirect = useRouter();
  const { data: session } = useSession();
  if (session) {
    return router.push("/cabinet");
  }
  return (
    <>
      <Header />
    </>
  );
}
