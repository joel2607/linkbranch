import Head from 'next/head'

import {useSession } from 'next-auth/react';

import Myform from './components/myform';
import Topbar from './components/topbar';




export default function Home() {

  const session = useSession();
  return ( 

    <>
      <Head>
        <title>LinkBranch</title>
        <meta name="description" content="A rip-off from LinkTree" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar session={session}></Topbar>

      <Myform session = {session}></Myform>

      </>
      
  );
  
}
