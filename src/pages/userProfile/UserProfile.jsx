import UserButton from "@/components/atoms/UserButton/UserButton";
import { userFetchWorkspace } from "@/hooks/apis/workspace/useFetchWorksace";
import { useAllExistingWorkspacesModal } from "@/hooks/context/useAllExistingWorkspaceModal";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/context/useAuth";

const UserProfile = () => {
  const { toggleAllExistingWorkspacesModal } = useAllExistingWorkspacesModal();
  const { auth } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {

    if (toggleAllExistingWorkspacesModal) return;

  }, [navigate]);

  return (
    <div className="bg-slack-MEDIUM h-[100vh] pt-1" > 

    <div className="" >
      <img className="   rounded-[150px] shadow-2xl shadow-black   block mx-auto" src={auth?.user?.avatar} alt="" />
    </div>

      <Card className="relative mx-auto w-full max-w-sm pt-0 mt-5">

        <CardHeader>
          <CardAction>
            
          </CardAction>
          <CardTitle> <div className="font-semibold text-center text-2xl" >Hello {auth?.user?.username}!</div> </CardTitle>
          <CardDescription className="font-semibold my-3" >
            <p className="text-center my-5 text-xl" >Welcome to Slack-Messaging</p>
            <p className="text-[1.1em]" >A platform to manage your team and enable official communication among members. </p>
          </CardDescription>
        </CardHeader>

        <CardFooter>
          
          <div className="flex flex-col" >
            <UserButton />  
            <p className="font-semibold" > Menu </p>
          </div> 
        </CardFooter>
      </Card>

    </div>
  );
};

export default UserProfile;
