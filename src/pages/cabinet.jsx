import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Link from "next/dist/client/link";

const Cabinet = () => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
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
        <div style={{ paddingTop: "150px" }}>
          <p>
            Signed in as <b>{session.user.email}</b>
          </p>
          <div onClick={() => signout()}>SignOut</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div></div>
    </>
  );
};

export default Cabinet;
