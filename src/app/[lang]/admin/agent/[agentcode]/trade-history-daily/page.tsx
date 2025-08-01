'use client';

import { useState, useEffect, use, act } from "react";

import Image from "next/image";



// open modal

import Modal from '@/components/modal';

import { useRouter }from "next//navigation";


import { toast } from 'react-hot-toast';

import { client } from "../../../../../client";



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
import { getDictionary } from "../../../../../dictionaries";
//import Chat from "@/components/Chat";
import { ClassNames } from "@emotion/react";


import useSound from 'use-sound';
import { it } from "node:test";
import { get } from "http";


import { useSearchParams } from 'next/navigation';



/*
    {
      date: '2025-07-25',
      storecode: 'repruuqp',
      totalUsdtAmount: 19339.14,
      totalKrwAmount: 26688000
    },
    */

interface BuyOrder {

  date: string,

  totalCount: number, // Count the number of orders
  totalUsdtAmount: number,
  totalKrwAmount: number,

  totalSettlementCount: number, // Count the number of settlements
  totalSettlementAmount: number,
  totalSettlementAmountKRW: number,

  totalAgentFeeAmount: number,
  totalAgentFeeAmountKRW: number,
  totalFeeAmount: number,
  totalFeeAmountKRW: number,
}



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



    };


    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 5000);

    return () => clearInterval(interval);

  } , [address, contract]);






  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);


  
  // get User by wallet address


  
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
            storecode: "admin",
            walletAddress: address,
        }),
    })
    .then(response => response.json())
    .then(data => {
        
        ///console.log('getUser data.result', data.result);


        setUser(data.result);

        setIsAdmin(data.result?.role === "admin");


    })
    .catch((error) => {
        console.error('Error:', error);
        setUser(null);
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

    //const today = new Date();
    //first day of the year
    const today = new Date( new Date().getFullYear(), 0, 1);

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

  





  // limit number
  //const [limit, setLimit] = useState(20);

  // page number
  //const [page, setPage] = useState(1);


  const [totalCount, setTotalCount] = useState(0);

  const [loadingBuyOrders, setLoadingBuyOrders] = useState(false);
    
  const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([]);



   

  useEffect(() => {


    const fetchBuyOrders = async () => {


      if (!params.agentcode || params.agentcode === "") {
        setBuyOrders([]);
        setTotalCount(0);
        return;
      }


      setLoadingBuyOrders(true);

      const response = await fetch('/api/order/getAllBuyOrdersByAgentcodeDaily', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(

            {
              agentcode: params.agentcode,
              limit: Number(limit),
              page: Number(page),
              walletAddress: address,
              searchMyOrders: searchMyOrders,

              fromDate: searchFromDate,
              toDate: searchToDate,

              searchBuyer: searchBuyer,
              searchDepositName: searchDepositName,
              searchStoreBankAccountNumber: searchStoreBankAccountNumber,
            }

        ),
      });

      setLoadingBuyOrders(false);

      if (!response.ok) {
        return;
      }



      const data = await response.json();


      setBuyOrders(data.result.orders);

      setTotalCount(data.result.totalCount);
      


    }


    fetchBuyOrders();

    
    
    const interval = setInterval(() => {

      fetchBuyOrders();


    }, 5000);
  

    return () => clearInterval(interval);
    
    
    
    


  } , [
    limit,
    page,
    address,
    searchMyOrders,

    params.agentcode,
    searchFromDate,
    searchToDate,
    searchBuyer,
    searchDepositName,
    searchStoreBankAccountNumber
]);




  // array of agents
  const [agentList, setAgentList] = useState([] as any[]);


  const [agentAdminWalletAddress, setAgentAdminWalletAddress] = useState("");

  const [fetchingAgent, setFetchingAgent] = useState(false);
  const [agent, setAgent] = useState(null) as any;

  useEffect(() => {


    setFetchingAgent(true);

    const fetchData = async () => {
        const response = await fetch("/api/agent/getOneAgent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                agentcode: params.agentcode,
            }),
        });

        const data = await response.json();

        //console.log("data", data);

        if (data.result) {

          setAgent(data.result);

          setAgentAdminWalletAddress(data.result?.adminWalletAddress);

          if (data.result?.adminWalletAddress === address) {
            setIsAdmin(true);
          }

      } else {
        // get agent list
        const response = await fetch("/api/agent/getAllAgents", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
          }),
        });
        const data = await response.json();
        //console.log("getAgentList data", data);
        setAgentList(data.result.agents);
        setAgent(null);
        setAgentAdminWalletAddress("");
      }

        setFetchingAgent(false);
    };

    if (!params.agentcode || params.agentcode === "") {
      return;
    }

    fetchData();

    // interval to fetch store data every 10 seconds
    const interval = setInterval(() => {
      fetchData();
    }
    , 5000);
    return () => clearInterval(interval);

  } , [params.agentcode, address]);




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
    if (!address || !params.agentcode) {
      return;
    }

    setLoadingTradeSummary(true);
    const response = await fetch('/api/summary/getTradeSummary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        /*
        storecode: params.storecode,
        walletAddress: address,
        searchMyOrders: searchMyOrders,
        searchOrderStatusCompleted: true,
        //searchBuyer: searchBuyer,
        //searchDepositName: searchDepositName,

        //searchStoreBankAccountNumber: searchStoreBankAccountNumber,

        */

        agentcode: params.agentcode,

        walletAddress: address,
        searchMyOrders: searchMyOrders,
        searchOrderStatusCompleted: true,
        
        //searchBuyer: searchBuyer,
        searchBuyer: '',
        //searchDepositName: searchDepositName,
        searchDepositName: '',
        //searchStoreBankAccountNumber: searchStoreBankAccountNumber,
        searchStoreBankAccountNumber: '',



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

    //console.log('getTradeSummary data', data);


    setTradeSummary(data.result);
    setLoadingTradeSummary(false);
    return data.result;
  }




  useEffect(() => {

    if (!address || !searchFromDate || !searchToDate) {
      return;
    }

    getTradeSummary();

    // fetch trade summary every 10 seconds
    const interval = setInterval(() => {
      getTradeSummary();
    }, 10000);
    return () => clearInterval(interval);


  } , [address, searchMyOrders, params.agentcode,
    searchFromDate, searchToDate,
  ]);



  

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
  }, [address]);




  // get all Agents
  const [fetchingAllAgents, setFetchingAllAgents] = useState(false);
  const [allAgents, setAllAgents] = useState([] as any[]);
  const [agentTotalCount, setAgentTotalCount] = useState(0);
  const fetchAllAgents = async () => {
    if (fetchingAllAgents) {
      return;
    }
    setFetchingAllAgents(true);
    const response = await fetch('/api/agent/getAllAgents', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          limit: 100,
          page: 1,
        }
      ),
    });

    if (!response.ok) {
      setFetchingAllAgents(false);
      toast.error('에이전트 검색에 실패했습니다.');
      return;
    }

    const data = await response.json();

    ///console.log('getAllStores data', data);

    setAllAgents(data.result.agents);
    setAgentTotalCount(data.result.totalCount);
    setFetchingAllAgents(false);
    return data.result.agents;
  }
  useEffect(() => {
    fetchAllAgents();
  }, []);






  return (

    <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">


      <div className="py-0 w-full">

          <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-2 bg-black/10 p-2 rounded-lg mb-4">
              
            <div className="w-full flex flex-row items-center justify-start gap-2">

              <button
                onClick={() => router.push('/' + params.lang + '/admin/agent/' + params.agentcode + '/')}
                className="flex items-center justify-center gap-2
                  rounded-lg p-2
                  hover:bg-black/20
                  hover:cursor-pointer
                  hover:scale-105
                  transition-transform duration-200 ease-in-out"

              >
                  <Image
                    src={agent?.agentLogo || "/logo.png"}
                    alt="logo"
                    width={35}
                    height={35}
                    className="rounded-lg w-6 h-6"
                  />
              </button>

                {address && address === agentAdminWalletAddress && (
                  <div className="text-sm text-[#3167b4] font-bold">
                    {agent && agent?.agentName + " (" + agent?.agentcode + ") 에이전트"}
                  </div>
                )}
                {address && address !== agentAdminWalletAddress && (
                  <div className="text-sm text-[#3167b4] font-bold">
                    {agent && agent?.agentName + " (" + agent?.agentcode + ")"}
                  </div>
                )}

            </div>


            {address && !loadingUser && (


              <div className="w-full flex flex-row items-center justify-end gap-2">
                
                <button
                  onClick={() => {
                    router.push('/' + params.lang + '/admin/agent/' + params.agentcode + '/profile-settings');
                  }}
                  className="flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                >
                  <div className="flex flex-row items-center justify-center gap-2">

                      <div className="flex flex-row items-center justify-center gap-2">
                        <Image
                          src="/icon-agent.png"
                          alt="Agent"
                          width={20}
                          height={20}
                          className="rounded-lg w-5 h-5"
                        />
                        <span className="text-sm text-yellow-500">
                          에이전트 관리자
                        </span>
                      </div>

                    <span className="text-sm text-[#f3f4f6]">
                      {user?.nickname || "프로필"}
                    </span>

                  </div>
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
                    padding: "2px 2px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    //width: "40px",
                    height: "38px",
                  },
                  label: "원클릭 로그인",
                }}

                connectModal={{
                  size: "wide", 
                  //size: "compact",
                  titleIcon: "https://www.stable.makeup/logo.png",                           
                  showThirdwebBranding: false,
                }}

                locale={"ko_KR"}
                //locale={"en_US"}
              />

            )}

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




            {/* 홈 / 가맹점관리 / 회원관리 / 구매주문관리 */}
            {/* memnu buttons same width left side */}
            <div className="w-full flex flex-row itmes-start justify-start gap-2 mb-4">
              <div className="grid grid-cols-3 xl:grid-cols-4 gap-2 mb-4">
                <button
                    onClick={() => router.push('/' + params.lang + '/admin/agent/' + params.agentcode + '/store')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    가맹점관리
                </button>



                <button
                    onClick={() => router.push('/' + params.lang + '/admin/agent/' + params.agentcode + '/member')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    회원관리
                </button>

                <button
                    onClick={() => router.push('/' + params.lang + '/admin/agent/' + params.agentcode + '/buyorder')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    구매주문관리
                </button>

                <button
                    onClick={() => router.push('/' + params.lang + '/admin/agent/' + params.agentcode + '/trade-history')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    거래내역
                </button>

                <div className='flex w-32 items-center justify-center gap-2
                bg-yellow-500 text-[#3167b4] text-sm rounded-lg p-2'>
                  <Image
                    src="/icon-statistics.png"
                    alt="Statistics"
                    width={35}
                    height={35}
                    className="w-4 h-4"
                  />
                  <div className="text-sm font-semibold">
                    통계(AG)
                  </div>
                </div>

              </div>
            </div>



              <div className='flex flex-row items-center space-x-4'>
                  <Image
                    src="/icon-statistics.png"
                    alt="Statistics"
                    width={35}
                    height={35}
                    className="w-6 h-6"
                  />

                  <div className="text-xl font-semibold">
                    통계(AG)
                  </div>

                  
                  <Image
                    src="/loading.png"
                    alt="Loading"
                    width={35}
                    height={35}
                    className={`w-6 h-6 ${loadingBuyOrders ? 'animate-spin' : 'hidden'}`}
                  />

              </div>






              <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-3">




                {/* serach fromDate and toDate */}
                {/* DatePicker for fromDate and toDate */}
                {/*
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
                */}


                {/*
                <div className="flex flex-col items-center gap-2">

                  <div className="flex flex-col xl:flex-row items-center justify-center gap-2">

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

                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchStoreBankAccountNumber}
                        onChange={(e) => setSearchStoreBankAccountNumber(e.target.value)}
                        placeholder="입금통장번호"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      /> 
                    </div>

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
                */}




  

              </div>



          {/* trade summary */}

          <div className="flex flex-col xl:flex-row items-center justify-between gap-2
            w-full
            bg-zinc-100/50
            p-4 rounded-lg shadow-md
            ">

            <div className="xl:w-1/2 flex flex-row items-center justify-between gap-2">
              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">총 거래수(건)</div>
                <div className="text-xl font-semibold text-zinc-500">
                  {tradeSummary.totalCount?.toLocaleString()} 건
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">총 거래금액(원)</div>
                <div className="flex flex-row items-center justify-center gap-1">
                  <span className="text-xl font-semibold text-yellow-600">
                    {tradeSummary.totalKrwAmount?.toLocaleString()}
                  </span>
                  <span className="text-sm text-zinc-500">원</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">총 거래량(USDT)</div>
                <div className="flex flex-row items-center justify-center gap-1">
                  <Image
                    src="/icon-tether.png"
                    alt="Tether"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-xl font-semibold text-green-600">
                    {tradeSummary.totalUsdtAmount
                      ? tradeSummary.totalUsdtAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : '0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="hidden xl:block w-0.5 h-10 bg-zinc-300"></div>
            <div className="xl:hidden w-full h-0.5 bg-zinc-300"></div>

            <div className="xl:w-1/2
              flex flex-row items-center justify-between gap-2">
              

              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">총 정산수(건)</div>
                  <span className="text-xl font-semibold text-zinc-500">
                    {tradeSummary.totalSettlementCount?.toLocaleString()} 건
                  </span>
              </div>

              {/*
              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">총 정산금액(원)</div>
                <div className="flex flex-row items-center justify-center gap-1">
                  <span className="text-xl font-semibold text-yellow-600">
                    {tradeSummary.totalSettlementAmountKRW?.toLocaleString()}
                  </span>
                  <span className="text-sm text-zinc-500">원</span>
                </div>
              </div>
              */}

              {/*
              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">총 정산량(USDT)</div>
                <div className="flex flex-row items-center justify-center gap-1">
                  <Image
                    src="/icon-tether.png"
                    alt="Tether"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-xl font-semibold text-green-600">
                    {tradeSummary.totalSettlementAmount
                      ? tradeSummary.totalSettlementAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : '0.00'}
                  </span>
                </div>
              </div>
              */}


              <div className="flex flex-col gap-2 items-center">

                {/*
                <div className="flex flex-row gap-2 items-center">
                  
                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 PG 수수료(원)</div>
                    <div className="w-full flex flex-row items-center justify-end gap-1">
                      <span className="text-xl font-semibold text-yellow-600">
                        {tradeSummary.totalFeeAmountKRW
                          ? tradeSummary.totalFeeAmountKRW.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : '0'}
                      </span>
                      <span className="text-sm text-zinc-500">원</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 PG 수수료(USDT)</div>
                    <div className="w-full flex flex-row items-center justify-end gap-1">
                      <Image
                        src="/icon-tether.png"
                        alt="Tether"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-xl font-semibold text-green-600">
                        {tradeSummary.totalFeeAmount
                          ? tradeSummary.totalFeeAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
                */}

                <div className="flex flex-row gap-2 items-center">
                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 AG 수수료(원)</div>
                    <div className="w-full flex flex-row items-cneter justify-end gap-1">
                      <span className="text-xl font-semibold text-yellow-600">
                        {tradeSummary.totalAgentFeeAmountKRW
                          ? tradeSummary.totalAgentFeeAmountKRW.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : '0'}
                      </span>
                      <span className="text-sm text-zinc-500">원</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 AG 수수료(USDT)</div>
                    <div className="w-full flex flex-row items-center justify-end gap-1">
                      <Image
                        src="/icon-tether.png"
                        alt="Tether"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-xl font-semibold text-green-600">
                        {tradeSummary.totalAgentFeeAmount
                          ? tradeSummary.totalAgentFeeAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            
            {/* divider */}
            {/*}
            <div className="hidden xl:block w-0.5 h-10 bg-zinc-300"></div>
            <div className="xl:hidden w-full h-0.5 bg-zinc-300"></div>

            <div className="xl:w-1/4 flex flex-row items-center justify-center gap-2">
              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">총 청산수(건)</div>
                <div className="text-xl font-semibold text-zinc-500">
                  {tradeSummary.totalClearanceCount?.toLocaleString()} 건
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">총 청산금액(원)</div>
                <div className="text-xl font-semibold text-zinc-500">
                  {tradeSummary.totalClearanceAmount?.toLocaleString()} 원
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">총 청산수량(USDT)</div>
                <div className="text-xl font-semibold text-zinc-500">
                  {tradeSummary.totalClearanceAmountUSDT?.toLocaleString()} USDT
                </div>
              </div>
            </div>
            */}
            
          </div>


              <div className="w-full overflow-x-auto">

                <table className=" w-full table-auto border-collapse border border-zinc-800 rounded-md">

                  <thead className="bg-zinc-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-600">
                        날짜
                      </th>
                      {/* align right */}
                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">거래수(건)</th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">거래량(USDT)</th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">거래금액(원)</th>

                      {/*
                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">정산수(건)/미정산수(건)</th>
                      */}
                      
                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">AG수수료량(USDT)</th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">AG수수료금액(원)</th>

                      {/*
                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">PG수수료량(USDT)</th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">PG수수료금액(원)</th>

                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">정산량(USDT)</th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-zinc-600">정산금액(원)</th>
                      */}


                    </tr>
                  </thead>
                  <tbody>
                    {buyOrders.map((order, index) => (
                      <tr key={index} className="border-b border-zinc-300 hover:bg-zinc-100">
                        <td className="px-4 py-2 text-sm text-zinc-700">
                          {new Date(order.date).toLocaleDateString('ko-KR')}
                        </td>
                        {/* align right */}
                        <td className="px-4 py-2 text-sm text-zinc-700 text-right">
                          {order.totalCount ? order.totalCount.toLocaleString() : 0} 건
                        </td>


                        <td className="px-4 py-2 text-sm text-green-600 font-semibold text-right"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalUsdtAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </td>
                        <td className="px-4 py-2 text-sm text-yellow-600 font-semibold text-right"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalKrwAmount).toLocaleString('ko-KR')}
                        </td>

                        {/*
                        <td className="px-4 py-2 text-sm text-zinc-700 text-right">
                          {order.totalSettlementCount ? order.totalSettlementCount.toLocaleString() : 0} 건
                          {' / '}
                          {(order.totalCount || 0) - (order.totalSettlementCount || 0)} 건
                        </td>
                        */}

                        <td className="px-4 py-2 text-sm text-green-600 font-semibold text-right"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalAgentFeeAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </td>
                        <td className="px-4 py-2 text-sm text-yellow-600 font-semibold text-right"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalAgentFeeAmountKRW).toLocaleString('ko-KR')}
                        </td>



                        {/*
                        <td className="px-4 py-2 text-sm text-green-600 font-semibold text-right"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalFeeAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </td>
                        <td className="px-4 py-2 text-sm text-yellow-600 font-semibold text-right"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalFeeAmountKRW).toLocaleString('ko-KR')}
                        </td>

                        <td className="px-4 py-2 text-sm text-green-600 font-semibold text-right"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalSettlementAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </td>
                        <td className="px-4 py-2 text-sm text-yellow-600 font-semibold text-right"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalSettlementAmountKRW).toLocaleString('ko-KR')}
                        </td>
                        */}


                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-sm text-zinc-500">
                        
                      </td>
                    </tr>
                  </tfoot>
                </table>

              </div>

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


          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <TradeDetail
                  closeModal={closeModal}
                  //goChat={goChat}
              />
          </Modal>


        </main>

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



