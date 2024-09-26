"use client";
import { Button } from "@/components/ui/button";
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import React, { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

function Dashboard() {
  const { user } = useKindeBrowserClient();

  const convext = useConvex();
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await convext.query(api.user.getUser, {
      email: user?.email || ""
    });
    if (user) {
      if (!result?.length) {
        createUser({
          email: user.email || "",
          name: user.given_name || "",
          image: user.picture || ""
        }).then((resp) => {
          console.log(resp);
        });
      }
    }
  };

  return (
    <div className="p-8">
      <Header />
      <FileList />
    </div>
  );
}

export default Dashboard;
