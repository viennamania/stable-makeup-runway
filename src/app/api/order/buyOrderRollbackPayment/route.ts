import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	buyOrderRollbackPayment,
  buyOrderGetOrderById,
} from '@lib/api/order';

import {
  getOneByWalletAddress
} from '@lib/api/user';


// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";




import {
  createThirdwebClient,
  eth_getTransactionByHash,
  getContract,
  sendAndConfirmTransaction,
  sendTransaction,
  sendBatchTransaction,

} from "thirdweb";

//import { polygonAmoy } from "thirdweb/chains";
import {
  polygon,
  arbitrum,
 } from "thirdweb/chains";

import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";


import {
  mintTo,
  totalSupply,
  transfer,
  
  getBalance,

  balanceOf,

} from "thirdweb/extensions/erc20";



/*
if (!process.env.THIRDWEB_ENGINE_URL) {
  throw new Error("THIRDWEB_ENGINE_URL is not defined");
}

if (!process.env.THIRDWEB_ENGINE_ACCESS_TOKEN) {
  throw new Error("THIRDWEB_ENGINE_ACCESS_TOKEN is not defined");
}
*/


// nextjs-app
/*
export const maxDuration = 60; // This function can run for a maximum of 5 seconds
*/


//nextjs /pages/api
/*
export const config = {
	//runtime: 'edge',
	maxDuration: 120, // This function can run for a maximum of 60 seconds
};
*/





//const chain = polygon;


// USDT Token (USDT)
const tokenContractAddressUSDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum






export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, storecode, orderId, paymentAmount, isSmartAccount } = body;

  console.log("lang", lang);
  console.log("storecode", storecode);

  console.log("orderId", orderId);

  console.log("paymentAmount", paymentAmount);






  
  try {



    // get buyer wallet address


    const order = await buyOrderGetOrderById( orderId );

    if (!order) {
      return NextResponse.json({
        result: null,
      });
    }
    

    const {
      seller: seller,
      walletAddress: walletAddress,
      usdtAmount: usdtAmount,
      buyer: buyer,
    } = order as UserProps;


    // send escrowed USDT to seller

    const sellerWalletAddress = seller.walletAddress;

   


    const user = await getOneByWalletAddress(
      storecode,
      sellerWalletAddress
    );



    ///console.log("user", user);

    if (!user) {
      return NextResponse.json({
        result: null,
      });
    }



    const escrowWalletAddress = user.escrowWalletAddress;


    const toAddressStore = sellerWalletAddress

    console.log("toAddressStore", toAddressStore);

    const sendAmountToStore = usdtAmount;

    console.log("sendAmountToStore", sendAmountToStore);




    let transactionHashResult = "";
    let queueId = "";


    /*
    if (isSmartAccount) {

      const escrowWalletPrivateKey = user.escrowWalletPrivateKey;

      if (!escrowWalletPrivateKey) {
        return NextResponse.json({
          result: null,
        });
      }


      const client = createThirdwebClient({
        secretKey: process.env.THIRDWEB_SECRET_KEY || "",
      });

      if (!client) {
        return NextResponse.json({
          result: null,
        });
      }


      const personalAccount = privateKeyToAccount({
        client,
        privateKey: escrowWalletPrivateKey,
      });
    
      if (!personalAccount) {
        return NextResponse.json({
          result: null,
        });
      }


      const wallet = smartWallet({

        chain: arbitrum,

        ///factoryAddress: "0x655934C0B4bD79f52A2f7e6E60714175D5dd319b", // your own deployed account factory address
        sponsorGas: true,
      });

      // Connect the smart wallet
      const account = await wallet.connect({
        client: client,
        personalAccount: personalAccount,
      });

      if (!account) {
        return NextResponse.json({
          result: null,
        });
      }


      //const escrowWalletAddress = account.address;



      const contract = getContract({
        client,
        chain: arbitrum,
        address: tokenContractAddressUSDT, // erc20 contract from thirdweb.com/explore
      });

      const transactionSendToStore = transfer({
        contract,
        to: toAddressStore,
        amount: sendAmountToStore,
      });


      const { transactionHash } = await sendTransaction({
        account: account,
        transaction: transactionSendToStore,
      });

      //console.log("transactionHash", transactionHash);

      transactionHashResult = transactionHash;




    } else {



      const chainId = polygon.id;
      const url = process.env.THIRDWEB_ENGINE_URL + "/backend-wallet/" + chainId + "/transfer";

      ///console.log("url", url);

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
          "x-backend-wallet-address": escrowWalletAddress,
        },
        body: JSON.stringify({
          to: toAddressStore,
          currencyAddress: tokenContractAddressUSDT,
          amount: sendAmountToStore,


        }),
      });

          



      if (!resp) {
        return NextResponse.json({
          result: null,
        });
      }

      const responseJson = await resp.json();

      console.log("responseJson", responseJson);

      queueId = responseJson.result.queueId;

      ///const hash = responseJson.result.transactionHash;

      transactionHashResult = "0x";

    }

    */


    const result = await buyOrderRollbackPayment({
      lang: lang,
      storecode: storecode,
      orderId: orderId,
      paymentAmount: paymentAmount,
      queueId: queueId,
      transactionHash: transactionHashResult,
    });
  
  
    //console.log("result", JSON.stringify(result));
  
    const {
      nickname: nickname,
      tradeId: tradeId,
      krwAmount: krwAmount,
      transactionHash: transactionHash,
    } = result as UserProps;
  
  
  
    const amount = usdtAmount;
  
  
      // send sms

    /*
      if (!buyer?.mobile) {
        return NextResponse.json({
          result,
        });
      }


      // check buyer.mobile is prefixed with +
      if (!buyer?.mobile.startsWith("+")) {
        return NextResponse.json({
          result,
        });
      }


  
      const to = buyer.mobile;
  
  
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);
  
  
  
      let message = null;


      try {
  
  
        const msgBody = `[GTETHER] TID[${tradeId}] You received ${amount} USDT from ${nickname}! https://gold.goodtether.com/${lang}/${chain}/sell-usdt/${orderId}`;
    
        message = await client.messages.create({
          ///body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          body: msgBody,
          from: "+17622254217",
          to: to,
        });
    
        console.log(message.sid);

      } catch (error) {
          
        console.log("error", error);
    
      }
  
    */
  
  
  
    
    return NextResponse.json({
  
      result,
      
    });








  } catch (error) {
      
    console.log(" error=====>" + error);



  }

  


 
  return NextResponse.json({

    result: null,
    
  });
  
}
