import { NextResponse, type NextRequest } from "next/server";


// getAllUsersByStorecode
import {
  getAllUsersByStorecode,
} from "@lib/api/user";



import {
  UserProps,
	acceptBuyOrder,
  updateBuyOrderByQueueId,


  //getOneBuyOrder,
  getOneBuyOrderByTradeId,

  buyOrderConfirmPayment,

} from '@lib/api/order';






// webhook
// header
/*

Content-Type
application/json
x-webhook-key
your-webhook-key
(대시보드 > API설정 > 웹훅키에서 확인 가능)
x-mall-id
your-mall-id
(대시보드 > API설정 > 상점ID에서 확인 가능)
x-trace-id
트랜잭션 고유 ID
*/
// body
/*
{
    "order_number": "1234567890"
    "order_status": "매칭완료",
    "processing_date": "2023-07-26T11:31:00+09:00"
}
*/

// response body

/*
유형
상태코드
결과값
Response Body
200
{ "status": "success" }
 */


export async function POST(request: NextRequest) {


  // parse header
  const webhookKey = request.headers.get("x-webhook-key");
  const mallId = request.headers.get("x-mall-id");
  const traceId = request.headers.get("x-trace-id");

  console.log("payaction webhookKey", webhookKey);
  console.log("payaction mallId", mallId);
  console.log("payaction traceId", traceId); // payaction traceId 1747808169270x797731416156850300



  const body = await request.json();

  console.log("payaction body", body);
  /*
  {
    order_number: '682d72f8a9087272af75142b',
    order_status: '매칭완료',
    processing_date: '2025-05-21T15:31:06+09:00'
  }
  */


  if (!body) {
    return NextResponse.json({
      status: "error",
      message: "body is empty",
    });
  }



  const {
    order_number,
    order_status,
    processing_date,
  } = body;

 


  console.log("payaction order_number", order_number);
  console.log("payaction order_status", order_status);
  console.log("payaction processing_date", processing_date);


  if (!order_number) {
    return NextResponse.json({
      status: "false",
    });
  }

  if (order_status !== "매칭완료") {
    return NextResponse.json({
      status: "false",
    });
  }

  /*
    const result = await buyOrderConfirmPayment({
      lang: lang,
      storecode: storecode,
      orderId: orderId,
      paymentAmount: paymentAmount,
      
      queueId: queueId,

      transactionHash: transactionHashResult,

    });
    */

  /*
  const resultBuyOrder = await getOneBuyOrder({
    orderId: order_number,
    limit: 1,
    page: 1,  
  });

  //console.log("getOneBuyOrder result", resultBuyOrder);
  if (!resultBuyOrder) {
    return NextResponse.json({
      status: "error",
      message: "resultBuyOrder is empty",
    });
  }

  const buyOrder = resultBuyOrder?.orders[0];

  console.log("buyOrder", buyOrder);
  if (!buyOrder) {
    return NextResponse.json({
      status: "error",
      message: "buyOrder is empty",
    });
  }
  */




  const buyOrder = await getOneBuyOrderByTradeId({
    tradeId: order_number,
  });

  if (!buyOrder) {
    console.log("buyOrder is empty");
    return NextResponse.json({
      status: "error",
      message: "buyOrder is empty",
    });
  }

  console.log("buyOrder", buyOrder);

  
  if (buyOrder?.status !== "paymentRequested") {
    console.log("buyOrder status is not requestPayment");
    return NextResponse.json({
      status: "false",
    });
  }
  


  const storecode = buyOrder?.storecode;
  const orderId = buyOrder?._id;
  const paymentAmount = buyOrder?.krwAmount;
  const queueId = "0x";
  const transactionHash = "0x";

  const buyerDepositName = buyOrder?.buyer?.depositName || "익명";
  const buyerNickname = buyOrder?.nickname || "익명";


  
  const response = await buyOrderConfirmPayment({
    lang: "ko",
    storecode: storecode,
    orderId: orderId,
    paymentAmount: paymentAmount,
    queueId: queueId,
    transactionHash: transactionHash,


    autoConfirmPayment: true,


  });

  //console.log("confirmPayment response", response);
  


  // sendMessageByUseridAndStorecode
  // api
  // https://dubai-telegram.vercel.app/api/telegram/sendMessageByUseridAndStorecode
  // POST

  /*
    const {
    center,
    userid,
    storecode,
    message,
  } = body;
   */

  // center = 'place69_bot'
  // userid = 'mcmcmo'
  // storecode = storecode


  /*

  try {


    // get all users by storecode
    const response = await getAllUsersByStorecode({
      storecode: storecode,
      limit: 1000,
      page: 1,
    });

    const users = response?.users || [];

    console.log("getAllUsersByStorecode response", response);
    console.log("getAllUsersByStorecode users", users);


    if (users && users.length > 0) {


      //for (const user of users) {


      for (let i = 0; i < users.length; i++) {
        const user = users[i];


        //const userid = user.nickname;

        //const userid = user.id;
        // toString()으로 변환하여 사용
        const userid = user.id.toString();



        const response = await fetch("https://dubai-telegram.vercel.app/api/telegram/sendMessageByUseridAndStorecode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            center: "place69_bot",
            userid: userid,
            storecode: storecode,
            //message: `주문이 완료되었습니다. 주문번호: ${orderId}, 결제금액: ${paymentAmount}원`,

            // 주문번호: tradeId,
            // 입금시간: '2025년 5월 21일 15시 31분 06초',
            // 입금자명: "홍길동",
            // 입금액: 10,000원

            
            message:
            '주문번호: ' + '#' + order_number + '\n' +




            '입금시간: ' + processing_date.replace('T', ' ').replace('+09:00', '') + '\n' +

            '회원아이디: ' + buyerNickname + '\n' +
            '입금자명: ' + buyerDepositName + '\n' +
            '입금액: ' + paymentAmount.toLocaleString() + '원',
            
            //message: `주문번호: ${order_number}, 입금시간: ${processing_date}, 회원아이디: ${buyerNickname}, 입금자명: ${buyerDepositName}, 입금액: ${paymentAmount.toLocaleString()}원`,

          }),
        });

        if (!response.ok) {
          console.error("Failed to send Telegram message for user:", userid, "with status:", response.status);
          continue; // Skip to the next user if sending fails
        }
        const data = await response.json();
        console.log("Telegram message sent for user:", userid, "with response:", data);

      }


    } else {
      console.log("No users found for storecode:", storecode);
    }

  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }

  */


  

  return NextResponse.json({
    status: "success",
  });
  
}
