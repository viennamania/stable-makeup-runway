import { NextResponse, type NextRequest } from "next/server";

import {
	updateUserBlock,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { storecode, walletAddress, block } = body;


  const result = await updateUserBlock({
    storecode: storecode,
    walletAddress: walletAddress,
    block: block,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}
