#property strict
int magicNumber = 12345;
double lotSize = 0.1;
int slippage = 3;
int tradeInterval = 15;
datetime lastTradeTime = 0;
int accountNumber;
double accountBalance;
double accountEquity;
bool stats = true;
#include <Zmq/Zmq.mqh>



//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{  
   //sendzmq();
   EventSetMillisecondTimer(60000);
   
   return(INIT_SUCCEEDED);
   
}
void OnTimer()
{
   OnTick(); 
}
//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   if (TimeCurrent() - lastTradeTime >= tradeInterval * 60)
   {
      openOrderAi(lotSize);
      stats = true;
      lastTradeTime = TimeCurrent();
   }
   CloseOrders();
}

//+------------------------------------------------------------------+
//| Open Buy Order function                                         |
//+------------------------------------------------------------------+
void OpenBuyOrder(double loter)
{
   
   int ticket = OrderSend(_Symbol, OP_BUY, loter , Ask, slippage, 0, 0, "Buy Order", magicNumber, 0, Green);
   if (ticket > 0)
   {
      Print("Buy Order opened. Ticket: ", ticket);

   }
   else
   {
      Print("Failed to open Buy Order. Error: ", GetLastError());

   }
}
//+------------------------------------------------------------------+
//| Sell Order function                                             |
//+------------------------------------------------------------------+
void OpenSellOrder(double loter)
{
   
   int ticket = OrderSend(_Symbol, OP_SELL, loter , Bid, slippage, 0, 0, "Sell Order", magicNumber, 0, Red);
   if (ticket > 0)
   {
      Print("Sell Order opened. Ticket: ", ticket);

   }
   else
   {
      Print("Failed to open Sell Order. Error: ", GetLastError());
   }
}
//+------------------------------------------------------------------+
//| Close Orders function                                            |
//+------------------------------------------------------------------+
void CloseOrders()
{
   double sum = 0;
   double sumSell = 0;
   double sumBuy = 0;
   accountEquity = AccountEquity();

   for (int i = OrdersTotal() - 1; i >= 0; i--)
   {
      if (OrderSelect(i, SELECT_BY_POS, MODE_TRADES))
      {
         if (OrderSymbol() == _Symbol && OrderMagicNumber() == magicNumber && OrderCloseTime() == 0)
         {
            double profit = OrderProfit();
            if (accountEquity >= accountEquity + 20)
            {
               bool result = OrderClose(OrderTicket(), OrderLots(), Bid, slippage, Red);
               result = OrderClose(OrderTicket(), OrderLots(), Ask, slippage, Red);
               //SendProfitOrders();
               Print("All Orders closed.");
            }
            
            if (OrderType() == OP_SELL)
            {
               sumSell += profit;
            }
            else if (OrderType() == OP_BUY)
            {
               sumBuy += profit;
            }
            
            if(profit >= 3)
            {
               if (OrderType() == OP_SELL)
               {
                  bool result = OrderClose(OrderTicket(), OrderLots(), Ask, slippage, Red);
                  //SendProfitOrders();
                  if(stats)
                  {  
                     /*for(int i=1;i<=2;i++){
                        OpenSellOrder(lotSize);
                     }*/
                     OpenSellOrder(lotSize*2);
                     stats = false;
                  }
                  
                  if (result)
                  {
                     Print("Order closed with profit. Ticket: ", OrderTicket());
                     sum = sum + profit;
                     Print("SUM Profit: ", sum);
                  }
                  else
                  {
                     Print("Failed to close Order. Error: ", GetLastError());
                  }
               }
               if (OrderType() == OP_BUY)
               {
                  bool result = OrderClose(OrderTicket(), OrderLots(), Bid, slippage, Red);
                  //SendProfitOrders();
                  if(stats)
                  {
                     /*for(int i=1;i<=2;i++){
                        OpenBuyOrder(lotSize);
                     }*/
                     OpenBuyOrder(lotSize*2);
                     stats = false;
                  }
                  if (result)
                  {
                     Print("Order closed with profit. Ticket: ", OrderTicket());
                     sum = sum + profit;
                     Print("SUM Profit: ", sum);
                  }
                  else
                  {
                     Print("Failed to close Order. Error: ", GetLastError());
                  }
               }
            }
            if (profit <= -3)
            {
               if (OrderType() == OP_SELL)
               {
                  bool result = OrderClose(OrderTicket(), OrderLots(), Ask, slippage, Red);
                  //OpenBuyOrder(lotSize*2);
                  if(stats)
                  {
                     OpenBuyOrder(lotSize/2);
                     stats = false;
                  }
               }
               else if (OrderType() == OP_BUY)
               {
                  bool result = OrderClose(OrderTicket(), OrderLots(), Bid, slippage, Red);
                  //openOrderAi(lotSize/2);
                  //OpenSellOrder(lotSize*2);
                  if(stats)
                  {
                     OpenSellOrder(lotSize/2);
                     stats = false;
                  }
               }
            }
         }
      }
   }
   if (sumSell >= 5)
   {
      for (int i = OrdersTotal() - 1; i >= 0; i--)
      {
         if (OrderSelect(i, SELECT_BY_POS, MODE_TRADES))
         {
            if (OrderSymbol() == _Symbol && OrderMagicNumber() == magicNumber && OrderCloseTime() == 0 && OrderType() == OP_SELL)
            {
               bool result = OrderClose(OrderTicket(), OrderLots(), Ask, slippage, Red);
               //SendProfitOrders();
               if (result)
               {
                  Print("Sell Order closed. Ticket: ", OrderTicket());
               }
               else
               {
                  Print("Failed to close Sell Order. Error: ", GetLastError());
               }
            }
         }
      }
   }
   if (sumBuy >= 5)
   {
      for (int i = OrdersTotal() - 1; i >= 0; i--)
      {
         if (OrderSelect(i, SELECT_BY_POS, MODE_TRADES))
         {
            if (OrderSymbol() == _Symbol && OrderMagicNumber() == magicNumber && OrderCloseTime() == 0 && OrderType() == OP_BUY)
            {
               bool result = OrderClose(OrderTicket(), OrderLots(), Bid, slippage, Red);
               //SendProfitOrders();
               if (result)
               {
                  Print("Buy Order closed. Ticket: ", OrderTicket());
               }
               else
               {
                  Print("Failed to close Buy Order. Error: ", GetLastError());
               }
            }
         }
      }
   }
}
//+------------------------------------------------------------------+
//| ZeroMq send account                                              |
//+------------------------------------------------------------------+
void sendzmq()
{
   Context context("profit");
   Socket socket(context, ZMQ_REQ);
   Print("Connecting to hello world server…");
   socket.connect("tcp://localhost:4444");
   
   accountNumber = AccountNumber();
   accountBalance = AccountBalance();
   accountEquity = AccountEquity();
   string message = "profit | AccountNumber: " + accountNumber + " | AccountBalance: " + DoubleToString(accountBalance) + " | AccountEquity: " + DoubleToString(accountEquity);
   ZmqMsg request(message);
   Print("Sending request...");
   socket.send(request);

    //Get the reply
    ZmqMsg reply;
    socket.recv(reply);
    string receivedMessage = reply.getData();
    Print("Received reply from ZeroMQ Server: ", receivedMessage);
}
//+------------------------------------------------------------------+
//| CheckProfitOrders function                                       |
//+------------------------------------------------------------------+
void SendProfitOrders()
{  
   string g_reply = "";
   Context context("history");
   Socket socket(context, ZMQ_REQ);
   Print("Connecting to hello world server…");
   socket.connect("tcp://localhost:5555");
   
   accountNumber = AccountNumber();
   double profit = OrderProfit();
   int ticket = OrderTicket();
   string message = "history | Price: " + DoubleToString(profit) + " | AccountNumber: " + accountNumber + " | Orderid: " + ticket;
   ZmqMsg request(message);
   Print("Sending request...");
   socket.send(request);
}

//+------------------------------------------------------------------+
//| OpenOrder                                                        |
//+------------------------------------------------------------------+
void openOrderAi(double loter)
{
    Context context("price_volume_time_publisher");
    double predictedPrice;
    Socket socket(context, ZMQ_REQ);

    if (!socket.connect("tcp://localhost:5555")) {
        Print("Failed to connect to Python server. Error code: ", zmq_errno());
        return;
    }
    string priceVolumeTimeData;
    for (int i = 0; i < 5; i++) {
        double close = iClose("EURUSDz", PERIOD_M15, i);
        string barData = StringFormat("data|%.5f\n", close);
        priceVolumeTimeData += barData;
    }
    string priceVolumeTimeData1 = priceVolumeTimeData;

    ZmqMsg message(priceVolumeTimeData1);
    if (!socket.send(message)) {
        Print("Failed to send price, volume, and time data to Python. Error code: ", zmq_errno());
        return;
    }

    Print("Price, volume, and time data sent to Python successfully.");
    ZmqMsg reply;
    if (!socket.recv(reply)) {
        Print("Failed to receive reply from ZeroMQ Server. Error code: ", zmq_errno());
        return;
    }

    string receivedMessage = reply.getData();
    Print("Received reply from ZeroMQ Server: ", receivedMessage);
    predictedPrice = StringToDouble(receivedMessage);
    
    //--------------------------------------------------------------------------------
    //Moving Averrate 3
    int highPeriod = 200;
    int midPeriod = 100;
    int lowPeriod = 50;
    double highMA, lowMA, midMA;
    highMA = iMA(NULL, 0, highPeriod, 0, MODE_EMA, PRICE_CLOSE, 0);
    midMA = iMA(NULL, 0, midPeriod, 0, MODE_EMA, PRICE_CLOSE, 0);
    lowMA = iMA(NULL, 0, lowPeriod, 0, MODE_EMA, PRICE_CLOSE, 0);
    bool signalsell = false;
    bool signalbuy = false;
    if(lowMA < midMA && lowMA < highMA && midMA < highMA)
    {
      signalbuy = true;
    }
    if(lowMA > midMA && lowMA > highMA && midMA > highMA)
    {
      signalsell = true;
    }
    //--------------------------------------------------------------------------------
    /*//Moving Averrate 2
    int highPeriod = 20;
    int lowPeriod = 10;
    double highMA, lowMA;
    highMA = iMA(NULL, 0, highPeriod, 0, MODE_SMA, PRICE_CLOSE, 0);
    lowMA = iMA(NULL, 0, lowPeriod, 0, MODE_SMA, PRICE_CLOSE, 0);*/
    //---------------------------------------------------------------------------------
    //Ichimoku Kinko Hyo
    int SenkouSpanB = 52;
    int tenkensen = 9;
    int kijunsen = 26;
    double ichimo = iIchimoku(_Symbol,PERIOD_M30,tenkensen,kijunsen,SenkouSpanB,MODE_TENKANSEN,1);
    //---------------------------------------------------------------------------------
    //Bollinger Bands
    double upperBand = iBands(_Symbol, PERIOD_M30, 20, 2, 2, PRICE_CLOSE, MODE_UPPER, 0);
    double lowerBand = iBands(_Symbol, PERIOD_M30, 20, 2, 2, PRICE_CLOSE, MODE_LOWER, 0);
    //---------------------------------------------------------------------------------
    double currentPrice = MarketInfo(_Symbol, MODE_BID);
    if (signalbuy && currentPrice > highMA && currentPrice > midMA && currentPrice > lowMA){

         if(predictedPrice > currentPrice){
            loter*=2;
            //if(ichimo > currentPrice){
               //loter*=2;
               //if(currentPrice > lowerBand){

                  OpenBuyOrder(loter);
               //}
            //}
         }else OpenBuyOrder(loter);
      }
    if (signalsell && currentPrice < highMA && currentPrice < midMA && currentPrice < lowMA){

         if(predictedPrice < currentPrice){
            loter*=2;
            //if(ichimo < currentPrice){
               //loter*=2;
               //if(currentPrice < lowerBand){

                  OpenSellOrder(loter);
               //}
            //}
         }else OpenSellOrder(loter);
      }
      
}