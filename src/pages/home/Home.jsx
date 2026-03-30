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

const Home = () => {
  const { isFetching, workSpaces } = userFetchWorkspace();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();
  const { toggleAllExistingWorkspacesModal } = useAllExistingWorkspacesModal();
  const { auth } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {

    if (isFetching) return;

    if (!workSpaces) {
      console.log("Inside home and returning ", workSpaces);
    }

    if (toggleAllExistingWorkspacesModal) return;

    if (workSpaces.length === 0 || !workSpaces) {
      console.log("NO workspaces found!");
      // setOpenCreateWorkspaceModal(true);
    } else {
      navigate(`/workspace/${workSpaces[0]._id}`);
    }
  }, [isFetching, workSpaces, navigate]);

  return (
    <div className="bg-slack-MEDIUM h-[100vh] pt-5" > 

    <div className="" >
      <img className="   rounded-[150px] shadow-2xl shadow-black   block mx-auto" src={auth?.user?.avatar} alt="" />
    </div>

      <Card className="relative mx-auto w-full max-w-sm pt-0 mt-5">

        <CardHeader>
          <CardAction>
            
          </CardAction>
          <CardTitle> <div className="font-semibold text-center text-2xl" >Hello Admin!</div> </CardTitle>
          <CardDescription className="font-semibold my-3" >
            <p className="text-center my-5 text-xl" >Welcome to Slack-Messaging</p>
            <p>A platform to manage your team and enable official communication among members. </p>
          </CardDescription>
        </CardHeader>

        <CardFooter>
          
          <UserButton /> <span className="ml-2 font-semibold" > Menu </span>
        </CardFooter>
      </Card>

    </div>
  );
};

export default Home;
