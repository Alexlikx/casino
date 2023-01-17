import React, { use } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Cabinet = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    return router.replace("/login");
  }
  const href = "/login";
  const style = {
    marginRight: 10,
    color: router.asPath === href ? "red" : "black",
  };
  return (
    session.status !== "loading" && (
      <>
        <Header />
        <div style={{ paddingTop: "200px" }}>
          <div>{session.data.user.email}</div>
          <div onClick={() => signOut()}>Log Out</div>
        </div>
      </>
    )
  );
};

export default Cabinet;
