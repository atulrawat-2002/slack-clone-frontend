import UserButton from '@/components/atoms/UserButton/UserButton'
import { userFetchWorkspace } from '@/hooks/apis/workspace/useFetchWorksace'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const { isFetching, workSpaces }  = userFetchWorkspace()
  const navigate = useNavigate();
  console.log(workSpaces);

  useEffect(() => {

    if(isFetching) return;

    console.log("These are workspaces ", workSpaces);

    if(workSpaces.length === 0 || !workSpaces) {
      console.log('NO workspaces found!')
    } else {
        navigate(`/workspace/${workSpaces[0]._id}`)
    }

  }, [isFetching, workSpaces, navigate])

  return (
    <div>

            <h2>Home</h2>
            <UserButton />

    </div>
  )
}

export default Home