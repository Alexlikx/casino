import React, { use } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Cabinet = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    return router.push("/");
  }
  const signout = () => {
    signOut();
    router.push("/");
  };
  return (
    session.status !== "loading" && (
      <>
        <Header />
        <div style={{ paddingTop: "200px" }}>
          <div>Your email{session.data.user.email}</div>
          <div onClick={() => signout()}>Log Out</div>
        </div>
      </>
    )
  );
};

export default Cabinet;
