import { NextResponse, type NextRequest } from "next/server";

import {
	getCollectOrdersForUser,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    storecode,
    limit,
    page,
    walletAddress,
    searchMyOrders,

    fromDate,
    toDate,
  } = body;

  /*
  console.log("fetchCollectOrdersForUser called with params:", {
    storecode,
    limit,
    page,
    walletAddress,
    searchMyOrders,
    fromDate,
    toDate,
  });
  */
  

  const result = await getCollectOrdersForUser({
    storecode,
    limit: limit || 10,
    page: page || 1,
    walletAddress,
    searchMyOrders,

    fromDate,
    toDate,
  });

  //console.log("fetchCollectOrdersForUser result:", result);

 
  return NextResponse.json({

    result,
    
  });
  
}
