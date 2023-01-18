import React, { use } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Link from "next/dist/client/link";

const Cabinet = () => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const router = useRouter();
  const signout = () => {
    signOut();
  };
  if (status === "authenticated") {
    return (
      <>
        <Header />
        <div style={{ paddingTop: "100px" }}>
          <p>Signed in as {session.user.email}</p>
          <div onClick={() => signout()}>SignOut</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ paddingTop: "100px" }}>
        <Link href="/api/auth/signin">Sign in</Link>;
      </div>
    </>
  );
};

export default Cabinet;
