import {PriceResult, Token, TokenPrice, TokenRecord} from "@/app/models/models";

export const combineTokenInformation=(records:TokenRecord[], prices: TokenPrice[]):Token[]=>{
  return records.map(r=>{
    const tokenPrice=getTokenPrice(r.symbol,prices)
    return {
      tokenTicker:r.symbol,
      tokenName:r.name,
      tokenIcon:r.imageUrl,
      tokenAmount:parseFloat(r.amount),
      tokenPrice:tokenPrice?.usd,
      tokenPercentageChange:tokenPrice?.usd_24h_change,
      type:r.type
    }
  })
}


export const getTokenPriceAndPriceChange=(records:TokenRecord[], prices: TokenPrice[]):PriceResult=>{
  let sum=0
  let change=0
  records.forEach(r=>{
    const tokenPrice=getTokenPrice(r.symbol,prices)
    if(tokenPrice){
      sum+=tokenPrice.usd*parseFloat(r.amount)
      if(tokenPrice.usd_24h_change){
        change+=parseFloat(r.amount) *tokenPrice.usd_24h_change/100
      }
    }
  })
  return {sum:sum.toFixed(2),change:change.toFixed(2)}
}

export const getTokenPrice=(ticker:string, prices:TokenPrice[]):TokenPrice|undefined=>{
  const results=prices.filter(p=>p.ticker?.toLowerCase()===ticker?.toLowerCase())
  if(results.length){
    return results[0]
  }
}


export const convertTokenPriceResponse=(response:any):TokenPrice[]=>{
  return Object.keys(response).map(key=>({
    ticker:key,
    usd:response[key].usd as number,
    usd_24h_change:response[key].usd_24h_change as number,
  }))
}