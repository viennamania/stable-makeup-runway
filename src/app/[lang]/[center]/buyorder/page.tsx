'use client';

import { useState, useEffect, use, act } from "react";

import Image from "next/image";



// open modal

//import Modal from '@/components/modal';
import ModalUser from '@/components/modal-user';

import { useRouter }from "next//navigation";


import { toast } from 'react-hot-toast';

import { client } from "../../../client";



import {
  getContract,
  sendAndConfirmTransaction,
  sendTransaction,
  waitForReceipt,
} from "thirdweb";



import {
  polygon,
  arbitrum,
} from "thirdweb/chains";

import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useWalletBalance,

  useSetActiveWallet,

  useConnectedWallets,


} from "thirdweb/react";

import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";





import {
  getUserPhoneNumber,
  getUserEmail,
} from "thirdweb/wallets/in-app";


import { balanceOf, transfer } from "thirdweb/extensions/erc20";
import { add } from "thirdweb/extensions/farcaster/keyGateway";
 


import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";

import { ClassNames } from "@emotion/react";


import useSound from 'use-sound';



import { useSearchParams } from 'next/navigation';




interface BuyOrder {
  _id: string;
  createdAt: string;
  walletAddress: string;
  nickname: string;
  avatar: string;
  trades: number;
  price: number;
  available: number;
  limit: string;
  paymentMethods: string[];

  usdtAmount: number;
  krwAmount: number;
  rate: number;



  seller: any;

  tradeId: string;
  status: string;
  acceptedAt: string;
  paymentRequestedAt: string;
  paymentConfirmedAt: string;
  cancelledAt: string;


  buyer: any;

  canceller: string;

  escrowTransactionHash: string;
  transactionHash: string;

  settlement: any;

  storecode: string;
  store: any;

  cancelTradeReason: string;

  paymentAmount: number;

  autoConfirmPayment: boolean;

  agentName: string;
  agentcode: string;

  userStats: any;
}



/*
const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "email",
        "x",
        "passkey",
        "phone",
        "facebook",
        "line",
        "apple",
        "coinbase",
      ],
    },
  }),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("io.metamask"),
  createWallet("com.bitget.web3"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),

];
*/

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
      ],
    },
  }),
];


// get escrow wallet address

//const escrowWalletAddress = "0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6";



const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum




export default function Index({ params }: any) {

  const searchParams = useSearchParams();
 
  const wallet = searchParams.get('wallet');


  // limit, page number params

  const limit = searchParams.get('limit') || 10;
  const page = searchParams.get('page') || 1;



  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: arbitrum,
  
  
  
    // the contract's address
    ///address: contractAddressArbitrum,

    address: contractAddressArbitrum,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });


 
  const activeWallet = useActiveWallet();



  const [data, setData] = useState({
    title: "",
    description: "",

    menu : {
      buy: "",
      sell: "",
      trade: "",
      chat: "",
      history: "",
      settings: "",
    },

    Go_Home: "",
    Buy: "",
    Sell: "",
    Amount: "",
    Price: "",
    Total: "",
    Orders: "",
    Trades: "",
    Search_my_trades: "",

    Anonymous: "",

    Seller: "",
    Buyer: "",
    Me: "",

    Buy_USDT: "",
    Rate: "",
    Payment: "",
    Bank_Transfer: "",

    I_agree_to_the_terms_of_trade: "",
    I_agree_to_cancel_the_trade: "",

    Opened_at: "",
    Cancelled_at: "",
    Completed_at: "",


    Opened: "",
    Completed: "",
    Cancelled: "",


    Waiting_for_seller_to_deposit: "",

    to_escrow: "",
    If_the_seller_does_not_deposit_the_USDT_to_escrow: "",
    this_trade_will_be_cancelled_in: "",

    Cancel_My_Trade: "",


    Order_accepted_successfully: "",
    Order_has_been_cancelled: "",
    My_Order: "",

    hours: "",
    minutes: "",
    seconds: "",

    hours_ago: "",
    minutes_ago: "",
    seconds_ago: "",

    Order_Opened: "",
    Trade_Started: "",
    Expires_in: "",

    Accepting_Order: "",

    Escrow: "",

    Chat_with_Seller: "",
    Chat_with_Buyer: "",

    Table_View: "",

    TID: "",

    Status: "",

    Sell_USDT: "",

    Buy_Order_Opened: "",
  
    Insufficient_balance: "",


    Request_Payment: "",

    Payment_has_been_confirmed: "",

    Confirm_Payment: "",

    Escrow_Completed: "",

    Buy_Order_Accept: "",

    Payment_Amount: "",

    Buy_Amount: "",

    Deposit_Name: "",

    My_Balance: "",

    Make_Escrow_Wallet: "",
    Escrow_Wallet_Address_has_been_created: "",
    Failed_to_create_Escrow_Wallet_Address: "",

    Newest_order_has_been_arrived: "",
    Payment_request_has_been_sent: "",
    Escrow_balance_is_less_than_payment_amount: "",

    Copied_Wallet_Address: "",


  } );

  useEffect(() => {
      async function fetchData() {
          const dictionary = await getDictionary(params.lang);
          setData(dictionary);
      }
      fetchData();
  }, [params.lang]);

  const {
    title,
    description,
    menu,
    Go_Home,
    Buy,
    Sell,
    Amount,
    Price,
    Total,
    Orders,
    Trades,
    Search_my_trades,

    Anonymous,

    Seller,
    Buyer,
    Me,

    Buy_USDT,
    Rate,
    Payment,
    Bank_Transfer,
    I_agree_to_the_terms_of_trade,
    I_agree_to_cancel_the_trade,

    Opened_at,
    Cancelled_at,
    Completed_at,

    Opened,
    Completed,
    Cancelled,

    Waiting_for_seller_to_deposit,

    to_escrow,

    If_the_seller_does_not_deposit_the_USDT_to_escrow,
    this_trade_will_be_cancelled_in,

    Cancel_My_Trade,

    Order_accepted_successfully,
    Order_has_been_cancelled,
    My_Order,

    hours,
    minutes,
    seconds,

    hours_ago,
    minutes_ago,
    seconds_ago,

    Order_Opened,
    Trade_Started,
    Expires_in,

    Accepting_Order,

    Escrow,

    Chat_with_Seller,
    Chat_with_Buyer,

    Table_View,

    TID,

    Status,

    Sell_USDT,

    Buy_Order_Opened,

    Insufficient_balance,

    Request_Payment,

    Payment_has_been_confirmed,

    Confirm_Payment,

    Escrow_Completed,

    Buy_Order_Accept,

    Payment_Amount,

    Buy_Amount,

    Deposit_Name,

    My_Balance,

    Make_Escrow_Wallet,
    Escrow_Wallet_Address_has_been_created,
    Failed_to_create_Escrow_Wallet_Address,

    Newest_order_has_been_arrived,
    Payment_request_has_been_sent,
    Escrow_balance_is_less_than_payment_amount,

    Copied_Wallet_Address,

  } = data;




  const router = useRouter();



  /*
  const setActiveAccount = useSetActiveWallet();
 

  const connectWallets = useConnectedWallets();

  const smartConnectWallet = connectWallets?.[0];
  const inAppConnectWallet = connectWallets?.[1];
  */


  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;



  const [phoneNumber, setPhoneNumber] = useState("");

  

  


  const [nativeBalance, setNativeBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {

    // get the balance
    const getBalance = async () => {

      ///console.log('getBalance address', address);

      
      const result = await balanceOf({
        contract,
        address: address || "",
      });

  
      //console.log(result);
  
      setBalance( Number(result) / 10 ** 6 );


      /*
      await fetch('/api/user/getBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storecode: params.center,
          walletAddress: address,
        }),
      })

      .then(response => response.json())

      .then(data => {
          setNativeBalance(data.result?.displayValue);
      });
      */



    };


    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 5000);

    return () => clearInterval(interval);

  } , [address, contract]);











  const [escrowWalletAddress, setEscrowWalletAddress] = useState('');
  const [makeingEscrowWallet, setMakeingEscrowWallet] = useState(false);

  const makeEscrowWallet = async () => {
      
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }


    setMakeingEscrowWallet(true);

    fetch('/api/order/getEscrowWalletAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lang: params.lang,
        storecode: params.center,
        walletAddress: address,
        //isSmartAccount: activeWallet === inAppConnectWallet ? false : true,
        isSmartAccount: false,
      }),
    })
    .then(response => response.json())
    .then(data => {
        
        //console.log('getEscrowWalletAddress data.result', data.result);


        if (data.result) {
          setEscrowWalletAddress(data.result.escrowWalletAddress);
          toast.success(Escrow_Wallet_Address_has_been_created);
        } else {
          toast.error(Failed_to_create_Escrow_Wallet_Address);
        }
    })
    .finally(() => {
      setMakeingEscrowWallet(false);
    });

  }

  //console.log("escrowWalletAddress", escrowWalletAddress);




  // get escrow wallet address and balance
  
  const [escrowBalance, setEscrowBalance] = useState(0);
  const [escrowNativeBalance, setEscrowNativeBalance] = useState(0);

  
  useEffect(() => {

    const getEscrowBalance = async () => {

      if (!address) {
        setEscrowBalance(0);
        return;
      }

      if (!escrowWalletAddress || escrowWalletAddress === '') return;


      
      const result = await balanceOf({
        contract,
        address: escrowWalletAddress,
      });

      //console.log('escrowWalletAddress balance', result);

  
      setEscrowBalance( Number(result) / 10 ** 6 );
            


      /*
      await fetch('/api/user/getUSDTBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storecode: params.center,
          walletAddress: escrowWalletAddress,
        }),
      })
      .then(response => response?.json())
      .then(data => {

        console.log('getUSDTBalanceByWalletAddress data.result.displayValue', data.result?.displayValue);

        setEscrowBalance(data.result?.displayValue);

      } );
       */




      await fetch('/api/user/getBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storecode: params.center,
          walletAddress: escrowWalletAddress,
        }),
      })
      .then(response => response?.json())
      .then(data => {


        ///console.log('getBalanceByWalletAddress data', data);


        setEscrowNativeBalance(data.result?.displayValue);

      });
      



    };

    getEscrowBalance();

    const interval = setInterval(() => {
      getEscrowBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address, escrowWalletAddress, contract, params.center]);
  

  //console.log('escrowBalance', escrowBalance);







  

  // get User by wallet address
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);





  useEffect(() => {

    if (address) {

      getUserEmail({ client }).then((email) => {
        console.log('email', email);

        if (email) {
          

          fetch('/api/user/setUserVerified', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // storecode, walletAddress, nickname, mobile, email
            body: JSON.stringify({
              storecode: params.center,
              walletAddress: address,
              nickname: email,
              mobile: '+82',
              email: email,
            }),
          })
          .then(response => response.json())
          .then(data => {
              //console.log('data', data);



              fetch('/api/user/getUser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  storecode: params.center,
                  walletAddress: address,
                }),
              })
              .then(response => response.json())
              .then(data => {
                  //console.log('data', data);
                  setUser(data.result);
              })

          });



        }

      });

  

      //const phoneNumber = await getUserPhoneNumber({ client });
      //setPhoneNumber(phoneNumber);


      getUserPhoneNumber({ client }).then((phoneNumber) => {
        setPhoneNumber(phoneNumber || "");
      });

    }

  } , [address]);



  
  useEffect(() => {

    if (!address) {

      setUser(null);
      return;
    }

    setLoadingUser(true);

    fetch('/api/user/getUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storecode: params.center,
            walletAddress: address,
        }),
    })
    .then(response => response.json())
    .then(data => {
        
        /////console.log('data.result', data.result);


        setUser(data.result);

        setEscrowWalletAddress(data.result.escrowWalletAddress);

        setIsAdmin(data.result?.role === "admin");

    })
    .catch((error) => {
        console.error('Error:', error);
        setUser(null);
        setEscrowWalletAddress('');
        setIsAdmin(false);
    });

    setLoadingUser(false);


  } , [address]);

  


  const [isPlaying, setIsPlaying] = useState(false);
  //const [play, { stop }] = useSound(galaxySfx);
  const [play, { stop }] = useSound('/ding.mp3');

  function playSong() {
    setIsPlaying(true);
    play();
  }

  function stopSong() {
    setIsPlaying(false);
    stop();
  }







  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  

  const [searchStorecode, setSearchStorecode] = useState(params.center);



  const [searchOrderStatusCancelled, setSearchOrderStatusCancelled] = useState(false);
  const [searchOrderStatusCompleted, setSearchOrderStatusCompleted] = useState(false);


  const [searchMyOrders, setSearchMyOrders] = useState(false);



  // limit number
  const [limitValue, setLimitValue] = useState(limit || 20);
  useEffect(() => {
    setLimitValue(limit || 20);
  }, [limit]);

  // page number
  const [pageValue, setPageValue] = useState(page || 1);
  useEffect(() => {
    setPageValue(page || 1);
  }, [page]);




  // search form date to date
  const [searchFromDate, setSearchFormDate] = useState("");
  // set today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    today.setHours(today.getHours() + 9); // Adjust for Korean timezone (UTC+9)


    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    setSearchFormDate(formattedDate);
  }, []);


  const [searchToDate, setSearchToDate] = useState("");

  // set today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    today.setHours(today.getHours() + 9); // Adjust for Korean timezone (UTC+9)

    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    setSearchToDate(formattedDate);
  }, []);



  const [searchBuyer, setSearchBuyer] = useState("");

  const [searchDepositName, setSearchDepositName] = useState("");


  // search store bank account number
  const [searchStoreBankAccountNumber, setSearchStoreBankAccountNumber] = useState("");




  const [totalCount, setTotalCount] = useState(0);
    
  const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([]);


  ///console.log('buyOrders', buyOrders);

  



  /* agreement for trade */
  const [agreementForTrade, setAgreementForTrade] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
      agreementForTrade.push(false);
  }
  /*
  useEffect(() => {
      setAgreementForTrade (
          buyOrders.map((item, idx) => {
              return false;
          })
      );
  } , [buyOrders]);
    */
    
    
  // initialize false array of 100
  const [acceptingBuyOrder, setAcceptingBuyOrder] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
      acceptingBuyOrder.push(false);
  }

   



   
    /*
    useEffect(() => {
        setAcceptingBuyOrder (
            buyOrders.map((item, idx) => {
                return false;
            })
        );
    } , [buyOrders]);
     */


    /*
    // sms receiver mobile number array
    const [smsReceiverMobileNumbers, setSmsReceiverMobileNumbers] = useState([] as string[]);
    useEffect(() => {
        setSmsReceiverMobileNumbers(
            buyOrders.map((item, idx) => {
                return user?.mobile || '';
            })
        );
    } , [buyOrders, user]);
    */

    const [smsReceiverMobileNumber, setSmsReceiverMobileNumber] = useState('');
    useEffect(() => {
        setSmsReceiverMobileNumber(phoneNumber);
    } , [phoneNumber]);



    const acceptBuyOrder = (
      index: number,
      orderId: string,
      smsNumber: string,
    ) => {

        if (!address) {
            toast.error('Please connect your wallet');
            return;
        }

        /*
        if (!escrowWalletAddress || escrowWalletAddress === '') {
          toast.error('에스크로 지갑이 없습니다.');
          return;
        }
        */

        setAcceptingBuyOrder (
          acceptingBuyOrder.map((item, idx) => idx === index ? true : item)
        );


        fetch('/api/order/acceptBuyOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lang: params.lang,
                storecode: params.center,
                orderId: orderId,
                sellerWalletAddress: address,
                sellerstorecode: params.center,

                /*
                sellerNickname: user ? user.nickname : '',
                sellerAvatar: user ? user.avatar : '',

                //buyerMobile: user.mobile,

                sellerMobile: smsNumber,
                */



                seller: user?.seller,

            }),
        })
        .then(response => response.json())
        .then(data => {

            console.log('data', data);

            //setBuyOrders(data.result.orders);
            //openModal();

            toast.success(Order_accepted_successfully);

            playSong();



            fetch('/api/order/getAllBuyOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                  {
                    storecode: params.center,
                    limit: Number(limitValue),
                    page: Number(pageValue),
                    walletAddress: address,
                    searchMyOrders: searchMyOrders,

                    searchOrderStatusCancelled: searchOrderStatusCancelled,
                    searchOrderStatusCompleted: searchOrderStatusCompleted,

                    searchBuyer: searchBuyer,
                    searchDepositName: searchDepositName,

                    searchStoreBankAccountNumber: searchStoreBankAccountNumber,


                    fromDate: searchFromDate,
                    toDate: searchToDate,

                  }
                ),
            })
            .then(response => response.json())
            .then(data => {
                ///console.log('data', data);
                setBuyOrders(data.result.orders);

                setTotalCount(data.result.totalCount);
            })



        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {


            setAgreementForTrade (
              agreementForTrade.map((item, idx) => idx === index ? false : item)
            );


            setAcceptingBuyOrder (
                acceptingBuyOrder.map((item, idx) => idx === index ? false : item)
            );

        } );


    }










  // agreement for cancel trade
  const [agreementForCancelTrade, setAgreementForCancelTrade] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    agreementForCancelTrade.push(false);
  }
  /*
  useEffect(() => {
    setAgreementForCancelTrade(
      buyOrders.map(() => false)
    );
  } , [buyOrders]);
   */


  // cancelReason
  const [cancelTradeReason, setCancelTradeReason] = useState([] as string[]);
  for (let i = 0; i < 100; i++) {
    cancelTradeReason.push('');
  }




    // cancel sell order state
    const [cancellings, setCancellings] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      cancellings.push(false);
    }
    /*
    useEffect(() => {
      setCancellings(buyOrders.map(() => false));
    }, [buyOrders]);
    */



    const cancelTrade = async (orderId: string, index: number) => {



      if (cancellings[index]) {
        return;
      }



      setCancellings(
        cancellings.map((item, i) => i === index ? true : item)
      );


      const response = await fetch('/api/order/cancelTradeBySeller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          storecode: params.center,
          walletAddress: address,
          cancelTradeReason: cancelTradeReason[index],
        })
      });

      const data = await response.json();

      ///console.log('data', data);

      if (data.result) {

        toast.success(Order_has_been_cancelled);

        playSong();


        await fetch('/api/order/getAllBuyOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              storecode: params.center,
              limit: Number(limitValue),
              page: Number(pageValue),
              walletAddress: address,
              searchMyOrders: searchMyOrders,

              searchOrderStatusCancelled: searchOrderStatusCancelled,
              searchOrderStatusCompleted: searchOrderStatusCompleted,

              searchBuyer: searchBuyer,
              searchDepositName: searchDepositName,

              searchStoreBankAccountNumber: searchStoreBankAccountNumber,


              fromDate: searchFromDate,
              toDate: searchToDate,
            }
          )
        }).then(async (response) => {
          const data = await response.json();
          //console.log('data', data);
          if (data.result) {
            setBuyOrders(data.result.orders);

            setTotalCount(data.result.totalCount);
          }
        });

      } else {
        toast.error('거래취소에 실패했습니다.');
      }


      setAgreementForCancelTrade(
        agreementForCancelTrade.map((item, i) => i === index ? false : item)
      );

      setCancellings(
        cancellings.map((item, i) => i === index ? false : item)
      );

    }








    // request payment check box
    const [requestPaymentCheck, setRequestPaymentCheck] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      requestPaymentCheck.push(false);
    }

    /*
    useEffect(() => {
        
        setRequestPaymentCheck(
          new Array(buyOrders.length).fill(false)
        );
  
    } , [buyOrders]);
     */
    




    // array of escrowing
    const [escrowing, setEscrowing] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      escrowing.push(false);
    }

    /*
    useEffect(() => {
        
        setEscrowing(
          new Array(buyOrders.length).fill(false)
        );
  
    } , [buyOrders]);
     */

    // array of requestingPayment
    const [requestingPayment, setRequestingPayment] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      requestingPayment.push(false);
    }


    /*
    useEffect(() => {

      setRequestingPayment(

        new Array(buyOrders.length).fill(false)

      );

    } , [buyOrders]);
      */




  // without escrow
  const [isWithoutEscrow, setIsWithoutEscrow] = useState(true);


  const requestPayment = async (
    index: number,
    orderId: string,
    tradeId: string,
    amount: number,
    storecode: string,


    bankInfo: any,
  ) => {


    // check escrowWalletAddress

    if (!isWithoutEscrow && escrowWalletAddress === '') {
      toast.error('Recipient wallet address is empty');
      return;
    }

    // check balance
    // send payment request

    if (balance < amount) {
      toast.error(Insufficient_balance);
      return;
    }


    // check all escrowing is false
    if (!isWithoutEscrow && escrowing.some((item) => item === true)) {
      toast.error('Escrowing');
      return;
    }




    // check all requestingPayment is false
    if (requestingPayment.some((item) => item === true)) {
      toast.error('Requesting Payment');
      return;
    }


    if (!isWithoutEscrow) {


      setEscrowing(
        escrowing.map((item, idx) =>  idx === index ? true : item) 
      );
  

  


      // send USDT
      // Call the extension function to prepare the transaction
      const transaction = transfer({
        contract,
        to: escrowWalletAddress,
        amount: amount,
      });
      


      try {


        /*
        const transactionResult = await sendAndConfirmTransaction({
            account: smartAccount as any,
            transaction: transaction,
        });

        //console.log("transactionResult===", transactionResult);
        */

        const { transactionHash } = await sendTransaction({
          
          account: activeAccount as any,

          transaction,
        });

        ///console.log("transactionHash===", transactionHash);


        /*
        const transactionResult = await waitForReceipt({
          client,
          chain: arbitrum ,
          maxBlocksWaitTime: 1,
          transactionHash: transactionHash,
        });


        console.log("transactionResult===", transactionResult);
        */
  

        // send payment request

        //if (transactionResult) {
        if (transactionHash) {

          
          setRequestingPayment(
            requestingPayment.map((item, idx) => idx === index ? true : item)
          );
          
          
          


        
          const response = await fetch('/api/order/buyOrderRequestPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              lang: params.lang,
              storecode: storecode,
              orderId: orderId,
              //transactionHash: transactionResult.transactionHash,
              transactionHash: transactionHash,
            })
          });

          const data = await response.json();

          //console.log('/api/order/buyOrderRequestPayment data====', data);


          /*
          setRequestingPayment(
            requestingPayment.map((item, idx) => {
              if (idx === index) {
                return false;
              }
              return item;
            })
          );
          */
          


          if (data.result) {

            toast.success(Payment_request_has_been_sent);

            //toast.success('Payment request has been sent');

            playSong();
            

            
            await fetch('/api/order/getAllBuyOrders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                {
                  storecode: searchStorecode,
                  limit: Number(limitValue),
                  page: Number(pageValue),
                  walletAddress: address,
                  searchMyOrders: searchMyOrders,

                  searchOrderStatusCancelled: searchOrderStatusCancelled,
                  searchOrderStatusCompleted: searchOrderStatusCompleted,

                  searchBuyer: searchBuyer,
                  searchDepositName: searchDepositName,

                  searchStoreBankAccountNumber: searchStoreBankAccountNumber,


                  fromDate: searchFromDate,
                  toDate: searchToDate,
                }
              )
            }).then(async (response) => {
              const data = await response.json();
              //console.log('data', data);
              if (data.result) {
                setBuyOrders(data.result.orders);
    
                setTotalCount(data.result.totalCount);
              }
            });


            // refresh balance

            const result = await balanceOf({
              contract,
              address: address || "",
            });

            //console.log(result);

            setBalance( Number(result) / 10 ** 6 );


          

          } else {
            toast.error('Payment request has been failed');
          }

        }


      } catch (error) {
        console.error('Error:', error);

        toast.error('Payment request has been failed');
      }

      setEscrowing(
        escrowing.map((item, idx) =>  idx === index ? false : item)
      );



    } else {
      // without escrow


      try {

        const transactionHash = '0x';


        setRequestingPayment(
          requestingPayment.map((item, idx) => idx === index ? true : item)
        );
        
        
        




      
        const response = await fetch('/api/order/buyOrderRequestPayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lang: params.lang,
            storecode: storecode,
            orderId: orderId,
            //transactionHash: transactionResult.transactionHash,
            transactionHash: transactionHash,

            // payment bank information


            paymentBankInfo: bankInfo,




          })
        });

        const data = await response.json();


        if (data.result) {

          toast.success(Payment_request_has_been_sent);

          //toast.success('Payment request has been sent');

          playSong();
          
          await fetch('/api/order/getAllBuyOrders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                storecode: searchStorecode,
                limit: Number(limitValue),
                page: Number(pageValue),
                walletAddress: address,
                searchMyOrders: searchMyOrders,

                searchOrderStatusCancelled: searchOrderStatusCancelled,
                searchOrderStatusCompleted: searchOrderStatusCompleted,

                searchBuyer: searchBuyer,
                searchDepositName: searchDepositName,

                searchStoreBankAccountNumber: searchStoreBankAccountNumber,


                fromDate: searchFromDate,
                toDate: searchToDate,
              }
            )
          }).then(async (response) => {
            const data = await response.json();
            //console.log('data', data);
            if (data.result) {
              setBuyOrders(data.result.orders);
  
              setTotalCount(data.result.totalCount);
            }
          });


          // refresh balance

          const result = await balanceOf({
            contract,
            address: address || "",
          });

          //console.log(result);

          setBalance( Number(result) / 10 ** 6 );


        } else {
          toast.error('결제요청이 실패했습니다.');
        }

      } catch (error) {
        console.error('Error:', error);

        toast.error('결제요청이 실패했습니다.');
      }

      
    } // end of without escrow


    setRequestingPayment(
      requestingPayment.map((item, idx) => idx === index ? false : item)
    );


  }









  // array of confirmingPayment

  const [confirmingPayment, setConfirmingPayment] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    confirmingPayment.push(false);
  }

  /*
  useEffect(() => {
      
      setConfirmingPayment(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);
   */


  // confirm payment check box
  const [confirmPaymentCheck, setConfirmPaymentCheck] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    confirmPaymentCheck.push(false);
  }

  /*
  useEffect(() => {
      
      setConfirmPaymentCheck(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);
    */




  // payment amoount array
  const [paymentAmounts, setPaymentAmounts] = useState([] as number[]);
  useEffect(() => {

    // default payment amount is from sellOrders krwAmount
      
    setPaymentAmounts(
      buyOrders.map((item) => item.krwAmount)
      );

  } , [buyOrders]);

  const [paymentAmountsUsdt, setPaymentAmountsUsdt] = useState([] as number[]);
  useEffect(() => {

    // default payment amount is from sellOrders krwAmount
      
    setPaymentAmountsUsdt(
      buyOrders.map((item) => item.usdtAmount)
      );

  } , [buyOrders]);



  // confirm payment
  const confirmPayment = async (

    index: number,
    orderId: string,
    paymentAmount: number,
    paymentAmountUsdt: number,

  ) => {
    // confirm payment
    // send usdt to buyer wallet address


    // if escrowWalletAddress balance is less than paymentAmount, then return

    //console.log('escrowBalance', escrowBalance);
    //console.log('paymentAmountUsdt', paymentAmountUsdt);
    
    /*
    if (escrowBalance < paymentAmountUsdt) {
      toast.error(Escrow_balance_is_less_than_payment_amount);
      return;
    }
    
    // if escrowNativeBalance is less than 0.1, then return
    if (escrowNativeBalance < 0.1) {
      toast.error('ETH balance is less than 0.1');
      return;
    }
      */



    if (confirmingPayment[index]) {
      return;
    }

    setConfirmingPayment(
      confirmingPayment.map((item, idx) =>  idx === index ? true : item)
    );


    try {

      
      if (!isWithoutEscrow) {
      
        const response = await fetch('/api/order/buyOrderConfirmPayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lang: params.lang,
            storecode: params.center,
            orderId: orderId,
            paymentAmount: paymentAmount,
            ///isSmartAccount: activeWallet === inAppConnectWallet ? false : true,
            isSmartAccount: false,
          })
        });

        const data = await response.json();

        //console.log('data', data);

        if (data.result) {
          
          ///fetchBuyOrders();

          // fetch Buy Orders
          await fetch('/api/order/getAllBuyOrders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                storecode: params.center,
                limit: Number(limitValue),
                page: Number(pageValue),
                walletAddress: address,
                searchMyOrders: searchMyOrders,

                searchOrderStatusCancelled: searchOrderStatusCancelled,
                searchOrderStatusCompleted: searchOrderStatusCompleted,

                searchBuyer: searchBuyer,
                searchDepositName: searchDepositName,

                searchStoreBankAccountNumber: searchStoreBankAccountNumber,


                fromDate: searchFromDate,
                toDate: searchToDate,
              }
            ),
          })
          .then(response => response.json())
          .then(data => {
              ///console.log('data', data);
              setBuyOrders(data.result.orders);

              setTotalCount(data.result.totalCount);
          })



          toast.success(Payment_has_been_confirmed);

          playSong();


        } else {
          toast.error('결제확인이 실패했습니다.');
        }

      } else {


        // transfer my wallet to buyer wallet address

        const buyerWalletAddress = buyOrders[index].walletAddress;
        const usdtAmount = buyOrders[index].usdtAmount;

        const transaction = transfer({
          contract,
          to: buyerWalletAddress,
          amount: usdtAmount,
        });


        try {

          const { transactionHash } = await sendTransaction({
            account: activeAccount as any,
            transaction,
          });

          console.log("transactionHash===", transactionHash);



          if (transactionHash) {

            const response = await fetch('/api/order/buyOrderConfirmPaymentWithoutEscrow', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                lang: params.lang,
                storecode: params.center,
                orderId: orderId,
                paymentAmount: paymentAmount,
                transactionHash: transactionHash,
                ///isSmartAccount: activeWallet === inAppConnectWallet ? false : true,
                isSmartAccount: false,
              })
            });

            const data = await response.json();

            //console.log('data', data);

            if (data.result) {
              
              ///fetchBuyOrders();

              // fetch Buy Orders
              await fetch('/api/order/getAllBuyOrders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                  {
                    storecode: params.center,
                    limit: Number(limitValue),
                    page: Number(pageValue),
                    walletAddress: address,
                    searchMyOrders: searchMyOrders,

                    searchOrderStatusCancelled: searchOrderStatusCancelled,
                    searchOrderStatusCompleted: searchOrderStatusCompleted,

                    searchBuyer: searchBuyer,
                    searchDepositName: searchDepositName,

                    searchStoreBankAccountNumber: searchStoreBankAccountNumber,


                    fromDate: searchFromDate,
                    toDate: searchToDate,
                  }
                ),
              })
              .then(response => response.json())
              .then(data => {
                  ///console.log('data', data);
                  setBuyOrders(data.result.orders);

                  setTotalCount(data.result.totalCount);
              })

              toast.success(Payment_has_been_confirmed);
              playSong();
            } else {
              toast.error('결제확인이 실패했습니다.');
            }


          } else {
            toast.error('결제확인이 실패했습니다.');
          }

        } catch (error) {
          console.error('Error:', error);
          toast.error('결제확인이 실패했습니다.');
        }



      }






    } catch (error) {
      console.error('Error:', error);
      toast.error('결제확인이 실패했습니다.');
    }


    setConfirmingPayment(
      confirmingPayment.map((item, idx) => idx === index ? false : item)
    );

    setConfirmPaymentCheck(
      confirmPaymentCheck.map((item, idx) => idx === index ? false : item)
    );
  

  }



  
  // array of rollbackingPayment
  const [rollbackingPayment, setRollbackingPayment] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    rollbackingPayment.push(false);
  }
  /*
  useEffect(() => {
      
      setRollbackingPayment(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);
   */

  // rollback payment check box
  const [rollbackPaymentCheck, setRollbackPaymentCheck] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    rollbackPaymentCheck.push(false);
  }
  /*
  useEffect(() => {
      
      setRollbackPaymentCheck(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);
   */


  // rollback payment
  const rollbackPayment = async (

    index: number,
    orderId: string,
    paymentAmount: number,
    paymentAmountUsdt: number,

  ) => {
    // rollback payment
    // send usdt to seller wallet address

    if (rollbackingPayment[index]) {
      return;
    }


    /*
    // if escrowWalletAddress balance is less than paymentAmount, then return
    if (escrowBalance < paymentAmountUsdt) {
      toast.error(Escrow_balance_is_less_than_payment_amount);
      return;
    }

    // if escrowNativeBalance is less than 0.1, then return
    if (escrowNativeBalance < 0.1) {
      toast.error('ETH balance is less than 0.1');
      return;
    }
      */
    


    setRollbackingPayment(
      rollbackingPayment.map((item, idx) => idx === index ? true : item)
    );


    try {

      const response = await fetch('/api/order/buyOrderRollbackPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: params.lang,
          storecode: params.center,
          orderId: orderId,
          paymentAmount: paymentAmount,
          ///isSmartAccount: activeWallet === inAppConnectWallet ? false : true,
          isSmartAccount: false,
        })
      });

      const data = await response.json();

      //console.log('data', data);

      if (data.result) {


        toast.success('Payment has been rollbacked');

        playSong();

        
        ///fetchBuyOrders();

        // fetch Buy Orders
        await fetch('/api/order/getAllBuyOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              storecode: params.center,
              limit: Number(limitValue),
              page: Number(pageValue),
              walletAddress: address,
              searchMyOrders: searchMyOrders,

              searchOrderStatusCancelled: searchOrderStatusCancelled,
              searchOrderStatusCompleted: searchOrderStatusCompleted,

              searchBuyer: searchBuyer,
              searchDepositName: searchDepositName,

              searchStoreBankAccountNumber: searchStoreBankAccountNumber,


              fromDate: searchFromDate,
              toDate: searchToDate,
            }
          ),
        })
        .then(response => response.json())
        .then(data => {
            ///console.log('data', data);
            setBuyOrders(data.result.orders);

            setTotalCount(data.result.totalCount);
        })

      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Rollback payment has been failed');
    }



    setRollbackingPayment(
      rollbackingPayment.map((item, idx) => idx === index ? false : item)
    );

    setRollbackPaymentCheck(
      rollbackPaymentCheck.map((item, idx) => idx === index ? false : item)
    );


  }















  // transfer escrow balance to seller wallet address

  const [amountOfEscrowBalance, setAmountOfEscrowBalance] = useState("");

  const [transferingEscrowBalance, setTransferingEscrowBalance] = useState(false);


  const transferEscrowBalance = async () => {

    if (transferingEscrowBalance) {
      return;
    }

    setTransferingEscrowBalance(true);

    try {

      const response = await fetch('/api/order/transferEscrowBalanceToSeller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: params.lang,
          storecode: params.center,
          walletAddress: address,
          amount: amountOfEscrowBalance,
          ///escrowWalletAddress: escrowWalletAddress,
          //isSmartAccount: activeWallet === inAppConnectWallet ? false : true,
          isSmartAccount: false,
        })
      });

      const data = await response.json();

      //console.log('data', data);

      if (data.result) {

        setAmountOfEscrowBalance("");

        toast.success('Escrow balance has been transfered to seller wallet address');

      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Transfer escrow balance has been failed');
    }

    setTransferingEscrowBalance(false);

  }









  const [latestBuyOrder, setLatestBuyOrder] = useState<BuyOrder | null>(null);


  useEffect(() => {


    const fetchBuyOrders = async () => {

      //console.log('fetchBuyOrders===============>');
      //console.log("address=", address);
      //console.log("searchMyOrders=", searchMyOrders);


      //console.log('acceptingBuyOrder', acceptingBuyOrder);
      //console.log('escrowing', escrowing);
      //console.log('requestingPayment', requestingPayment);
      //console.log('confirmingPayment', confirmingPayment);



      // check all agreementForTrade is false

      if (
        //!address || !searchMyOrders
        agreementForTrade.some((item) => item === true)
        || acceptingBuyOrder.some((item) => item === true)
        || agreementForCancelTrade.some((item) => item === true)
        || confirmPaymentCheck.some((item) => item === true)
        || rollbackPaymentCheck.some((item) => item === true)
        || acceptingBuyOrder.some((item) => item === true)
        || escrowing.some((item) => item === true)
        || requestingPayment.some((item) => item === true)
        || confirmingPayment.some((item) => item === true)
        || rollbackingPayment.some((item) => item === true)
      ) {
        return;
      }


      

      const response = await fetch('/api/order/getAllBuyOrders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(

            {
              storecode: params.center,
              limit: Number(limitValue),
              page: Number(pageValue),
              walletAddress: address,
              searchMyOrders: searchMyOrders,

              searchOrderStatusCancelled: searchOrderStatusCancelled,
              searchOrderStatusCompleted: searchOrderStatusCompleted,

              //searchStoreName: searchStoreName,


              searchBuyer: searchBuyer,
              searchDepositName: searchDepositName,

              searchStoreBankAccountNumber: searchStoreBankAccountNumber,


              fromDate: searchFromDate,
              toDate: searchToDate,



            }

        ),
      });

      if (!response.ok) {
        return;
      }



      const data = await response.json();

      //console.log('data', data);


      // if data.result is different from buyOrders
      // check neweset order is different from buyOrders
      // then toasts message
      //console.log('data.result.orders[0]', data.result.orders?.[0]);
      //console.log('buyOrders[0]', buyOrders);


      //console.log('buyOrders[0]', buyOrders?.[0]);

      if (data.result.orders?.[0]?._id !== latestBuyOrder?._id) {

        setLatestBuyOrder(data.result.orders?.[0] || null);

   
        
        //toast.success(Newest_order_has_been_arrived);
        toast.success('새로운 주문이 도착했습니다');




        // <audio src="/racing.mp3" typeof="audio/mpeg" autoPlay={soundStatus} muted={!soundStatus} />
        // audio play

        //setSoundStatus(true);

        // audio ding play

        playSong();

        // Uncaught (in promise) NotAllowedError: play() failed because the user didn't interact with the document first.


      }

      setBuyOrders(data.result.orders);

      setTotalCount(data.result.totalCount);
      


    }


    fetchBuyOrders();

    
    
    const interval = setInterval(() => {

      fetchBuyOrders();


    }, 3000);


    return () => clearInterval(interval);
    
    
    
    


  } , [
    limit,
    page,
    address,
    searchMyOrders,
    agreementForTrade,
    acceptingBuyOrder,
    escrowing,
    requestingPayment,
    confirmingPayment,
    rollbackingPayment,
    agreementForCancelTrade,
    confirmPaymentCheck,
    rollbackPaymentCheck,

    latestBuyOrder,
    //playSong,
    params.center,
    limitValue,
    pageValue,
    searchFromDate,
    searchToDate,

    searchOrderStatusCancelled,
    searchOrderStatusCompleted,


]);


///console.log('agreementForTrade', agreementForTrade);





  



const [fetchingBuyOrders, setFetchingBuyOrders] = useState(false);

const fetchBuyOrders = async () => {


  if (fetchingBuyOrders) {
    return;
  }
  setFetchingBuyOrders(true);

  const response = await fetch('/api/order/getAllBuyOrders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        storecode: params.center,
        limit: Number(limitValue),
        page: Number(pageValue),
        walletAddress: address,
        searchMyOrders: searchMyOrders,

        searchOrderStatusCompleted: true,

        searchBuyer: searchBuyer,
        searchDepositName: searchDepositName,

        searchStoreBankAccountNumber: searchStoreBankAccountNumber,

        fromDate: searchFromDate,
        toDate: searchToDate,

      }

    ),
  });

  if (!response.ok) {
    setFetchingBuyOrders(false);
    toast.error('Failed to fetch buy orders');
    return;
  }
  const data = await response.json();
  //console.log('data', data);

  setBuyOrders(data.result.orders);
  setTotalCount(data.result.totalCount);
  setFetchingBuyOrders(false);

  return data.result.orders;
}
















    // check table view or card view
    const [tableView, setTableView] = useState(true);




    const [storeCodeNumber, setStoreCodeNumber] = useState('');

    useEffect(() => {
  
      const fetchStoreCode = async () => {
  
        const response = await fetch('/api/order/getStoreCodeNumber', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const data = await response.json();
  
        //console.log('getStoreCodeNumber data', data);
  
        setStoreCodeNumber(data?.storeCodeNumber);
  
      }
  
      fetchStoreCode();
  
    } , []);
    



    // array of stores
    const [storeList, setStoreList] = useState([] as any[]);




    const [storeAdminWalletAddress, setStoreAdminWalletAddress] = useState("");

    const [fetchingStore, setFetchingStore] = useState(false);
    const [store, setStore] = useState(null) as any;
  
    useEffect(() => {
  
      setFetchingStore(true);
  
      const fetchData = async () => {
          const response = await fetch("/api/store/getOneStore", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                storecode: params.center,
                ////walletAddress: address,
              }),
          });
  
          const data = await response.json();
  
          //console.log("data", data);
  
          if (data.result) {
  
            setStore(data.result);
  
            setStoreAdminWalletAddress(data.result?.adminWalletAddress);
  

        } else {
          // get store list
          const response = await fetch("/api/store/getAllStores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
          });
          const data = await response.json();
          //console.log("getStoreList data", data);
          setStoreList(data.result.stores);
          setStore(null);
          setStoreAdminWalletAddress("");
        }
  
          setFetchingStore(false);
      };

      if (!params.center) {
        return;
      }
  
      fetchData();

      // interval
      const interval = setInterval(() => {
        fetchData();
      }
      , 5000);
      return () => clearInterval(interval);
  
    } , [params.center]);





    const [selectedItem, setSelectedItem] = useState<any>(null);
    





    /*
    const [storeTrades, setStoreTrades] = useState<{
      totalCount: number;
      totalKrwAmount: number;
      totalUsdtAmount: number;
      totalSettlementCount: number;
      totalSettlementAmount: number;
      totalSettlementAmountKRW: number;
      latestTrades: any[];
    }>({
      totalCount: 0,
      totalKrwAmount: 0,
      totalUsdtAmount: 0,
      totalSettlementCount: 0,
      totalSettlementAmount: 0,
      totalSettlementAmountKRW: 0,
      latestTrades: [],
    });

    const [fetchingStoreTrades, setFetchingStoreTrades] = useState(false);
  
    const fetchStoreSummary = async () => {
      if (!address) {
        return;
      }

      if (fetchingStoreTrades) {
        return;
      }

      setFetchingStoreTrades(true);


      const response = await fetch('/api/summary/getStoreTrades', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            storecode: params.center,
          }
        ),
      });
      if (!response.ok) {

        setFetchingStoreTrades(false);
        return;
      }
      const data = await response.json();
      
      console.log('getStoreSummary data', data);
  
      setStoreTrades(data.result);

      setFetchingStoreTrades(false);
  
    }
  
  
    useEffect(() => {
      if (!address) {
        return;
      }
      fetchStoreSummary();
      // interval
      const interval = setInterval(() => {
        fetchStoreSummary();
      } , 10000);
      return () => clearInterval(interval);
    } , [address, params.center]);
  
    */



   const [tradeSummary, setTradeSummary] = useState({
      totalCount: 0,
      totalKrwAmount: 0,
      totalUsdtAmount: 0,
      totalSettlementCount: 0,
      totalSettlementAmount: 0,
      totalSettlementAmountKRW: 0,
      totalFeeAmount: 0,
      totalFeeAmountKRW: 0,
      totalAgentFeeAmount: 0,
      totalAgentFeeAmountKRW: 0,

      orders: [] as BuyOrder[],

      totalClearanceCount: 0,
      totalClearanceAmount: 0,
      totalClearanceAmountUSDT: 0,
     });
     const [loadingTradeSummary, setLoadingTradeSummary] = useState(false);
 
 
     const getTradeSummary = async () => {
       if (!address) {
         return;
       }
       setLoadingTradeSummary(true);
       const response = await fetch('/api/summary/getTradeSummary', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           storecode: params.center,
           walletAddress: address,
           searchMyOrders: searchMyOrders,
           searchOrderStatusCompleted: true,
           //searchBuyer: searchBuyer,
           //searchDepositName: searchDepositName,
 
           //searchStoreBankAccountNumber: searchStoreBankAccountNumber,

            fromDate: searchFromDate,
            toDate: searchToDate,
         })
       });
       if (!response.ok) {
         setLoadingTradeSummary(false);
         toast.error('Failed to fetch trade summary');
         return;
       }
       const data = await response.json();
       
       console.log('getTradeSummary data', data);
 
 
       setTradeSummary(data.result);
       setLoadingTradeSummary(false);
       return data.result;
     }
 
 
 
 
     useEffect(() => {
 
       if (!address) {
         return;
       }
 
       getTradeSummary();
 
       // fetch trade summary every 10 seconds
       const interval = setInterval(() => {
         getTradeSummary();
       }, 10000);
       return () => clearInterval(interval);
 
     } , [address, searchMyOrders, params.storecode,]);
 




    useEffect(() => {
      // Dynamically load the Binance widget script
      const script = document.createElement("script");
      script.src = "https://public.bnbstatic.com/unpkg/growth-widget/cryptoCurrencyWidget@0.0.20.min.js";
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        // Cleanup the script when the component unmounts
        document.body.removeChild(script);
      };
    }, [address, store]);





  if (fetchingStore) {
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">
        <div className="py-0 w-full flex flex-col items-center justify-center gap-4">

          <Image
            src="/banner-loading.gif"
            alt="Loading"
            width={200}
            height={200}
          />

          <div className="text-lg text-gray-500">가맹점 정보를 불러오는 중...</div>
        </div>
      </main>
    );
  }
  if (!fetchingStore && !store) {
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">
        <div className="py-0 w-full flex flex-col items-center justify-center gap-4">
          <Image
            src="/banner-404.gif"
            alt="Error"
            width={200}
            height={200}
          />
          <div className="text-lg text-gray-500">가맹점 정보가 없습니다.</div>
          <div className="text-sm text-gray-400">가맹점 홈페이지로 이동해주세요.</div>

          {/* table of storeList */}
          {/* storeName, storeCode, storeLogo, goto center page */}
          
          <div className="w-full max-w-2xl">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">가맹점 이름</th>
                  <th className="px-4 py-2 text-left">가맹점 코드</th>
                  <th className="px-4 py-2 text-left">가맹점 로고</th>
                </tr>
              </thead>
              <tbody>
                {storeList.map((store) => (
                  <tr key={store.storecode} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{store.storeName}</td>
                    <td className="px-4 py-2">{store.storecode}</td>
                    <td className="px-4 py-2">
                      <Image
                        src={store.storeLogo || "/logo.png"}
                        alt={store.storeName}
                        width={100}
                        height={100}
                        className="rounded-lg w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => router.push('/' + params.lang + '/' + store.storecode + '/center')}
                        className="text-blue-500 hover:underline"
                      >
                        가맹점 페이지로 이동
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    );
  }







  if (!address) {
    return (
   <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">


      <div className="py-0 w-full">


        {params.center && (


              <div className={`w-full flex flex-row items-center justify-start gap-2
                p-2 rounded-lg mb-4
                ${store?.backgroundColor ?
                  "bg-" + store.backgroundColor + " " :
                  "bg-black/10"
                }`}>
  
              
                <div className="w-full flex flex-row items-center justify-start gap-2">
                  
                  <Image
                    src={store?.storeLogo || "/logo.png"}
                    alt="logo"
                    width={35}
                    height={35}
                    className="rounded-lg w-6 h-6"
                  />



                  {address && address === storeAdminWalletAddress && (
                    <div className="text-sm text-[#3167b4] font-bold">
                      {store?.storeName + " (" + store?.storecode + ") 가맹점 관리자"}
                    </div>
                  )}
                  {address && address !== storeAdminWalletAddress && (
                    <div className="text-sm text-[#3167b4] font-bold">
                      {store?.storeName + " (" + store?.storecode + ")"}
                    </div>
                  )}

                </div>
       


              {address && !loadingUser && (


                <div className="w-full flex flex-row items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      router.push('/' + params.lang + '/' + params.center + '/profile-settings');
                    }}
                    className="flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                  >
                    {user?.nickname || "프로필"}
                  </button>


                  {/* logout button */}
                  <button
                      onClick={() => {
                          confirm("로그아웃 하시겠습니까?") && activeWallet?.disconnect()
                          .then(() => {

                              toast.success('로그아웃 되었습니다');

                              //router.push(
                              //    "/admin/" + params.center
                              //);
                          });
                      } }

                      className="flex items-center justify-center gap-2
                        bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                  >
                    <Image
                      src="/icon-logout.webp"
                      alt="Logout"
                      width={20}
                      height={20}
                      className="rounded-lg w-5 h-5"
                    />
                    <span className="text-sm">
                      로그아웃
                    </span>
                  </button>

                </div>


              )}


              {!address && (
                <ConnectButton
                  client={client}
                  wallets={wallets}

                  /*
                  accountAbstraction={{
                    chain: arbitrum,
                    sponsorGas: true
                  }}
                  */
                  
                  theme={"light"}

                  // button color is dark skyblue convert (49, 103, 180) to hex
                  connectButton={{
                      style: {
                          backgroundColor: "#3167b4", // dark skyblue
                          color: "#f3f4f6", // gray-300
                          padding: "2px 10px",
                          borderRadius: "10px",
                          fontSize: "14px",
                          width: "60x",
                          height: "38px",
                      },
                      label: "원클릭 로그인",
                  }}

                  connectModal={{
                    size: "wide", 
                    //size: "compact",
                    titleIcon: "https://www.stable.makeup/logo-oneclick.png",                           
                    showThirdwebBranding: false,
                  }}

                  locale={"ko_KR"}
                  //locale={"en_US"}
                />
              )}




            </div>
        )}


        <div className="w-full flex flex-col justify-between items-center gap-2 mb-5">
   

          <div className="w-full flex flex-row gap-2 justify-end items-center">


          {/* right space */}
          {/* background transparent */}
          <select
            //className="p-2 text-sm bg-zinc-800 text-white rounded"


            className="p-2 text-sm bg-transparent text-zinc-800 rounded"

            onChange={(e) => {
              const lang = e.target.value;
              router.push(
                "/" + lang + "/" + params.center + "/center"
              );
            }}
          >
            <option
              value="en"
              selected={params.lang === "en"}
            >
              English(US)
            </option>
            <option
              value="ko"
              selected={params.lang === "ko"}
            >
              한국어(KR)
            </option>
            <option
              value="zh"
              selected={params.lang === "zh"}
            >
              中文(ZH)
            </option>
            <option
              value="ja"
              selected={params.lang === "ja"}
            >
              日本語(JP)
            </option>
          </select>

          {/* icon-language */}
          {/* color is tone down */}
          <Image
            src="/icon-language.png"
            alt="Language"
            width={20}
            height={20}
            className="rounded-lg w-6 h-6
              opacity-50
              "
          />

          </div>

        </div>


      </div>

    </main>


    );
  }








  // if store.adminWalletAddress is same as address, return "가맹점 관리자" else return "가맹점"
  // if user?.role is not "admin", return "가맹점"


  if (
    (address
    && store
    &&  address !== store.adminWalletAddress
    && user?.role !== "admin"
  )
    

  ) {
    return (


      <div className={`w-full flex flex-row items-center justify-start gap-2
        p-2 rounded-lg mb-4
        ${store?.backgroundColor ?
          "bg-" + store.backgroundColor + " " :
          "bg-black/10"
        }`}>

        <div className="flex flex-row items-center justify-center gap-2">
          <Image
            src={store?.storeLogo || "/logo.png"}
            alt="logo"
            width={35}
            height={35}
            className="rounded-lg w-6 h-6"
          />
          <div className="text-sm text-[#3167b4] font-bold">
            {store?.storeName + " (" + store?.storecode + ") 가맹점 관리자가 아닙니다."}
          </div>
        </div>

        {/* 회원가입한후 가맹점 관리자 등록신청을 하세요 */}
        {/* 회원가입하러 가기 */}
        <div className="flex flex-row items-center justify-center gap-2">
          <button
            onClick={() => {
              router.push('/' + params.lang + '/' + params.center + '/profile-settings');
            }}
            className="flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
          >
            회원가입하러 가기
          </button>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={() => {
            confirm("로그아웃 하시겠습니까?") && activeWallet?.disconnect()
            .then(() => {

                toast.success('로그아웃 되었습니다');

                //router.push(
                //    "/admin/" + params.center
                //);
            });
          } }

          className="flex items-center justify-center gap-2
            bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
        >
          <Image
            src="/icon-logout.webp"
            alt="Logout"
            width={20}
            height={20}
            className="rounded-lg w-5 h-5"
          />
          <span className="text-sm">
            로그아웃
          </span>
        </button>



      </div>
    );

  }





    return (

      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">


        <div className="py-0 w-full">



          <div className={`w-full flex flex-col xl:flex-row items-center justify-between gap-2
            p-2 rounded-lg mb-4
            ${store?.backgroundColor ?
              "bg-" + store.backgroundColor + " " :
              "bg-black/10"
            }`}>
              
              
              <button
                onClick={() => {
                  router.push('/' + params.lang + '/' + params.center + '/center');
                }}
                className="flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
              >

                <div className="flex flex-row items-center gap-2">
                  <Image
                      src={store?.storeLogo || "/logo.png"}
                      alt="Store"
                      width={35}
                      height={35}
                      className="rounded-lg w-5 h-5"
                  />
                  <span className="text-sm text-zinc-50">
                    {
                      store && store?.storeName + " (" + store?.storecode + ")"
                    }
                  </span>
                  {address === storeAdminWalletAddress && (
                    <div className="flex flex-row gap-2 items-center">
                      <Image
                        src="/icon-manager.png"
                        alt="Store Admin"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm text-zinc-50">
                        가맹점 관리자
                      </span>
                    </div>
                  )}
                  {isAdmin && (
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Image
                        src="/icon-admin.png"
                        alt="Admin"
                        width={20}
                        height={20}
                        className="rounded-lg w-5 h-5"
                      />
                      <span className="text-sm text-yellow-500">
                        전체 관리자
                      </span>
                    </div>
                  )}
                </div>

              </button>


              <div className="flex flex-row items-center gap-2">
                

                <div className="w-full flex flex-row items-center justify-end gap-2">
                  {!address && (
                    <ConnectButton
                      client={client}
                      wallets={wallets}

                      /*
                      accountAbstraction={{
                        chain: arbitrum,
                        sponsorGas: true
                      }}
                      */
                      
                      theme={"light"}

                      // button color is dark skyblue convert (49, 103, 180) to hex
                      connectButton={{
                          style: {
                              backgroundColor: "#3167b4", // dark skyblue
                              color: "#f3f4f6", // gray-300
                              padding: "2px 10px",
                              borderRadius: "10px",
                              fontSize: "14px",
                              width: "60x",
                              height: "38px",
                          },
                          label: "원클릭 로그인",
                      }}

                      connectModal={{
                        size: "wide", 
                        //size: "compact",
                        titleIcon: "https://www.stable.makeup/logo-oneclick.png",                           
                        showThirdwebBranding: false,
                      }}

                      locale={"ko_KR"}
                      //locale={"en_US"}
                    />
                  )}
                </div>

            
                {address && !loadingUser && (
                    <div className="w-full flex flex-row items-center justify-end gap-2">

                      <div className="hidden flex-row items-center justify-center gap-2">

                          <button
                              className="text-lg text-zinc-600 underline"
                              onClick={() => {
                                  navigator.clipboard.writeText(address);
                                  toast.success(Copied_Wallet_Address);
                              } }
                          >
                              {address.substring(0, 6)}...{address.substring(address.length - 4)}
                          </button>
                          
                          <Image
                              src="/icon-shield.png"
                              alt="Wallet"
                              width={100}
                              height={100}
                              className="w-6 h-6"
                          />

                      </div>

                      <div className="hidden flex-row items-center justify-end  gap-2">
                          <span className="text-2xl xl:text-4xl font-semibold text-green-600">
                              {Number(balance).toFixed(2)}
                          </span>
                          {' '}
                          <span className="text-sm">USDT</span>
                      </div>


                      <button
                        onClick={() => {
                          router.push('/' + params.lang + '/' + params.center + '/profile-settings');
                        }}
                        className="
                        w-32 h-10 items-center justify-center
                        flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                      >
                        {user?.nickname || "프로필"}
                      </button>


                      {/* logout button */}
                      <button
                          onClick={() => {
                              confirm("로그아웃 하시겠습니까?") && activeWallet?.disconnect()
                              .then(() => {

                                  toast.success('로그아웃 되었습니다');

                                  //router.push(
                                  //    "/admin/" + params.center
                                  //);
                              });
                          } }

                          className="
                            w-32
                            flex items-center justify-center gap-2
                            bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                      >
                        <Image
                          src="/icon-logout.webp"
                          alt="Logout"
                          width={20}
                          height={20}
                          className="rounded-lg w-5 h-5"
                        />
                        <span className="text-sm">
                          로그아웃
                        </span>
                      </button>

                  </div>
                )}


              </div>


          </div>
            
        



          <div className="flex flex-col items-start justify-center gap-2">


            {/* USDT 가격 binance market price */}
            <div
              className="
              h-20
                w-full flex
                binance-widget-marquee
              flex-row items-center justify-center gap-2
              p-2
              "

              data-cmc-ids="1,1027,52,5426,3408,74,20947,5994,24478,13502,35336,825"
              data-theme="dark"
              data-transparent="true"
              data-locale="ko"
              data-fiat="KRW"
              //data-powered-by="Powered by OneClick USDT"
              //data-disclaimer="Disclaimer"
            ></div>




            <div className="w-full flex flex-col items-end justify-end gap-2
            border-b border-zinc-300 pb-2">

              {/* 가맹점 보유금 */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/icon-escrow.png"
                    alt="Escrow"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-semibold text-zinc-500">
                    가맹점 보유금
                  </span>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Image
                    src="/icon-tether.png"
                    alt="Tether"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg text-green-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      //////(item.totalUsdtAmountClearanceBalance ? item.totalUsdtAmountClearanceBalance : 0)?.toLocaleString('us-US')
                    

                      //Number(item?.totalSettlementAmount - item?.totalUsdtAmountClearance || 0)

                      // if minus is negative, return 0
                      Number(store?.totalUsdtAmountClearance - store?.totalSettlementAmount || 0)
                      < 0 ? 0 :
                      
                      Number(store?.totalUsdtAmountClearance - store?.totalSettlementAmount || 0)
                      .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')



                    }
                  </span>
                </div>

                <div className="flex flex-row gap-1 items-center">
                  <span className="text-lg text-yellow-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      //Number(item.totalKrwAmountClearanceBalance ? item.totalKrwAmountClearanceBalance : 0)
                      //  ?.toLocaleString('ko-KR')

                      //Number(item?.totalSettlementAmountKRW - item?.totalKrwAmountClearance || 0)


                      // if minus is negative, return 0
                      Number(store?.totalKrwAmountClearance - store?.totalSettlementAmountKRW || 0)
                      < 0 ? 0 :

                      Number(store?.totalKrwAmountClearance - store?.totalSettlementAmountKRW || 0)
                      .toLocaleString('ko-KR')


                    }
                  </span>
                  <span className="text-sm text-zinc-500">
                    원
                  </span>
                </div>
              </div>

              {/* 가맹점 정산금 */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/icon-settlement.png"
                    alt="Settlement"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-semibold text-zinc-500">
                    가맹점 정산금
                  </span>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Image
                    src="/icon-tether.png"
                    alt="Tether"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg text-green-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalSettlementAmount ? store?.totalSettlementAmount : 0)
                      .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                  </span>
                </div>

                <div className="flex flex-row gap-1 items-center">
                  <span className="text-lg text-yellow-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalSettlementAmountKRW ? store?.totalSettlementAmountKRW : 0)
                      .toLocaleString('ko-KR')
                    }
                  </span>
                  <span className="text-sm text-zinc-500">
                    원
                  </span>
                </div>
              </div>


              {/* 가맹점 판매금 */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/icon-clearance.png"
                    alt="Clearance"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-semibold text-zinc-500">
                    가맹점 판매금
                  </span>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Image
                    src="/icon-tether.png"
                    alt="Tether"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg text-green-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalUsdtAmountClearance || 0)
                      .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                  </span>
                </div>

                <div className="flex flex-row gap-1 items-center">
                  <span className="text-lg text-yellow-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalKrwAmountClearance || 0)
                      .toLocaleString('ko-KR')
                    }
                  </span>
                  <span className="text-sm text-zinc-500">
                    원
                  </span>
                </div>

               </div> 

            </div>




            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 mb-4">

                <button
                    onClick={() => router.push('/' + params.lang + '/' + params.center + '/member')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    회원관리
                </button>

                <div className='flex w-32 items-center justify-center gap-2
                bg-yellow-500 text-[#3167b4] text-sm rounded-lg p-2'>
                  <Image
                    src="/icon-buyorder.png"
                    alt="Trade"
                    width={35}
                    height={35}
                    className="w-4 h-4"
                  />
                  <div className="text-sm font-semibold">
                    구매주문관리
                  </div>
                </div>

                <button
                    onClick={() => router.push('/' + params.lang + '/' + params.center + '/trade-history')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    거래내역
                </button>


                <button
                    onClick={() => router.push('/' + params.lang + '/' + params.center + '/clearance-history')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    판매(거래소)
                </button>

                <button
                  onClick={() => router.push('/' + params.lang + '/' + params.center + '/clearance-request')}
                  className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                  hover:bg-[#3167b4]/80
                  hover:cursor-pointer
                  hover:scale-105
                  transition-transform duration-200 ease-in-out
                  ">
                    출금(회원)
                </button>


            </div>


            <div className='flex flex-row items-center space-x-4'>
                <Image
                  src="/icon-buyorder.png"
                  alt="Trade"
                  width={35}
                  height={35}
                  className="w-6 h-6"
                />

                <div className="text-xl font-semibold">
                  구매주문관리
                </div>

            </div>




            {address && (
                <div className="mt-4 w-full flex flex-col xl:flex-row items-center justify-end gap-2">


                    <div className="flex flex-row items-center justify-center gap-2">
                        <Image
                            src="/icon-shield.png"
                            alt="Wallet"
                            width={100}
                            height={100}
                            className="w-6 h-6"
                        />
                        <span className="text-sm text-zinc-500">
                          USDT통장
                        </span>
                        <button
                            className="text-lg text-zinc-600 underline"
                            onClick={() => {
                                navigator.clipboard.writeText(address);
                                toast.success(Copied_Wallet_Address);
                            } }
                        >
                            {address.substring(0, 6)}...{address.substring(address.length - 4)}
                        </button>

                    </div>

                    <div className="flex flex-row items-center justify-center  gap-2">
                        <span className="text-sm text-zinc-500">
                            잔액
                        </span>
                        <span className="text-2xl xl:text-4xl font-semibold text-green-600"
                            style={{ fontFamily: 'monospace' }}
                        >
                            {Number(balance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>
                        {' '}
                        <span className="text-sm">USDT</span>
                    </div>

                </div>
            )}


            <div className="w-full flex flex-row items-center justify-end gap-2">

              {/*
              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">{Total}</div>
                <div className="text-xl font-semibold text-zinc-500">
                  {buyOrders.length} 
                </div>
              </div>
              */}



              {/*}
              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">
                  {Buy_Order_Accept}
                </div>
                <div className="text-xl font-semibold text-white">
                  {buyOrders.filter((item) => item.status === 'accepted').length}
                </div>
              </div>
              */}

              {/*}
              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">거래중</div>
                <div className="text-xl font-semibold text-zinc-500">

                  {
                    buyOrders.filter((item) => item.status === 'accepted' || item.status === 'paymentRequested').length

                  }

                </div>
              </div>


              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">전체</div>
                <div className="text-xl font-semibold text-zinc-500">
                  {totalCount}
                </div>
              </div>
              */}

            </div>



            <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-5">

              <div className="flex flex-col xl:flex-row items-center gap-2">

                {/* search bar */}
                {/* searchStorecode */}
                {/*
                <div className="flex flex-col xl:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={searchStoreName}
                    onChange={(e) => setSearchStoreName(e.target.value)}
                    placeholder="가맹점 이름"
                    className="p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    onClick={() => {
                      setPageValue(1);
                      fetchBuyOrders();
                    }}
                    //className="bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                    className={
                      `${fetchingBuyOrders ? 'bg-zinc-500' : 'bg-[#3167b4]'}
                      w-32
                      flex flex-row items-center justify-center gap-2
                      text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80`
                    }
                  >
                    {fetchingBuyOrders ? (
                      <Image
                        src="/loading.png"
                        alt="Loading"
                        width={20}
                        height={20}
                        className="w-5 h-5 animate-spin"
                      />
                    ) : (
                      <Image
                        src="/icon-search.png"
                        alt="Search"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    )}
                    <span className="text-sm">
                      {fetchingBuyOrders ? '검색중...' : '검색'}
                    </span>
                    
                  </button>

                </div>
                */}








            




                
                <div className="flex flex-row items-center gap-2">

                  <div className="flex flex-row items-center gap-2">
                    <input
                      type="checkbox"
                      checked={searchOrderStatusCancelled}
                      onChange={(e) => {
                        setSearchOrderStatusCancelled(e.target.checked);
                        setPageValue(1);
                        //fetchBuyOrders();
                      }}
                      className="w-5 h-5"
                    />
                    <label className="text-sm text-zinc-500">거래취소</label>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <input
                      type="checkbox"
                      checked={searchOrderStatusCompleted}
                      onChange={(e) => {
                        setSearchOrderStatusCompleted(e.target.checked);
                        setPageValue(1);
                        //fetchBuyOrders();
                      }}
                      className="w-5 h-5"
                    />
                    <label className="text-sm text-zinc-500">거래완료</label>
                  </div>
                </div>
                
                




              </div>



            </div>

            {/* 통장 */}
            {/*}
            {address && user?.seller?.bankInfo && (
              <div className="flex flex-row items-center gap-2 mt-4">
                <Image
                  src="/icon-bank.png"
                  alt="Bank"
                  width={35}
                  height={35}
                  className="w-6 h-6"
                />
                <div className="text-sm xl:text-xl font-semibold">
                  {user?.seller?.bankInfo.bankName}{' '}
                  {user?.seller?.bankInfo.accountNumber}{' '}
                  {user?.seller?.bankInfo.accountHolder}
                </div>

                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image
                    src="/icon-bank-auto.png"
                    alt="Bank Auto"
                    width={20}
                    height={20}
                    className="animate-spin"
                  />
                  <span className="text-sm font-semibold text-zinc-500">
                    자동입금 확인중...
                  </span>
                </div>

              </div>
            )}
            */}

            {/*}
            {address && !user?.seller?.bankInfo && (
              <div className="flex flex-row items-center gap-2 mt-4">
                <Image
                  src="/icon-bank.png"
                  alt="Bank"
                  width={35}
                  height={35}
                  className="w-6 h-6"
                />
                <div className="text-sm text-zinc-500 font-semibold">
                  입금통장정보가 없습니다. 입금통장정보가 없으면 판매가 불가능합니다.
                </div>
              </div>
            )}
            */}






              <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-3">



                {/* serach fromDate and toDate */}
                {/* DatePicker for fromDate and toDate */}
                <div className="flex flex-col xl:flex-row items-center gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src="/icon-calendar.png"
                      alt="Calendar"
                      width={20}
                      height={20}
                      className="rounded-lg w-5 h-5"
                    />
                    <input
                      type="date"
                      value={searchFromDate}
                      onChange={(e) => setSearchFormDate(e.target.value)}
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                    />
                  </div>

                  <span className="text-sm text-gray-500">~</span>

                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src="/icon-calendar.png"
                      alt="Calendar"
                      width={20}
                      height={20}
                      className="rounded-lg w-5 h-5"
                    />
                    <input
                      type="date"
                      value={searchToDate}
                      onChange={(e) => setSearchToDate(e.target.value)}
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                    />
                  </div>
                </div>


                {/* search depositName */}
                <div className="flex flex-col items-center gap-2">


                  <div className="flex flex-col xl:flex-row items-center justify-center gap-2">
                    {/* search nickname */}
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchBuyer}
                        onChange={(e) => setSearchBuyer(e.target.value)}
                        placeholder="회원 아이디"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchDepositName}
                        onChange={(e) => setSearchDepositName(e.target.value)}
                        placeholder="입금자명"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      />
                    </div>

                    {/* searchStoreBankAccountNumber */}
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchStoreBankAccountNumber}
                        onChange={(e) => setSearchStoreBankAccountNumber(e.target.value)}
                        placeholder="입금통장번호"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      /> 
                    </div>



                  


                    {/* 검색 버튼 */}
                    <div className="
                      w-28  
                      flex flex-row items-center gap-2">
                      <button
                        onClick={() => {
                          setPageValue(1);
                          
                          fetchBuyOrders();

                          getTradeSummary();
                        }}
                        //className="bg-[#3167b4] text-white px-4 py-2 rounded-lg w-full"
                        className={`${
                          fetchingBuyOrders ? 'bg-gray-400' : 'bg-[#3167b4]'
                        }
                        text-white px-4 py-2 rounded-lg w-full
                        hover:bg-[#3167b4]/80
                        hover:cursor-pointer
                        hover:scale-105
                        transition-transform duration-200 ease-in-out`}
                        title="검색"

                        disabled={fetchingBuyOrders}
                      >
                        <div className="flex flex-row items-center justify-between gap-2">
                          <Image
                            src="/icon-search.png"
                            alt="Search"
                            width={20}
                            height={20}
                            className="rounded-lg w-5 h-5"
                          />
                          <span className="text-sm">
                            {fetchingBuyOrders ? '검색중...' : '검색'}
                          </span>
                        </div>

                      </button>
                    </div>

                  </div>



                </div>




  

              </div>





            




            {/* trade summary */}

            <div className="flex flex-col xl:flex-row items-center justify-between gap-2
              w-full
              bg-zinc-100/50
              p-4 rounded-lg shadow-md
              ">

              <div className="w-full xl:w-1/3 flex flex-row items-center justify-between gap-2 pl-4 pr-4">
                
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 거래수(건)</div>
                  <div className="text-xl font-semibold text-zinc-500">
                    {tradeSummary.totalCount?.toLocaleString()} 건
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 거래금액(원)</div>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-xl font-semibold text-yellow-600"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {tradeSummary.totalKrwAmount?.toLocaleString()}
                    </span>
                    <span className="text-sm text-zinc-500">원</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 거래량(USDT)</div>
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src="/icon-tether.png"
                      alt="Tether"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="text-xl font-semibold text-green-600"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {tradeSummary.totalUsdtAmount
                      && tradeSummary.totalUsdtAmount.toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                </div>
              </div>

              {/* divider */}
              <div className="hidden xl:block w-0.5 h-10 bg-zinc-300"></div>
              <div className="xl:hidden w-full h-0.5 bg-zinc-300"></div>

              <div className="w-full xl:w-1/2
                flex flex-row items-center justify-between gap-2 pl-4 pr-4">
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 정산수(건)</div>
                  <div className="text-xl font-semibold text-zinc-500">
                    {tradeSummary.totalSettlementCount?.toLocaleString()} 건
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 정산금액(원)</div>
                  <div className="flex flex-row items-center gap-1"> 
                    <span className="text-xl font-semibold text-yellow-600"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {tradeSummary.totalSettlementAmountKRW?.toLocaleString()}
                    </span>
                    <span className="text-sm text-zinc-500">원</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 정산량(USDT)</div>
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src="/icon-tether.png"
                      alt="Tether"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="text-xl font-semibold text-green-600"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {tradeSummary.totalSettlementAmount
                      && tradeSummary.totalSettlementAmount.toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 수수료금액(원)</div>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-xl font-semibold text-yellow-600"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {
                        (tradeSummary.totalFeeAmountKRW + tradeSummary.totalAgentFeeAmountKRW)
                        .toLocaleString()
                      }
                    </span>
                    <span className="text-sm text-zinc-500">원</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 수수료수량(USDT)</div>
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src="/icon-tether.png"
                      alt="Tether"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="text-xl font-semibold text-green-600"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {
                        (tradeSummary.totalFeeAmount + tradeSummary.totalAgentFeeAmount)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    </span>
                  </div>
                </div>
              </div>


              {/* divider */}
              {/*
              <div className="hidden xl:block w-0.5 h-10 bg-zinc-300"></div>
              <div className="xl:hidden w-full h-0.5 bg-zinc-300"></div>

              <div className="w-full xl:w-1/4 flex flex-row items-center justify-between gap-2 pl-4 pr-4">
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 청산수(건)</div>
                  <div className="text-xl font-semibold text-zinc-500">
                    {tradeSummary.totalClearanceCount?.toLocaleString()} 건
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 청산금액(원)</div>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-xl font-semibold text-yellow-600">
                      {tradeSummary.totalClearanceAmount?.toLocaleString()}
                    </span>
                    <span className="text-sm text-zinc-500">원</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">총 청산수량(USDT)</div>
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src="/icon-tether.png"
                      alt="Tether"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="text-xl font-semibold text-green-600">
                      {tradeSummary.totalClearanceAmountUSDT
                      && tradeSummary.totalClearanceAmountUSDT.toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                </div>
              </div>
              */}
              
            </div>


        



            {/* table view is horizontal scroll */}
            {tableView ? (


              <div className="w-full overflow-x-auto">

                <table className=" w-full table-auto border-collapse border border-zinc-800 rounded-md">

                  <thead
                    className="bg-zinc-800 text-white text-sm font-semibold"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <tr>

                      <th className="p-2">
                        가맹점
                        <br/>
                        {TID}
                      </th>

                      <th className="p-2">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span>구매자 아이디</span>
                          <span>입금자</span>
                          <span>USDT통장</span>
                        </div>
                      </th>
                      
                      <th className="p-2">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span>구매금액(원)</span>
                          <span>구매량(USDT)</span>
                          <span>환율</span>
                        </div>
                      </th>

                      {/*
                      <th className="p-2">{Payment_Amount}</th>
                      */}

                      <th className="p-2">
                        <div className="flex flex-col items-center justify-center gap-2">

                          <div className="flex flex-row items-center justify-center gap-2">
                            <span>자동매칭</span>
                            <Image
                              src="/icon-matching.png"
                              alt="Auto Matching"
                              width={20}
                              height={20}
                              className={`
                                ${buyOrders.filter((item) => item.status === 'ordered').length > 0 ? 'animate-spin' : ''}
                                w-5 h-5
                              `}
                            />

                            {/* the count of status is ordered */}
                            <span className="text-sm text-zinc-50 font-semibold">
                              {
                                buyOrders.filter((item) => item.status === 'ordered').length
                              }
                            </span>

                            <span className="text-sm text-zinc-50 font-semibold">
                              거래상태
                            </span>
                          </div>
                          {/* 판매자 USDT통장 */}
                          <span className="text-sm text-zinc-50 font-semibold">
                            판매자 USDT통장
                          </span>

                        </div>
                      </th>



                      <th className="p-2">
                        <div className="flex flex-col items-center justify-center gap-2">

                          <div className="flex flex-row items-center justify-center gap-2">
                            <span>
                              자동입금확인
                            </span>
                            <Image
                              src="/icon-bank-auto.png"
                              alt="Bank Auto"
                              width={20}
                              height={20}
                              className={`
                                ${buyOrders.filter((item) => item.status === 'paymentRequested').length > 0 ? 'animate-spin' : ''}
                              w-5 h-5`}
                            />
                            <span className="text-sm text-zinc-50 font-semibold">
                              {
                                buyOrders.filter((item) => item.status === 'paymentRequested').length
                              }
                            </span>

                          </div>

                        </div>

                      </th>


                      <th className="p-2">
                        <div className="flex flex-col xl:flex-row items-center justify-center gap-2">
                          <span>
                            거래취소
                          </span>
                          <span>
                            거래완료
                          </span>
                        </div>
                      </th>

                      <th className="
                        p-2">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="flex flex-row items-center justify-center gap-2">
                            <span>
                              자동결제 및 정산(USDT)
                            </span>
                            <Image
                              src="/icon-settlement.png"
                              alt="Settlement"
                              width={20}
                              height={20}
                              className={`
                                ${buyOrders.filter((item) => item.status === 'paymentConfirmed'
                                && item?.settlement?.status !== "paymentSettled").length > 0 ? 'animate-spin' : ''}
                                w-5 h-5
                              `}
                            />

                            <span className="text-sm text-zinc-50 font-semibold">
                              {
                                buyOrders.filter((item) => item.status === 'paymentConfirmed'
                                && item?.settlement?.status !== "paymentSettled").length
                              }
                            </span>

                          </div>


                        </div>

                      </th>
                      

                    </tr>
                  </thead>

                  {/* if my trading, then tr has differenc color */}
                  <tbody>

                    {buyOrders.map((item, index) => (

                      
                      <tr key={index} className={`
                        ${
                          index % 2 === 0 ? 'bg-zinc-100' : 'bg-zinc-200'


                          //item.walletAddress === address ?
                          

                        }
                      `}>
                      

                        <td className="
                          p-2
                        "
                        >

                          <div className="

                            w-36 
                            flex flex-col xl:flex-row items-start justify-start gap-2
                            bg-zinc-100
                            rounded-lg
                            border border-zinc-800
                            hover:bg-zinc-200
                            cursor-pointer
                            transition-all duration-200 ease-in-out
                            hover:scale-105
                            hover:shadow-lg
                            hover:shadow-zinc-500/50
                            hover:cursor-pointer
                            p-2

                            "
                            onClick={() => {

                              // copy traideId to clipboard
                              navigator.clipboard.writeText(item.tradeId);
                              toast.success("거래번호가 복사되었습니다.");



                            }}
                          
                          >




                            <div className=" flex flex-col gap-2 items-center justify-start">

                              <div className="flex flex-row items-center justify-start gap-2">
                                <Image
                                  src={item?.store?.storeLogo || "/icon-store.png"}
                                  alt="Avatar"
                                  width={35}
                                  height={35}
                                  className="rounded-full w-8 h-8"
                                />
                                
                                <div className="flex flex-col items-start justify-start">
                                  <span className="text-sm text-zinc-500 font-semibold">
                                    {
                                      item?.store?.storeName
                                    }
                                  </span>
                                  <span className="text-sm text-zinc-500 font-semibold">
                                    {
                                      item?.agentName || item?.agentcode
                                    }
                                  </span>
                                </div>
                              </div>


                              <span className="text-sm text-zinc-500 font-semibold">
                              {
                                "#" + item.tradeId
                              }
                              </span>

                              <span className="text-sm text-zinc-500 font-semibold">
                                {params.lang === 'ko' ? (
                                  <p>{
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) :
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )
                                  }</p>
                                ) : (
                                  <p>{
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) :
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )
                                  }</p>
                                )}
                              </span>

                            </div>

                          </div>

                        </td>
                        
                        <td className="p-2">
                          <div className="flex flex-col items-start justify-start gap-2">
                            {/*
                            <Image
                              src={item.avatar || "/profile-default.png"}
                              alt="Avatar"
                              width={20}
                              height={20}
                              priority={true} // Added priority property
                              className="rounded-full"
                              style={{
                                  objectFit: 'cover',
                                  width: '20px',
                                  height: '20px',
                              }}
                            />
                            */}
                            
                            <div className="flex flex-col gap-2 items-start justify-start">

                              <div className="flex flex-row items-center gap-2">     
                                <Image
                                  src={item?.buyer?.avatar || "/profile-default.png"}
                                  alt="Avatar"
                                  width={20}
                                  height={20}
                                  className="rounded-full w-5 h-5"
                                  style={{
                                    objectFit: 'cover',
                                  }}
                                />                         
                                <span className="text-lg text-blue-600 font-bold">
                                  {
                                    item?.nickname?.length > 10 ?
                                    item?.nickname?.substring(0, 10) + '...' :
                                    item?.nickname
                                  }
                                </span>
                              </div>

                              {/* buyer info */}


                              <div className="flex flex-row items-center gap-2">
                                <span className="text-sm text-yellow-600 font-semibold">
                                  {
                                    //item.walletAddress === address ? 'Me' : item.tradeId ? item.tradeId : ''

                                    item?.buyer?.depositName

                                  }
                                </span>
                                <span className="
                                  hidden xl:flex
                                  text-sm text-zinc-500">
                                  {
                                    item?.buyer?.depositBankName
                                  }
                                </span>
                                <span className="
                                  text-sm text-zinc-500">
                                  {
                                    item?.buyer?.depositBanktAccountNumber &&
                                    item?.buyer?.depositBanktAccountNumber.substring(0, 3) + '...'
                                  }
                                </span>
                              </div>


                            </div>

                            {/* wallet address */}
                            <div className="flex flex-row items-center gap-2">
                              <button
                                className="text-sm text-blue-600 font-semibold
                                underline
                                "
                                onClick={() => {
                                  navigator.clipboard.writeText(item.walletAddress);
                                  toast.success(Copied_Wallet_Address);
                                }}
                              >
                                {item.walletAddress.substring(0, 6)}...{item.walletAddress.substring(item.walletAddress.length - 4)}
                              </button>
                            </div>


                            {/* userStats */}
                            {/* userStats.totalPaymentConfirmedCount */}
                            {/* userStats.totalPaymentConfirmedKrwAmount */}
                            <div className="flex flex-row items-center justify-center gap-2">
                              <span className="text-sm text-zinc-500">
                                {
                                  item?.userStats?.totalPaymentConfirmedCount
                                  ? item?.userStats?.totalPaymentConfirmedCount.toLocaleString() + ' 건' :
                                  0 + ' 건'
                                }
                              </span>
                              <span className="text-sm text-zinc-500">
                                {
                                  item?.userStats?.totalPaymentConfirmedKrwAmount &&
                                  item?.userStats?.totalPaymentConfirmedKrwAmount.toLocaleString() + ' 원'
                                }
                              </span>

                              {!item?.userStats?.totalPaymentConfirmedCount && (
                                <Image
                                  src="/icon-new-user.png"
                                  alt="New User"
                                  width={50}
                                  height={50}
                                  className="w-10 h-10"
                                />
                              )}
                            </div>



                          </div>

                        </td>


                        <td className="p-2">
                          <div className="
                            w-28
                            flex flex-col gap-2 items-end justify-start">

                            <div className="flex flex-row items-center justify-end gap-1">
                              <span className="text-lg text-yellow-600 font-semibold"
                                style={{
                                  fontFamily: 'monospace',
                                }}
                              >
                                {
                                  item.krwAmount?.toLocaleString()
                                }
                              </span>
                              <span className="text-sm text-zinc-500">
                                원
                              </span>
                            </div>


                            <div className="flex flex-row items-center justify-end gap-2">
                              <Image
                                src="/icon-tether.png"
                                alt="Tether"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                              />
                              <span className="text-lg text-green-600 font-semibold"
                                style={{
                                  fontFamily: 'monospace',
                                }}
                              >
                                {item.usdtAmount
                                  && item.usdtAmount.toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </span>
                            </div>

                            <span className="text-sm text-zinc-500"
                              style={{
                                fontFamily: 'monospace',
                              }}
                            >
                              {
                                Number(item.rate)
                                //Number(item.krwAmount / item.usdtAmount).toFixed(2)
                              }
                            </span>
                          </div>
                        </td>

                        {/*}
                        <td className="p-2">
                          <div className="flex flex-col gap-2 items-center justify-center">
                            {

                              (
                                item.status === 'paymentRequested' ||
                                item.status === 'ordered' ||
                                item.status === 'accepted' ||
                                item.status === 'paymentConfirmed'
                              ) ? (

                                <div className="text-xl text-zinc-500 font-semibold"
                                  // monospace
                                  style={{
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  {
                                    item.krwAmount?.toLocaleString() + ' 원'
                                  }
                                </div>

                              ) : (
                                item.status === 'test'
                              ) ? (
                                <div className="flex flex-col gap-2 items-end justify-center">
                                  <input
                                    disabled={false}
                                    type="number"
                                    value={paymentAmounts[index]}
                                    onChange={(e) => {
                                      setPaymentAmounts(
                                        paymentAmounts.map((item, idx) => idx === index ? Number(e.target.value) : item)
                                      );
                                    }}
                                    className="w-20 h-8 rounded-md text-right text-lg text-zinc-500 font-semibold bg-zinc-100 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />{' '}원
                                </div>
                              ) : (
                                <></>
                              )

                            }
                          </div>
                        </td>
                        */}






                        <td className="p-2">

                          <div className="
                            w-48
                            flex flex-row items-center justify-center gap-2">
                            {/* status */}
                            {item.status === 'ordered' && (
                              <div className="flex flex-col gap-2 items-center justify-center">

                                <div className="flex flex-row items-center justify-center gap-2">
                                  <Image
                                    src="/icon-matching.png"
                                    alt="Auto Matching"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 animate-spin"
                                  />
                                  <span className="text-sm text-zinc-500 font-semibold">
                                    판매자 매칭중...
                                  </span>
                                </div>

                                <button
                                  className="text-sm text-red-600 font-semibold
                                    border border-red-600 rounded-lg p-2
                                    bg-red-100
                                    w-full text-center
                                    hover:bg-red-200
                                    cursor-pointer
                                    transition-all duration-200 ease-in-out
                                    hover:scale-105
                                    hover:shadow-lg
                                    hover:shadow-red-500/50
                                  "
                                  onClick={() => {
                                    setSelectedItem(item);
                                    openModal();
                                  }}
                                >
                                  {Buy_Order_Opened}
                                </button>


                        
                              


                              {/*
                              <div className="text-lg text-yellow-600 font-semibold
                                border border-yellow-600 rounded-lg p-2
                                bg-yellow-100
                                w-full text-center
                                ">


                                {Buy_Order_Opened}
                              </div>
                              */}

                              </div>
                            )}

                            {item.status === 'ordered' ? (
                              <span className="text-sm text-zinc-500 font-semibold">
                                
                              </span>
                            ) : (

                              <div className="flex flex-col gap-2 items-center justify-center">

                                <div className="flex flex-row items-center justify-center gap-2">

                                  <Image
                                    src="/icon-matching-completed.png"
                                    alt="Matching Completed"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                  />
                                  <span className="text-sm text-zinc-500 font-semibold">
                                    매칭완료
                                  </span>
                                </div>


                                <div className="flex flex-row items-center justify-center gap-2"> 
                                  <Image
                                    src={item?.seller?.avatar || "/icon-seller.png"}
                                    alt="Avatar"
                                    width={20}
                                    height={20}
                                    className="rounded-full w-5 h-5"
                                  />
                                  <span className="text-lg font-semibold text-zinc-500">
                                    {
                                      item.seller?.nickname &&
                                      item.seller.nickname.length > 10 ?
                                      item.seller.nickname.slice(0, 10) + '...' :
                                      item.seller?.nickname
                                    }
                                  </span>
                                </div>

                                {/* wallet address */}
                                <div className="flex flex-row items-center justify-center gap-2">
                                  <button
                                    className="text-sm text-blue-600 font-semibold
                                    underline
                                    "
                                    onClick={() => {
                                      navigator.clipboard.writeText(item.seller?.walletAddress);
                                      toast.success(Copied_Wallet_Address);
                                    }}
                                  >
                                    {item.seller?.walletAddress && item.seller?.walletAddress.substring(0, 6) + '...' + item.seller?.walletAddress.substring(item.seller?.walletAddress.length - 4)}
                                  </button>
                                </div>
                                {/*
                                <span className="text-sm text-zinc-500">
                                  {
                                    item.seller?.walletAddress &&
                                    item.seller?.walletAddress.slice(0, 5) + '...' + item.seller?.walletAddress.slice(-5)
                                  }
                                </span>
                                */}


                              </div>
                            )}


                          






                            {item.status === 'accepted' && (

                              <div className="flex flex-col gap-2 items-center justify-center">
                                <button
                                  className="text-sm text-blue-600 font-semibold
                                    border border-blue-600 rounded-lg p-2
                                    bg-blue-100
                                    w-full text-center
                                    hover:bg-blue-200
                                    cursor-pointer
                                    transition-all duration-200 ease-in-out
                                    hover:scale-105
                                    hover:shadow-lg
                                    hover:shadow-blue-500/50
                                  "
                                  onClick={() => {
                                    setSelectedItem(item);
                                    openModal();
                                  }}
                                >
                                  {Trade_Started}
                                </button>


                                {/*
                                <div className="text-sm text-white">
                                  {item.seller?.nickname}
                                </div>
                                */}
                                
                                <div className="text-sm text-zinc-500">

                                  {params.lang === 'ko' ? (
                                    <p>{
                                      new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                      ) :
                                      new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                      ) : (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                      )
                                    }</p>
                                  ) : (
                                    <p>{
                                      new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                      ) :
                                      new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                      ) : (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                      )
                                    }</p>
                                  )}

                                </div>


                              </div>
                            )}

                            {item.status === 'paymentRequested' && (

                              <div className="flex flex-col gap-2 items-start justify-start">



                                {/*
                                <div className="text-lg text-yellow-600 font-semibold
                                  border border-yellow-600 rounded-lg p-2
                                  bg-yellow-100
                                  w-full text-center
                                  ">
                          

                                  {Request_Payment}


                                </div>
                                */}
                                <button
                                  className="text-sm text-yellow-600 font-semibold
                                    border border-yellow-600 rounded-lg p-2
                                    bg-yellow-100
                                    w-full text-center
                                    hover:bg-yellow-200
                                    cursor-pointer
                                    transition-all duration-200 ease-in-out
                                    hover:scale-105
                                    hover:shadow-lg
                                    hover:shadow-yellow-500/50
                                  "
                                  onClick={() => {
                                    setSelectedItem(item);
                                    openModal();
                                  }}
                                >
                                  {Request_Payment}
                                </button>


                                {/*
                                <div className="text-sm text-white">
                                  {item.seller?.nickname}
                                </div>
                                */}

                                <div className="text-sm text-zinc-500">
                                  {/* from now */}
                                  {
                                    new Date().getTime() - new Date(item.paymentRequestedAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.paymentRequestedAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) : new Date().getTime() - new Date(item.paymentRequestedAt).getTime() < 1000 * 60 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.paymentRequestedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.paymentRequestedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )
                                  }
                                </div>


                              </div>
                            )}

                            {item.status === 'cancelled' && (
                              <div className="flex flex-col gap-2 items-start justify-start">

                                  {/*
                                  <div className="text-lg text-red-600 font-semibold
                                    border border-red-600 rounded-lg p-2
                                    bg-red-100
                                    w-full text-center
                                    ">
                                    {
                                      Cancelled_at
                                    }
                                  </div>
                                  */}
                                  <button
                                    className="text-sm text-red-600 font-semibold
                                      border border-red-600 rounded-lg p-2
                                      bg-red-100
                                      w-full text-center
                                      hover:bg-red-200
                                      cursor-pointer
                                      transition-all duration-200 ease-in-out
                                      hover:scale-105
                                      hover:shadow-lg
                                      hover:shadow-red-500/50
                                    "
                                    onClick={() => {
                                      setSelectedItem(item);
                                      openModal();
                                    }}
                                  >
                                    {Cancelled_at}
                                  </button>



                                  {/*
                                  <span className="text-sm text-white">
                                    {item.seller?.nickname}
                                  </span>
                                  */}

                                  <div className="text-sm text-zinc-500">
                                    {
                                      // from now
                                      new Date().getTime() - new Date(item.cancelledAt).getTime() < 1000 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.cancelledAt).getTime()) / 1000) + ' ' + seconds_ago
                                      ) : new Date().getTime() - new Date(item.cancelledAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.cancelledAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                      ) : (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.cancelledAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                      )
                                    }
                                  </div>

                              </div>
                            )}


                            {/* if status is accepted, show payment request button */}
                            {item.status === 'paymentConfirmed' && (
                              <div className="flex flex-col gap-2 items-start justify-start">

                                {/*
                                <span className="text-lg text-green-600 font-semibold
                                  border border-green-600 rounded-lg p-2
                                  bg-green-100
                                  w-full text-center
                                  ">


                                  {Completed}
                                </span>
                                */}
                                {/*
                                <span className="text-sm font-semibold text-white">
                                  {item.seller?.nickname}
                                </span>
                                */}



                                <button
                                  className="text-sm text-green-600 font-semibold
                                    border border-green-600 rounded-lg p-2
                                    bg-green-100
                                    w-full text-center
                                    hover:bg-green-200
                                    cursor-pointer
                                    transition-all duration-200 ease-in-out
                                    hover:scale-105
                                    hover:shadow-lg
                                    hover:shadow-green-500/50
                                  "
                                  onClick={() => {
                                    setSelectedItem(item);
                                    openModal();
                                  }}
                                >
                                  {Completed}
                                </button>
                                {/* new window */}
                                {/* https://www.cryptoss.beauty/ */}
                                <a
                                  href={`https://www.cryptoss.beauty/ko/${item?.storecode}/pay-usdt-reverse/${item?._id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 font-semibold hover:underline"
                                >
                                  새창
                                </a>

                                <span
                                  className="text-sm text-zinc-500"
                                >{
                                  //item.paymentConfirmedAt && new Date(item.paymentConfirmedAt)?.toLocaleString()
                                  // from now
                                  new Date().getTime() - new Date(item.paymentConfirmedAt).getTime() < 1000 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000) + ' ' + seconds_ago
                                  ) : new Date().getTime() - new Date(item.paymentConfirmedAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                  ) : (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                  )

                                }</span>
                              </div>
                            )}





                            {item.status === 'completed' && (
                              <div className="flex flex-col gap-2 items-start justify-start">
                                
                                {Completed_at}
                              </div>
                            )}

                          </div>

                        </td>




                        <td className="p-2">

                          {item?.status === 'paymentConfirmed' && (
                            <div className="
                              w-32
                              flex flex-col gap-2 items-center justify-center">
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <Image
                                  src="/icon-payaction.png"
                                  alt="Bank Check"
                                  width={30}
                                  height={30}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span className="text-sm font-semibold text-zinc-500">
                                  입금완료
                                </span>
                              </div>

                              {/* seller bank info */}
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <span className="text-sm text-zinc-500">
                                  {/*item.seller?.bankInfo?.bankName*/}
                                  {item.store?.bankInfo?.bankName}
                                </span>
                                <span className="text-sm text-zinc-500">
                                  {/*item.seller?.bankInfo?.accountHolder*/}
                                  {item.store?.bankInfo?.accountHolder}
                                </span>
                              </div>

                              {/* paymentAmount */}
                              <div className="flex flex-row gap-1 items-center justify-center">
                                <span className="text-lg text-yellow-600 font-semibold"
                                  style={{ fontFamily: 'monospace' }}>
                                  {
                                    item.paymentAmount?.toLocaleString()
                                  }
                                </span>
                                <span className="text-sm text-zinc-500">
                                  원
                                </span>
                              </div>
                            


                            </div>
                          )}

                          {item?.status === 'paymentRequested' && (

                            <div className="
                              w-32
                              flex flex-col gap-2 items-center justify-center">
  
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <Image
                                  src="/icon-bank-auto.png"
                                  alt="Bank Auto"
                                  width={20}
                                  height={20}
                                  className="animate-spin"
                                />
                                <span className="text-sm font-semibold text-zinc-500">
                                  입금 확인중...
                                </span>
                              </div>

                              <div className="flex flex-col gap-2 items-center justify-center">
                                <div className="flex flex-row items-center gap-2">
                                  <div className="text-sm text-zinc-500">
                                    {/*item.seller?.bankInfo?.bankName*/}
                                    {item.store?.bankInfo?.bankName}
                                  </div>
                                  <div className="text-sm text-zinc-500">
                                    {/*item.seller?.bankInfo?.accountHolder*/}
                                    {item.store?.bankInfo?.accountHolder}
                                  </div>
                                </div>
                                <div className="text-sm text-zinc-500">
                                  {/*item.seller?.bankInfo?.accountNumber*/}
                                  {item.store?.bankInfo?.accountNumber}
                                </div>

                              </div>


                            </div>

                          )}
                        </td>






                        <td className="p-2">
                          <div className="w-full flex flex-col gap-2 items-center justify-center">


                          {
                            user?.seller &&
                            item.status === 'ordered'  && (


                            <div className="bg-gray-500/10
                              rounded-md
                              p-2

                              w-44
                              xl:w-64
                              flex flex-col xl:flex-row gap-2 items-sart justify-start">


                            
                              <div className="
                                w-full
                                flex flex-col gap-2 items-end justify-center">

                                <div className="flex flex-row gap-2">
                                  <input
                                    type="checkbox"
                                    checked={agreementForTrade[index]}
                                    onChange={(e) => {
                                      setAgreementForTrade(
                                        agreementForTrade.map((item, idx) => idx === index ? e.target.checked : item)
                                      );
                                    }}
                                  />
                                  <button
                                    disabled={acceptingBuyOrder[index] || !agreementForTrade[index]}
                                    className="
                                      text-sm text-blue-600 font-semibold
                                      border border-blue-600 rounded-lg p-2
                                      bg-blue-100
                                      w-full text-center
                                      hover:bg-blue-200
                                      cursor-pointer
                                      transition-all duration-200 ease-in-out
                                      hover:scale-105
                                      hover:shadow-lg
                                      hover:shadow-blue-500/50
                                    "
                                    onClick={() => {
                                      acceptBuyOrder(index, item._id, smsReceiverMobileNumber);
                                    }}
                                  >
                                    <div className="flex flex-row gap-2 items-center justify-center">
                                      {acceptingBuyOrder[index] && (
                                        <Image
                                          src="/loading.png"
                                          alt="Loading"
                                          width={20}
                                          height={20}
                                          className="animate-spin"
                                        />
                                      )}
                                      <span className="text-sm">{Buy_Order_Accept}</span>
                                    </div>
                                  </button>

                                </div>

                                <div className="flex flex-row gap-2 items-center justify-center">
                                  <Image
                                    src={user?.avatar || "/icon-seller.png"}
                                    alt="User"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                  />
                                  {/* seller nickname */}
                                  <div className="text-lg text-zinc-500 font-semibold">
                                    {user?.nickname}
                                  </div>
                                </div>


                              </div>

                            </div>

                          )}
















                          {item?.seller?.walletAddress !== address ? (

                            <div className="flex flex-col gap-2 items-center justify-center">

                              {/*
                              <div className="flex flex-col xl:flex-row gap-2 items-center justify-center">
                                <span className="text-sm text-zinc-500 font-semibold">
                                  {item.store?.bankInfo?.bankName}
                                </span>
                                <span className="text-sm text-zinc-500 font-semibold">

                                  {item.store?.bankInfo?.accountNumber &&
                                    item.store?.bankInfo?.accountNumber.substring(0, 3) + '...'
                                  }
                                </span>
                                <span className="text-sm text-zinc-500 font-semibold">
                                  {item.store?.bankInfo?.accountHolder}
                                </span>
                              </div>

                              {item.status === 'cancelled' && (
                                <div className="text-sm text-red-600">
                                  {item.cancelTradeReason ? item.cancelTradeReason :
                                    "거래취소사유 없음"
                                  }
                                  
                                </div>
                              )}
                              */}
                            </div>

                          ) : (

  


                            <div className={`
                              ${
                              item.status === 'accepted' ? 'bg-blue-500/10'
                              : item.status === 'paymentRequested' ? 'bg-blue-500/10'
                              : item.status === 'paymentConfirmed' ? 'bg-blue-500/10'
                              : item.status === 'cancelled' ? 'bg-red-500/10'
                              : item.status === 'paymentConfirmed' ? 'bg-green-500/10'
                              : 'bg-gray-500/10'
                              } 

                              rounded-md
                              p-2

                              w-44
                              xl:w-64
                              flex flex-col xl:flex-row gap-2 items-sart justify-start
                              `}>

                              
                              <div className="
                                w-full
                                flex flex-col gap-2 items-start justify-start">


                                {
                                (item.status === 'accepted' || item.status === 'paymentRequested')
                                && item.seller && item.seller.walletAddress === address && (
                                  
                                  <div className="flex flex-col items-center gap-2">
                                  
                                    <div className="flex flex-row items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={agreementForCancelTrade[index]}
                                        onChange={(e) => {
                                          setAgreementForCancelTrade(
                                            agreementForCancelTrade.map((item, idx) => idx === index ? e.target.checked : item)
                                          );
                                        }}
                                      />
                                      <button
                                        disabled={cancellings[index] || !agreementForCancelTrade[index]}
                    
                                        className="text-sm text-red-600 font-semibold
                                          border border-red-600 rounded-lg p-2
                                          bg-red-100
                                          w-full text-center
                                          hover:bg-red-200
                                          cursor-pointer
                                          transition-all duration-200 ease-in-out
                                          hover:scale-105
                                          hover:shadow-lg
                                          hover:shadow-red-500/50
                                        "  
                                        onClick={() => {
                                          cancelTrade(item._id, index);
                                        }}
                                      >
                                        <div className="flex flex-row gap-2 items-center justify-center">
                                          {cancellings[index] && (
                                            <Image
                                              src="/loading.png"
                                              alt="Loading"
                                              width={20}
                                              height={20}
                                              className="w-5 h-5
                                              animate-spin"
                                            />
                                          )}
                                          <span className="text-sm">{Cancel_My_Trade}</span>
                                        </div>
                                      
                                      </button>
                                    </div>

                                    <input 
                                      type="text"
                                      value={cancelTradeReason[index]}
                                      onChange={(e) => {
                                        setCancelTradeReason(
                                          cancelTradeReason.map((item, idx) => idx === index ? e.target.value : item)
                                        );
                                      }}
                                      placeholder="거래취소사유"
                                      className="w-full h-8
                                      text-center rounded-md text-sm text-zinc-500 font-semibold bg-zinc-100 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />



                                  </div>

                                )}

                                {item.status === 'cancelled' && (
                                  <div className="text-sm text-red-600">
                                    {item.cancelTradeReason ? item.cancelTradeReason :
                                      "거래취소사유 없음"
                                    }
                                    
                                  </div>
                                )}
                              </div>
                              



                              <div className="w-full flex flex-col gap-2 items-start justify-start">

                                {/*
                                {item.status === 'accepted' && item.seller && item.seller.walletAddress === address && (
                                  
                                  <div className="flex flex-row items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={agreementForCancelTrade[index]}
                                      onChange={(e) => {
                                        setAgreementForCancelTrade(
                                          agreementForCancelTrade.map((item, idx) => idx === index ? e.target.checked : item)
                                        );
                                      }}
                                    />
                                    <button
                                      disabled={cancellings[index] || !agreementForCancelTrade[index]}

                                      className={`flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md ${cancellings[index] || !agreementForCancelTrade[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                        
                                      onClick={() => {
                                        cancelTrade(item._id, index);
                                      }}
                                    >
                                      {cancellings[index] && (
                                        <Image
                                          src="/loading.png"
                                          alt="Loading"
                                          width={20}
                                          height={20}
                                          className="animate-spin"
                                        />
                                      )}
                                      
                                      <span className="text-sm">{Cancel_My_Trade}</span>
                                    
                                    </button>
                                  </div>

                                )}
                                */}



                                







                                {
                                  item.seller && item.seller.walletAddress === address &&
                                  item.status === 'accepted' && (


                                  <div className="
                                    w-full
                                    flex flex-col gap-2 items-center justify-center">

                                    {item.store?.bankInfo ? (
                                      <div className="flex flex-row gap-2">

                                        <input
                                          disabled={escrowing[index] || requestingPayment[index]}
                                          type="checkbox"
                                          checked={requestPaymentCheck[index]}
                                          onChange={(e) => {
                                            setRequestPaymentCheck(
                                              requestPaymentCheck.map((item, idx) => {
                                                if (idx === index) {
                                                  return e.target.checked;
                                                }
                                                return item;
                                              })
                                            );
                                          }}
                                        />

                                        <button
                                          disabled={escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index]}
                                          
                                          className="text-sm text-yellow-600 font-semibold
                                            border border-yellow-600 rounded-lg p-2
                                            bg-yellow-100
                                            w-full text-center
                                            hover:bg-yellow-200
                                            cursor-pointer
                                            transition-all duration-200 ease-in-out
                                            hover:scale-105
                                            hover:shadow-lg
                                            hover:shadow-yellow-500/50
                                          "
                                          onClick={() => {

                                            requestPayment(
                                              index,
                                              item._id,
                                              item.tradeId,
                                              item.usdtAmount,
                                              item.storecode,

                                              item.store?.bankInfo,
                                            );
                                          }}
                                        >

                                          <div className="flex flex-row gap-2 items-center justify-center">
                                            { (escrowing[index] || requestingPayment[index]) && (
                                                <Image
                                                  src="/loading.png"
                                                  alt="Loading"
                                                  width={20}
                                                  height={20}
                                                  className="w-5 h-5
                                                  animate-spin"
                                                />
                                            )}
                                            <span className="text-sm">
                                              {Request_Payment}
                                            </span>
                                          </div>
                                        
                                        </button>

                                      </div>
                                    ) : (
                                      <div className="flex flex-row gap-2 items-center justify-center">
                                        <Image
                                          src="/icon-bank.png"
                                          alt="Bank"
                                          width={20}
                                          height={20}
                                          className="w-5 h-5"
                                        />
                                        <span className="text-sm text-red-600 font-semibold">
                                          결제은행정보 없음
                                        </span>
                                      </div>
                                    )}
                                    

                                    {/* seller bank info */}
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                      <div className="flex flex-row gap-2 items-center justify-center">
                                        <span className="text-sm text-zinc-500">
                                          
                                          {/*item.seller?.bankInfo?.bankName*/}
                                          {item.store?.bankInfo?.bankName}


                                        </span>
                                        <span className="text-sm text-zinc-500">
                                          {/*item.seller?.bankInfo?.accountHolder*/}
                                          {item.store?.bankInfo?.accountHolder}
                                        </span>

                                      </div>

                                      <span className="text-sm text-zinc-500">
                                        {/*
                                          item.seller?.bankInfo?.accountNumber
                                        */}
                                        {item.store?.bankInfo?.accountNumber}
                                      </span>

                                    </div>

                                    


                                  </div>
                                )}



                                {item.seller
                                && item.seller.walletAddress === address
                                && item.status === 'paymentRequested'
                                && item?.autoConfirmPayment
                                && (

                                  <div className="
                                    w-full
                                    flex flex-col gap-2 items-end justify-center">
                                    
                                    <div className="flex flex-row gap-2">

                                      <input
                                        disabled={confirmingPayment[index]}
                                        type="checkbox"
                                        checked={confirmPaymentCheck[index]}
                                        onChange={(e) => {
                                          setConfirmPaymentCheck(
                                            confirmPaymentCheck.map((item, idx) => {
                                              if (idx === index) {
                                                return e.target.checked;
                                              }
                                              return item;
                                            })
                                          );
                                        }}
                                      />

                                      <button
                                        disabled={confirmingPayment[index] || !confirmPaymentCheck[index]}
                                        
                                        className="text-sm text-green-600 font-semibold
                                          border border-green-600 rounded-lg p-2
                                          bg-green-100
                                          w-full text-center
                                          hover:bg-green-200
                                          cursor-pointer
                                          transition-all duration-200 ease-in-out
                                          hover:scale-105
                                          hover:shadow-lg
                                          hover:shadow-green-500/50
                                        "
                                        
                                        onClick={() => {
                                          confirmPayment(
                                            index,
                                            item._id,
                                            paymentAmounts[index],
                                            paymentAmountsUsdt[index],
                                            //item.storecode,
                                          );
                                        }}

                                      >
                                        <div className="flex flex-row gap-2 items-center justify-center">
                                          { confirmingPayment[index] && (
                                              <Image
                                                src="/loading.png"
                                                alt="Loading"
                                                width={20}
                                                height={20}
                                                className="w-5 h-5
                                                animate-spin"
                                              />
                                          )}
                                          <span className="text-sm">
                                            거래완료
                                          </span>
                                        </div>

                                      </button>

                                    </div>


                                    {!isWithoutEscrow && (
                                      <div className="flex flex-row gap-2">

                                        <input
                                          disabled={rollbackingPayment[index]}
                                          type="checkbox"
                                          checked={rollbackPaymentCheck[index]}
                                          onChange={(e) => {
                                            setRollbackPaymentCheck(
                                              rollbackPaymentCheck.map((item, idx) => {
                                                if (idx === index) {
                                                  return e.target.checked;
                                                }
                                                return item;
                                              })
                                            );
                                          }}
                                        />

                                        <button
                                          disabled={rollbackingPayment[index] || !rollbackPaymentCheck[index]}
                                          className={`flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md ${rollbackingPayment[index] || !rollbackPaymentCheck[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                          onClick={() => {
                                            rollbackPayment(
                                              index,
                                              item._id,
                                              paymentAmounts[index],
                                              paymentAmountsUsdt[index]
                                            );
                                          }}

                                        >
                                          <div className="flex flex-row gap-2 items-center justify-center">
                                            <Image
                                              src="/loading.png"
                                              alt="loading"
                                              width={16}
                                              height={16}
                                              className={rollbackingPayment[index] ? 'animate-spin' : 'hidden'}
                                            />
                                            <span className="text-sm">
                                              에스크로 취소
                                            </span>
                                          </div>

                                        </button>

                                      </div>
                                    )}




                                    {/* 결제은행정보 */}
                                    {/*
                                    <div className="flex flex-row gap-2 items-center justify-center">
                                      <div className="flex flex-row items-center gap-2">
                                        <div className="text-sm text-zinc-500">
                                          {item.seller?.bankInfo?.bankName}
                                        </div>
                                        <div className="text-sm text-zinc-500">
                                          {
                                            item.seller?.bankInfo &&
                                            item.seller?.bankInfo?.accountNumber.substring(0,3) + '...'
                                          }
                                        </div>
                                      </div>
                                      <div className="text-sm text-zinc-500">
                                        {item.seller?.bankInfo?.accountHolder}
                                      </div>
                                    </div>
                                    */}

                                    {/* 결제금액 */}

                                    <div className="w-full flex flex-row gap-2 items-center justify-center">
                                      <input
                                        disabled={true}
                                        type="number"
                                        value={paymentAmounts[index]}
                                        onChange={(e) => {
                                          setPaymentAmounts(
                                            paymentAmounts.map((item, idx) => idx === index ? Number(e.target.value) : item)
                                          );
                                        }}
                                        className="w-20 h-8 rounded-md text-right text-lg text-zinc-500 font-semibold bg-zinc-100 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />{' '}원
                                    </div>






                                  </div>





                                )}

                                {/* paymentConfirmed */}
                                {/* paymentAmount */}
                                {item.status === 'paymentConfirmed' && (
                                  <div className="flex flex-col gap-2 items-center justify-center">





                                    {/* 자동입금처리일경우 */}
                                    {/* 수동으로 결제완료처리 버튼 */}
                                  
                                    {
                                    item.seller.walletAddress === address &&

                                    item?.autoConfirmPayment
                                    && (item?.transactionHash === '0x' || item?.transactionHash === undefined)
                                    && (


                                      <div className="flex flex-row gap-2">

                                        <input
                                          disabled={confirmingPayment[index]}
                                          type="checkbox"
                                          checked={confirmPaymentCheck[index]}
                                          onChange={(e) => {
                                            setConfirmPaymentCheck(
                                              confirmPaymentCheck.map((item, idx) => {
                                                if (idx === index) {
                                                  return e.target.checked;
                                                }
                                                return item;
                                              })
                                            );
                                          }}
                                        />

                                        <button
                                          disabled={confirmingPayment[index] || !confirmPaymentCheck[index]}
                                          
                                          className="text-sm text-green-600 font-semibold
                                            border border-green-600 rounded-lg p-2
                                            bg-green-100
                                            w-full text-center
                                            hover:bg-green-200
                                            cursor-pointer
                                            transition-all duration-200 ease-in-out
                                            hover:scale-105
                                            hover:shadow-lg
                                            hover:shadow-green-500/50
                                          "
                                          
                                          onClick={() => {
                                            confirmPayment(
                                              index,
                                              item._id,
                                              paymentAmounts[index],
                                              paymentAmountsUsdt[index],
                                              //item.storecode,
                                            );
                                          }}

                                        >

                                          <div className="flex flex-row gap-2 items-center justify-center">
                                            { confirmingPayment[index] && (
                                                <Image
                                                  src="/loading.png"
                                                  alt="Loading"
                                                  width={20}
                                                  height={20}
                                                  className="w-5 h-5
                                                  animate-spin"
                                                />
                                            )}    
                                            <span className="text-sm">
                                              USDT 전송
                                            </span>
                                          </div>

                                        </button>

                                      </div>




                                    )}

                                  </div>
                                )}








                              </div>



                            </div>

                          )}




                          {/* polygonscan */}
                          {item?.transactionHash
                          && item?.transactionHash !== '0x'
                          && (
                            <button
                              className="text-sm text-blue-600 font-semibold
                                border border-blue-600 rounded-lg p-2
                                bg-blue-100
                                w-full text-center
                                hover:bg-blue-200
                                cursor-pointer
                                transition-all duration-200 ease-in-out
                                hover:scale-105
                                hover:shadow-lg
                                hover:shadow-blue-500/50
                              "
                              onClick={() => {
                                window.open(
                                  `https://arbiscan.io/tx/${item.transactionHash}`,
                                  '_blank'
                                );
                              }}
                            >
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <Image
                                  src="/logo-arbitrum.png"
                                  alt="Polygon"
                                  width={20}
                                  height={20}
                                  className="w-5 h-5"
                                />
                                <span className="text-sm">
                                  USDT 전송내역
                                </span>
                              </div>
                            </button>
                          )}





                          </div>

                        </td>


                        {/* `https://arbiscan.io/tx/${item.settlement.txid}` */}

                        <td className="p-2">
                          <div className="w-full flex flex-col gap-2 items-center justify-center">

                            {item?.settlement && (

                              <div className="w-full flex flex-row gap-2 items-center justify-start">

                                <Image
                                  src="/icon-settlement-completed.png"
                                  alt="Settlement Completed"
                                  width={30}
                                  height={30}
                                  className="w-6 h-6 rounded-lg"
                                />
                                <span className="text-sm font-semibold text-zinc-500">
                                  정산완료
                                </span>

                              </div>

                            )}



                            <div className="flex flex-row gap-2 items-between justify-center">

                              {item?.settlement && (
                                <div className="flex flex-col gap-2 items-end justify-center">

                                  <div className="w-full flex flex-row gap-2 items-center justify-center">
                                    <span className="
                                    w-16
                                    text-sm text-zinc-500">
                                      가맹점
                                    </span>
                                    <span className="
                                    w-14 text-end
                                    text-sm text-zinc-500"
                                      style={{
                                        fontFamily: 'monospace',
                                      }}>
                                      {Number(
                                        100 - (item.store?.agentFeePercent ? item.store?.agentFeePercent : 0.0) - (item.store.settlementFeePercent ? item.store.settlementFeePercent : 0.3)
                                      ).toFixed(2)
                                      }%
                                    </span>
                                  </div>

                                  {/*
                                  <div className="w-full flex flex-row gap-2 items-center justify-center">
                                    <span className="
                                    w-16
                                    text-sm text-zinc-500">
                                      AG 수수료
                                    </span>
                                    <span className="
                                    w-14 text-end
                                    text-sm text-zinc-500"
                                      style={{
                                        fontFamily: 'monospace',
                                      }}>
                                      {Number(item.store?.agentFeePercent ? item.store?.agentFeePercent : 0.0).toFixed(2)}%
                                    </span>
                                  </div>

                                  <div className="w-full flex flex-row gap-2 items-center justify-center">
                                    <span className="
                                    w-16
                                    text-sm text-zinc-500">
                                      PG 수수료
                                    </span>
                                    <span className="
                                    w-14  text-end
                                    text-sm text-zinc-500"
                                      style={{
                                        fontFamily: 'monospace',
                                      }}>
                                      {Number(item.store.settlementFeePercent ? item.store.settlementFeePercent : 0.3).toFixed(2)}%
                                    </span>
                                  </div>
                                  */}

                                </div>
                              )}



                              {item?.settlement ? (


                                <button
                                  className="
                                  w-48
                                  flex flex-col gap-2 items-center justify-center
                                  bg-purple-500 text-white px-2 py-1 rounded-md hover:bg-purple-600
                                  text-sm
                                  transition duration-300 ease-in-out
                                  transform hover:scale-105
                                  hover:shadow-lg
                                  hover:shadow-purple-500/50
                                  hover:cursor-pointer
                                  hover:transition-transform
                                  hover:duration-300
                                  hover:ease-in-out

                                  "

                                  onClick={() => {
                                    window.open(
                                      `https://arbiscan.io/tx/${item.settlement.txid}`,
                                      '_blank'
                                    );
                                  }}
                                >


                                  <div className="flex flex-col gap-2 items-end justify-center"
                                    style={{
                                      fontFamily: 'monospace',
                                    }}
                                  >

                                    <span>
                                      {item?.settlement?.settlementAmount?.toLocaleString()}
                                      {' '}
                                      {
                                        item?.settlement?.settlementWalletAddress &&
                                      item?.settlement?.settlementWalletAddress?.slice(0, 5) + '...'}
                                    </span>
                                    {/*
                                    <span>
                                      {
                                        item?.settlement?.agentFeeAmount ?
                                        item?.settlement?.agentFeeAmount?.toLocaleString() + ' USDT'
                                        : '0 USDT'
                                      }
                                      {' '}
                                      {
                                        item?.settlement?.agentFeeWalletAddress &&
                                      item?.settlement?.agentFeeWalletAddress?.slice(0, 5) + '...'}
                                    </span>
                                    <span>
                                      {item?.settlement?.feeAmount?.toLocaleString() + ' USDT'}
                                      {' '}
                                      {
                                        item?.settlement?.feeWalletAddress &&
                                      item?.settlement?.feeWalletAddress?.slice(0, 5) + '...'}
                                    </span>
                                    */}

                                  </div>

                                </button>

                              ) : (
                                <>
                                  {item.status === 'paymentConfirmed'
                                  && item?.transactionHash !== '0x'
                                  && (
                                    <div className="flex flex-row gap-2 items-center justify-center">

                                      {item.storecode === 'admin' ? (

                                        <div className="flex flex-row gap-2 items-center justify-center">
                                          일반 회원 구매
                                        </div>

                                      ) : (
                                      
                                        <div className="flex flex-col gap-2 items-center justify-center">

                                          <div className="flex flex-row gap-2 items-center justify-center">
                                            <Image
                                              src="/icon-settlement.png"
                                              alt="Settlement"
                                              width={20}
                                              height={20}
                                              className="animate-spin"
                                            />
                                            <span className="text-sm font-semibold text-zinc-500">
                                              가맹점 결제 및 정산중...
                                            </span>
                                          </div>

                                          <div className="flex flex-row gap-2 items-center justify-center">
                                            <Image
                                              src={item.store?.storeLogo || '/icon-store.png'}
                                              alt="Store Logo"
                                              width={20}
                                              height={20}
                                              className="rounded-lg w-6 h-6"
                                            />
                                            <span className="text-sm font-semibold text-zinc-500">
                                              {item.store?.storeName}
                                            </span>
                                          </div>

                                          <span className="text-lg font-semibold text-green-600"
                                            style={{
                                              fontFamily: 'monospace',
                                            }}
                                          >
                                            {item.usdtAmount}{' '}USDT
                                          </span>



                                        </div>

                                      )}


                                    </div>
                                  )}
                                </>
                              )}


                            </div>

                          </div>

                        </td>




                        {/* 상세보기 */}
                        {/*
                        <td className="p-2">
                          <div className="
                            w-20
                          flex flex-col gap-2 items-center justify-center">
                            <button
                              className="text-sm bg-zinc-500 text-white px-2 py-1 rounded-md hover:bg-zinc-600"

                              onClick={() => {
                                setSelectedItem(item);
                                openModal();
                                
                              }}

                            >
                              거래보기
                            </button>
        

                            {item?.settlement && item?.settlement?.txid && (
                            <button
                              className="text-sm bg-zinc-500 text-white px-2 py-1 rounded-md hover:bg-zinc-600"
                              onClick={() => {
                                window.open(
                                  `https://arbiscan.io/tx/${item.settlement.txid}`,
                                  '_blank'
                                );
                              }}
                            >
                              정산보기
                            </button>
                            )}
                          </div>
                        </td>
                        */}


                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>


            ) : (

              <div className="w-full grid gap-4 lg:grid-cols-2 xl:grid-cols-3 justify-center ">

                  {buyOrders.map((item, index) => (
      
                    <div
                      key={index}
                      className="relative flex flex-col items-center justify-center"
                    >


                      {item.status === 'ordered' && (new Date().getTime() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24) && (
                        <div className="absolute inset-0 flex justify-center items-center z-10
                          bg-black bg-opacity-50
                        ">
                          <Image
                            src="/icon-expired.png"
                            alt="Expired"
                            width={100}
                            height={100}
                            className="opacity-20"
                          />
                        </div>
                      )}

                      {item.status === 'cancelled' && (
                        <div className="absolute inset-0 flex justify-center items-center z-10
                          bg-black bg-opacity-50
                        ">
                          <Image
                            src="/icon-cancelled.png"
                            alt="Cancelled"
                            width={100}
                            height={100}
                            className="opacity-20"
                          />
                        </div>
                      )}


                      <article
                          //key={index}
                          className={` w-96 xl:w-full h-full relative
                            ${item.walletAddress === address ? 'border-green-500' : 'border-gray-200'}

                            ${item.status === 'accepted' || item.status === 'paymentRequested' ? 'border-red-600' : 'border-gray-200'}

                            p-4 rounded-md border bg-black bg-opacity-50
                        `}
                      >

                        {item.status === 'ordered' && (


                          <div className="w-full flex flex-col gpa-2 items-start justify-start">


                              <div className="w-full flex flex-row items-center justify-between gap-2">

                                <div className="flex flex-row items-center gap-2">

                                  {/* if createdAt is recent 1 hours, show new badge */}
                                  {new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 && (
                                    <Image
                                      src="/icon-new.png"
                                      alt="New"
                                      width={28}
                                      height={28}
                                    />
                                  )}

                                  <Image
                                    src="/icon-public-sale.png"
                                    alt="Public Sale"
                                    width={28}
                                    height={28}
                                  />

                                

                                  {params.lang === 'ko' ? (

                                    <p className="text-sm text-zinc-500">

                                    
                                      {

                                        new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) :
                                        new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                      }{' '}{Buy_Order_Opened} 

                                    </p>
                                    
                                    ) : (

                                      <p className="text-sm text-zinc-500">


                                    
                                      {Buy_Order_Opened}{' '}{

                                        new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) :
                                        new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                      }



                                    </p>


                                  )}

                                </div>



                                {/* share button */}
                                {/*
                                <button
                                  className="text-sm bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                                  onClick={() => {

                                    window.open(`https://gold.goodtether.com/${params.lang}/sell-usdt/${item._id}`, '_blank');

                                  }}
                                >
                                  <Image
                                    src="/icon-share.png"
                                    alt="Share"
                                    width={20}
                                    height={20}
                                  />
                                </button>
                                */}


                              </div>


                              {24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) > 0 ? (

                                <div className="mt-2 flex flex-row items-center space-x-2">
                                  <Image
                                    src="/icon-timer.webp"
                                    alt="Timer"
                                    width={28}
                                    height={28}
                                  />
                                  <p className="text-sm text-zinc-500">{Expires_in} {
  
                                    24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) - 1

                                    } {hours} {
                                      60 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) % 60
                                    } {minutes}

                                  </p>
                                </div>

                              ) : (
                                <div className="mt-2 flex flex-row items-center space-x-2">
                                  {/*
                                  <Image
                                    src="/icon-timer.webp"
                                    alt="Expired"
                                    width={28}
                                    height={28}
                                  />
                                  <p className="text-sm text-zinc-500">Expired</p>
                                  */}
                                </div>
                              )}
  
                          </div>

                        )}





                        { (item.status === 'accepted' || item.status === 'paymentRequested' || item.status === 'cancelled') && (
                            
                          <div className={`
                            ${item.status !== 'cancelled' && 'h-16'}

                            mb-4 flex flex-row items-center bg-zinc-800 px-2 py-1 rounded-md`}>
                              <Image
                                src="/icon-trade.png"
                                alt="Trade"
                                width={32}
                                height={32}
                              />


                              <p className="text-sm font-semibold text-green-600 ">
                                {item.tradeId}
                              </p>

                              {item.status === 'cancelled' ? (
                                <p className="ml-2 text-sm text-zinc-500">
                                  {new Date(item.acceptedAt)?.toLocaleString()}
                                </p>
                              ) : (
                                
                                <>
                                  {params.lang === 'ko' ? (

                                    <p className="ml-2 text-sm text-zinc-500">

                                    
                                      {new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                      ) :
                                      new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                      ) : (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                      )
                                      }{' '}{Trade_Started}

                                    </p>



                                  ) : (

                                    <p className="ml-2 text-sm text-zinc-500">

                                      {Trade_Started} {
                                        new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) :
                                        new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                      }

                                    </p>

                                  )}




                                </>
                              
                              )}



                                {/* share button */}
                                <button
                                  className="ml-5 text-sm bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                                  onClick={() => {

                                    //window.open(`https://gold.goodtether.com/${params.lang}/${"admin"}/sell-usdt/${item._id}`, '_blank');

                                    // copy to clipboard

                                    navigator.clipboard.writeText(`https://gold.goodtether.com/${params.lang}/${"admin"}/sell-usdt/${item._id}`);

                                    toast.success('Link copied to clipboard');

                                  }}
                                >
                                  <Image
                                    src="/icon-share.png"
                                    alt="Share"
                                    width={20}
                                    height={20}
                                  />
                                </button>



                            </div>
                        )}


                          {/*
                          
                          {item.acceptedAt && (
                            <p className="mb-2 text-sm text-zinc-500">
                              Trade started at {new Date(item.acceptedAt).toLocaleDateString() + ' ' + new Date(item.acceptedAt).toLocaleTimeString()}
                            </p>
                          )}
                          */}




                        {item.status === 'cancelled' && (
                            <div className="mt-4 flex flex-row items-center gap-2">
                              <Image
                                src='/icon-cancelled.webp'
                                alt='cancel'
                                width={20}
                                height={20}
                              />
                              <p className="text-sm text-red-500">
                                {Cancelled_at} {
                                  new Date(item.cancelledAt).toLocaleDateString() + ' ' + new Date(item.cancelledAt).toLocaleTimeString()
                                }
                              </p>
                            </div>
                          )}




                

                          <div className="mt-4 flex flex-col items-start">



                            <p className="text-xl text-zinc-500"
                              style={{ fontFamily: 'monospace' }}>
                              {Price}: {
                                // currency
                              
                                Number(item.krwAmount)?.toLocaleString() + ' 원'

                              }
                            </p>

                            <div className="mt-2 flex flex-row items-start gap-2">

                              <p className="text-xl font-semibold text-zinc-500">
                                {item.usdtAmount}{' '}USDT
                              </p>
                              <p className="text-lg font-semibold text-zinc-500">{Rate}: {

                                Number(item.krwAmount / item.usdtAmount).toFixed(2)

                                }</p>
                            </div>


                          </div>

                  

                          <div className="mb-4 flex flex-col items-start text-sm ">
                            {Payment}: {Bank_Transfer} ({item.seller?.bankInfo?.bankName})
                          </div>



                          <div className="flex flex-col items-start justify-start gap-2">
                            <p className="mt-2 mb-2 flex items-center gap-2">

                              <Image
                                  src={item.avatar || '/profile-default.png'}
                                  alt="Avatar"
                                  width={32}
                                  height={32}
                                  priority={true} // Added priority property
                                  className="rounded-full"
                                  style={{
                                      objectFit: 'cover',
                                      width: '32px',
                                      height: '32px',
                                  }}
                              />

                              <div className="flex flex-col gap-2 items-start">
                                <div className="flex items-center space-x-2">{Buyer}:</div>

                                <div className="text-sm font-semibold">
                                  {item.nickname}
                                </div>
                                <div className="text-lg text-green-600">
                                  {item.buyer?.depositName}
                                </div>
                              </div>

                              <Image
                                src="/verified.png"
                                alt="Verified"
                                width={20}
                                height={20}
                                className="rounded-lg"
                              />

                              <Image
                                src="/best-buyer.png"
                                alt="Best Buyer"
                                width={20}
                                height={20}
                                className="rounded-lg"
                              />

                            </p>


                            {address && item.walletAddress !== address && item?.buyer && item?.buyer?.walletAddress === address && (
                              <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => {
                                    //console.log('Buy USDT');
                                    // go to chat
                                    // close modal
                                    //closeModal();
                                    ///goChat(item._id, item.tradeId);

                                    router.push(`/${params.lang}/${"admin"}/sell-usdt/${item._id}`);

                                }}
                              >
                                {Chat_with_Buyer + ' ' + item.nickname}
                              </button>
                            )}


                          </div>




                          {/* buyer cancelled the trade */}
                          {item.status === 'cancelled' && (
                            <div className="mt-4 flex flex-col gap-2 items-start justify-center">
                              <div className="flex flex-row items-center gap-2">
                                <Image
                                  src={item?.buyer?.avatar || "/profile-default.png"}
                                  alt="Profile Image"
                                  width={32}
                                  height={32}
                                  priority={true} // Added priority property
                                  className="rounded-full"
                                  style={{
                                      objectFit: 'cover',
                                      width: '32px',
                                      height: '32px',
                                  }}
                                />
                                <p className="text-sm text-red-500 font-semibold">
                                  {Buyer}: {
                                    address && item?.buyer?.nickname ? item?.buyer?.nickname : Anonymous
                                  }
                                </p>

                              </div>


                            </div>
                          )}



                          {(item.status === 'accepted' || item.status === 'paymentRequested') && (
                      
                            <div className="mt-4 flex flex-row items-center gap-2">
                              <Image
                                src={item.seller?.avatar || "/profile-default.png"}
                                alt="Profile Image"
                                width={32}
                                height={32}
                                priority={true} // Added priority property
                                className="rounded-full"
                                style={{
                                    objectFit: 'cover',
                                    width: '32px',
                                    height: '32px',
                                }}
                              />
                              <p className="text-xl text-green-600 font-semibold">
                                {Seller}: {
                                  item.seller?.nickname
                                }
                              </p>
                              <Image
                                src="/verified.png"
                                alt="Verified"
                                width={20}
                                height={20}
                                className="rounded-lg"
                              />
                            </div>
                          
                          )}
                        

                          {/* waiting for escrow */}
                          {item.status === 'accepted' && (



                            <div className="mt-4 flex flex-col gap-2 items-center justify-start">


                                
                                
                              <div className="mt-4 flex flex-row gap-2 items-center justify-start">
                                <Image
                                  src="/loading.png"
                                  alt="Escrow"
                                  width={32}
                                  height={32}
                                  className="animate-spin"
                                />

                                <div className="flex flex-col gap-2 items-start">
                                  <span>
                                    {Waiting_for_seller_to_deposit} {item.usdtAmount} USDT {to_escrow}...
                                  </span>

                                  <span className="text-sm text-zinc-500">

                                    {If_the_seller_does_not_deposit_the_USDT_to_escrow},

                                    {this_trade_will_be_cancelled_in} {

                                      (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) > 0
                                      ? (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) + ' ' + hours
                                      : (60 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) % 60) + ' ' + minutes

                                    } 

                                  </span>
                                </div>
                              </div>





                              {item.buyer?.walletAddress === address && (

                                <div className="mt-4 flex flex-col items-center justify-center gap-2">



                                  <div className="flex flex-row items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={agreementForCancelTrade[index]}
                                      onChange={(e) => {
                                        setAgreementForCancelTrade(
                                          buyOrders.map((item, idx) => {
                                            if (idx === index) {
                                              return e.target.checked;
                                            } else {
                                              return false;
                                            }
                                          })
                                        );
                                      }}
                                    />
                                    <label className="text-sm text-zinc-500">
                                      {I_agree_to_cancel_the_trade}
                                    </label>
                                  </div>


                                  <div className="mt-5 flex flex-row items-center gap-2">

                                    <button
                                      disabled={cancellings[index] || !agreementForCancelTrade[index]}
                                      className={`text-sm bg-red-500 text-white px-2 py-1 rounded-md ${cancellings[index] || !agreementForCancelTrade[index] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                                      onClick={() => {

                                        cancelTrade(item._id, index);

                                      }}
                                    >

                                      <div className="flex flex-row items-center gap-2 px-2 py-1">
                                        {cancellings[index] ? (
                                          <div className="
                                            w-4 h-4
                                            border-2 border-zinc-800
                                            rounded-full
                                            animate-spin
                                          ">
                                            <Image
                                              src="/loading.png"
                                              alt="loading"
                                              width={16}
                                              height={16}
                                            />
                                          </div>
                                        ) : (
                                          <Image
                                            src="/icon-cancelled.png"
                                            alt="Cancel"
                                            width={16}
                                            height={16}
                                          />
                                        )}
                                        {Cancel_My_Trade}
                                      </div>
                                        
                                    
                                    </button>
                                  </div>

                                </div>

                              )}


                            </div>
                          )}



                          {/* if status is accepted, show payment request button */}
                          {item.status === 'paymentConfirmed' && (
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-semibold text-green-600">
                                {Completed}
                              </span>
                              <span>{
                                item.paymentConfirmedAt && new Date(item.paymentConfirmedAt)?.toLocaleString()
                              }</span>
                            </div>
                          )}

                          {
                          item.seller && item.seller.walletAddress === address &&
                          item.status === 'accepted' && (
                            <div className="flex flex-row gap-1">

                              {/* check box for agreement */}
                              <input
                                disabled={escrowing[index] || requestingPayment[index]}
                                type="checkbox"
                                checked={requestPaymentCheck[index]}
                                onChange={(e) => {
                                  setRequestPaymentCheck(
                                    requestPaymentCheck.map((item, idx) => {
                                      if (idx === index) {
                                        return e.target.checked;
                                      }
                                      return item;
                                    })
                                  );
                                }}
                              />

                              <button
                                disabled={escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index]}
                                
                                className={`flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md ${escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index] ? 'bg-gray-500' : 'bg-green-500'}`}
                                onClick={() => {

                                  requestPayment(
                                    index,
                                    item._id,
                                    item.tradeId,
                                    item.usdtAmount,
                                    item.storecode,

                                    item.seller?.bankInfo,
                                  );
                                }}
                              >
                                <Image
                                  src="/loading.png"
                                  alt="loading"
                                  width={16}
                                  height={16}
                                  className={escrowing[index] || requestingPayment[index] ? 'animate-spin' : 'hidden'}
                                />
                                <span>{Request_Payment}</span>
                              
                              </button>

                            </div>
                          )}


                          {/* waiting for payment */}
                          {item.status === 'paymentRequested' && (

                              <div className="mt-4 flex flex-col gap-2 items-start justify-start">

                                <div className="flex flex-row items-center gap-2">

                                  <Image
                                    src="/smart-contract.png"
                                    alt="Smart Contract"
                                    width={32}
                                    height={32}
                                  />
                                  <div>{Escrow}: {item.usdtAmount} USDT</div>
                                  <button
                                    className="bg-white text-black px-2 py-2 rounded-md"
                                    onClick={() => {
                          
                                        window.open(`https://arbiscan.io/tx/${item.escrowTransactionHash}`);
                                        


                                    }}
                                  >
                                    <Image
                                      src='/logo-arbitrum.png'
                                      alt="Chain"
                                      width={20}
                                      height={20}
                                    />
                                  </button>
                                </div>

                                <div className="flex flex-row gap-2 items-center justify-start">

                                  {/* rotate loading icon */}
                                
                                  <Image
                                    src="/loading.png"
                                    alt="Escrow"
                                    width={32}
                                    height={32}
                                    className="animate-spin"
                                  />

                                  <div>Waiting for buyer to send {
                                  item.krwAmount?.toLocaleString('ko-KR', {
                                    style: 'currency',
                                    currency: 'KRW',
                                  })} to seller...</div>
                                

                                </div>


                              </div>
                          )}



                        





                          {item.status === 'ordered' && (
                            <>

                            {acceptingBuyOrder[index] ? (

                              <div className="flex flex-row items-center gap-2">
                                <Image
                                  src='/loading.png'
                                  alt='loading'
                                  width={35}
                                  height={35}
                                  className="animate-spin"
                                />
                                <div>{Accepting_Order}...</div>
                              </div>


                            ) : (
                              <>
                                
                                {item.walletAddress === address ? (
                                  <div className="flex flex-col space-y-4">
                                    {My_Order}
                                  </div>
                                ) : (
                                  <div className="w-full flex items-center justify-center">

                                    {item.status === 'ordered' && (
                                      
                                      // check if the order is expired
                                      new Date().getTime() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24

                                    ) ? (

                                      <>
                                        {/*
                                        <Image
                                          src="/icon-expired.png"
                                          alt="Expired"
                                          width={80}
                                          height={80}
                                        />
                                        */}
                                    
                                    </>
                                    ) : (
                                      <>

                                        {user?.seller && user?.seller?.bankInfo && (

            

                                          <div className="mt-4 flex flex-col items-center justify-center">

                                            {/* agreement for trade */}
                                            <div className="flex flex-row items-center space-x-2">
                                              <input
                                                disabled={!address}
                                                type="checkbox"
                                                checked={agreementForTrade[index]}
                                                onChange={(e) => {
                                                    setAgreementForTrade(
                                                        buyOrders.map((item, idx) => {
                                                            if (idx === index) {
                                                                return e.target.checked;
                                                            } else {
                                                                return false;
                                                            }
                                                        })
                                                    );
                                                }}
                                              />
                                              <label className="text-sm text-zinc-500">
                                                {I_agree_to_the_terms_of_trade}
                                              </label>
                                            </div>



                                            {/* input sms receiver mobile number */}

                                            {address && agreementForTrade[index] && (
                                              <div className="mt-8 flex flex-row items-center justify-start gap-2">

                                                <span className="text-sm text-zinc-500">SMS</span>

                                                <div className="flex flex-col items-start justify-start">
                                                  <input
                                                    disabled={!address || !agreementForTrade[index]}
                                                    type="text"
                                                    placeholder="SMS Receiver Mobile Number"
                                                    className={`w-full px-4 py-2 rounded-md text-black`}
                                                    value={smsReceiverMobileNumber}
                                                    onChange={(e) => {
                                                        setSmsReceiverMobileNumber(e.target.value);
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            )}

                                            <button
                                              disabled={!address || !agreementForTrade[index]}
                                              className={`m-10 text-lg text-white px-4 py-2 rounded-md
                                                ${!address || !agreementForTrade[index] ? 'bg-zinc-800' : 'bg-green-500 hover:bg-green-600'}
                                                `}
                                              onClick={() => {
    
                                                  acceptBuyOrder(index, item._id, smsReceiverMobileNumber);
                                            

                                              }}
                                            >
                                              {Buy_Order_Accept} {item.usdtAmount} USDT
                                            </button>


                                          </div>

                                        )}

                                      </>

                                    )}

                                  </div>



                                  )}

                                </>

                              )}

                            </>

                          )}



                      </article>




                      {/* status */}
                      {/*
                      <div className="absolute bottom-4 right-4 flex flex-row items-start justify-start">
                        <div className="text-sm text-zinc-500">
                          {item.status === 'ordered' ? 'Order opened at ' + new Date(item.createdAt)?.toLocaleString()
                          : item.status === 'accepted' ? 'Trade started at ' + new Date(item.acceptedAt)?.toLocaleString()
                          : item.status === 'paymentRequested' ? 'Payment requested at ' + new Date(item.paymentRequestedAt)?.toLocaleString()
                          : item.status === 'cancelled' ? 'Trade cancelled at ' + new Date(item.cancelledAt)?.toLocaleString()
                          : item.status === 'paymentConfirmed' ? 'Trade completed at ' + new Date(item.paymentConfirmedAt)?.toLocaleString()
                          : 'Unknown'}
                        </div>
                      </div>
                      */}






                    </div>
              
                  ))}

              </div>

            )}

            


          </div>

        

          {/* pagination */}
          {/* url query string */}
          {/* 1 2 3 4 5 6 7 8 9 10 */}
          {/* ?limit=10&page=1 */}
          {/* submit button */}
          {/* totalPage = Math.ceil(totalCount / limit) */}
          <div className="mt-4 flex flex-row items-center justify-center gap-4">


            <div className="flex flex-row items-center gap-2">
              <select
                value={limit}
                onChange={(e) =>
                  
                  router.push(`/${params.lang}/${params.center}/buyorder?limit=${Number(e.target.value)}&page=${page}&wallet=${wallet}&searchMyOrders=${searchMyOrders}`)

                }

                className="text-sm bg-zinc-800 text-zinc-200 px-2 py-1 rounded-md"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            {/* 처음 페이지로 이동 */}
            <button
              disabled={Number(page) <= 1}
              className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) <= 1 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
              onClick={() => {
                
                router.push(`/${params.lang}/${params.center}/buyorder?limit=${Number(limit)}&page=1`);

              }
            }
            >
              처음
            </button>


            <button
              disabled={Number(page) <= 1}
              className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) <= 1 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
              onClick={() => {
                
                router.push(`/${params.lang}/${params.center}/buyorder?limit=${Number(limit)}&page=${Number(page) - 1}`);

              }}
            >
              이전
            </button>


            <span className="text-sm text-zinc-500">
              {page} / {Math.ceil(Number(totalCount) / Number(limit))}
            </span>


            <button
              disabled={Number(page) >= Math.ceil(Number(totalCount) / Number(limit))}
              className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) >= Math.ceil(Number(totalCount) / Number(limit)) ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
              onClick={() => {
                
                router.push(`/${params.lang}/${params.center}/buyorder?limit=${Number(limit)}&page=${Number(page) + 1}`);

              }}
            >
              다음
            </button>

            {/* 마지막 페이지로 이동 */}
            <button
              disabled={Number(page) >= Math.ceil(Number(totalCount) / Number(limit))}
              className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) >= Math.ceil(Number(totalCount) / Number(limit)) ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
              onClick={() => {
                
                router.push(`/${params.lang}/${params.center}/buyorder?limit=${Number(limit)}&page=${Math.ceil(Number(totalCount) / Number(limit))}`);

              }}
            >
              마지막
            </button>

          </div>



          <div className="w-full flex flex-col items-center justify-center gap-4 p-4 bg-white shadow-md rounded-lg mt-5">
            <div className="text-sm text-zinc-600">
              © 2024 Stable Makeup. All rights reserved.
            </div>
            <div className="text-sm text-zinc-600">
              <a href={`/${params.lang}/terms-of-service`} className="text-blue-500 hover:underline">
                이용약관
              </a>
              {' | '}
              <a href={`/${params.lang}/privacy-policy`} className="text-blue-500 hover:underline">
                개인정보처리방침
              </a>
              {' | '}
              <a href={`/${params.lang}/contact`} className="text-blue-500 hover:underline">
                고객센터
              </a>
            </div>
          </div> 


        </div>



                {/*
          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <TradeDetail
                  closeModal={closeModal}
                  //goChat={goChat}
              />
          </Modal>
          */}


          <ModalUser isOpen={isModalOpen} onClose={closeModal}>
              <UserPaymentPage
                  closeModal={closeModal}
                  selectedItem={selectedItem}
              />
          </ModalUser>



      </main>

    );


};




const UserPaymentPage = (
  {
      closeModal = () => {},
      selectedItem = null as {
        _id: string;
        nickname: string;
        storecode: string;
        buyer?: {
          depositBankName?: string;
          depositBankAccountNumber?: string;
          depositName?: string
        }
      } | null,
  }
) => {

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">상세정보</h1>
      
      {/* iframe */}
      <iframe
        src={`https://cryptoss.beauty/kr/${selectedItem?.storecode}/pay-usdt-reverse/${selectedItem?._id}`}

        
          
        width="400px"
        height="500px"
        className="border border-zinc-300 rounded-lg"
        title="Page"
      ></iframe>


      <button
        onClick={closeModal}
        className="bg-[#3167b4] text-white px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
      >
        닫기
      </button>
    </div>
  );

};








// close modal

const TradeDetail = (
    {
        closeModal = () => {},
        goChat = () => {},
        
    }
) => {


    const [amount, setAmount] = useState(1000);
    const price = 91.17; // example price
    const receiveAmount = (amount / price).toFixed(2);
    const commission = 0.01; // example commission
  
    return (

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
          <h2 className="text-lg font-semibold text-black ">Iskan9</h2>
          <span className="ml-2 text-blue-500 text-sm">318 trades</span>
        </div>
        <p className="text-gray-600 mt-2">The offer is taken from another source. You can only use chat if the trade is open.</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-gray-700">
            <span>Price</span>
            <span>{price} KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Limit</span>
            <span>40680.00 KRW - 99002.9 KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Available</span>
            <span>1085.91 USDT</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Seller&apos;s payment method</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 rounded-full">Tinkoff</span>
          </div>
          <div className="mt-4 text-gray-700">
            <p>24/7</p>
          </div>
        </div>
  
        <div className="mt-6 border-t pt-4 text-gray-700">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700">I want to pay</label>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(
                    e.target.value === '' ? 0 : parseInt(e.target.value)
                ) }

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">I will receive</label>
              <input 
                type="text"
                value={`${receiveAmount} USDT`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Commission</label>
              <input 
                type="text"
                value={`${commission} USDT`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Buy USDT');
                    // go to chat
                    // close modal
                    closeModal();
                    goChat();

                }}
            >
                Buy USDT
            </button>
            <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Cancel');
                    // close modal
                    closeModal();
                }}
            >
                Cancel
            </button>
          </div>

        </div>


      </div>
    );
  };



