import toFixed from './customeTofixed';
import { Instrument } from './instrument.model';

const amountSteppers = [
    {
        step: 10,
        min: 0,
        max: 99
    },
    {
        step: 50,
        min: 100,
        max: 249
    },
    {
        step: 100,
        min: 250,
        max: 999
    },
    {
        step: 250,
        min: 1000,
        max: 2499
    },
    {
        step: 500,
        min: 2500,
        max: 9999
    },
    {
        step: 1000,
        min: 10000,
        max: Number.MAX_VALUE
    }
];

 function TradingCalculator() {
    return {    

        getClientViewRateChange (
            isPositionOpen:boolean, 
            isBuyPosition:boolean, 
            instrument:Instrument) {
            if (!instrument || !instrument.BidRounded()) {
                return 0;
            }
            var rate = instrument.rate;

            if (isPositionOpen) {
                return isBuyPosition ? rate.lastBidChange : rate.lastAskChange;
            }

            return parseFloat(isBuyPosition ? (rate.lastBidChange as unknown as string) : (instrument.BidRounded() as unknown as string));
        },
        calculatePips: function(instrument:Instrument, rate1:number, rate2:number) {
                let fChangeRate = 0;
                let nChangePips = 0;
                fChangeRate = rate1 - rate2;
                //if (iobj.TypeID === 5) {
                //    return fChangeRate.toNumberFixed(iobj.Precision);
                //}
                var fNum = fChangeRate * Math.pow(10, Math.abs(instrument.Precision));
                nChangePips = Math.round(fNum);
                return nChangePips;
        
        },
        calculateRate(rate:number, pips:number, precision:number) {

            
            var factor = Math.pow(10, precision);

            return (rate * factor + pips) / factor;
        },
        getPrecisionByRate (instrument:Instrument, rate:number, isDecrease?:boolean) {
            return instrument._Precision;

        },
        getRateRounded(instrument:Instrument, rate:number, roundingCb:(x:number)=>number) {
            var precision = this.getPrecisionByRate(instrument, rate);
            var power = Math.pow(10, precision);
            return roundingCb(rate * power) / power;
        },
        roundNumberByType(number:number, isBuy:boolean, isStopLoss:boolean, precision:number, inBoundaries:boolean) {
           /*
           *
           * AVRI - inBoundaries
           * This boolean data means
           * If true:
           * For BUY MODE + stop loss, the rate value will get rounded to a floored value - this is used for calculating a sp rate whose sp amount is AT LEAST the amount from the (number param)'s amount
           * For BUY MODE + take profit, the rate value will get rounded to a ceiled value - this is used for calculating a tp rate whose tp amount is AT LEAST the amount from the (number param)'s amount
           * For SELL MODE + stop loss, the rate value will get rounded to a ceiled value - this is used for calculating a sp rate whose sp amount is AT LEAST the amount from the (number param)'s amount
           * For SELL MODE + take profit, the rate value will get rounded to a floored value - this is used for calculating a tp rate whose tp amount is AT LEAST the amount from the (number param)'s amount
           *
           * If false:
           * For BUY MODE + stop loss, the rate value will get rounded to a ceiled value - this is used for calculating a sp rate whose sp amount is NO HIGHER FROM the amount from the (number param)'s amount
           * For BUY MODE + take profit, the rate value will get rounded to a floored value - this is used for calculating a tp rate whose tp amount is NO HIGHER FROM amount from the (number param)'s amount
           * For SELL MODE + stop loss, the rate value will get rounded to a floored value - this is used for calculating a sp rate whose sp amount is NO HIGHER FROM the amount from the (number param)'s amount
           * For SELL MODE + take profit, the rate value will get rounded to a ceiled value - this is used for calculating a tp rate whose tp amount is NO HIGHER FROM the amount from the (number param)'s amount
           * */
            var factor = Math.pow(10, precision);
            var roundedNumber = toFixed(number * factor, precision);

            //Math.floor(number * factor) / factor;

            var roundedRate = 0;
            if(inBoundaries){
                if ((isBuy && isStopLoss) || (!isBuy && !isStopLoss)) {
                    roundedRate = Math.floor(roundedNumber) / factor;
                } else {
                    roundedRate = Math.ceil(roundedNumber) / factor;
                }
            }else{
                if ((isBuy && isStopLoss) || (!isBuy && !isStopLoss)) {
                    roundedRate = Math.ceil(roundedNumber) / factor;
                } else {
                    roundedRate = Math.floor(roundedNumber) / factor;
                }
            }
            return roundedRate;
        },
        toPrecision (number:number, precision:number) {
            //keep original numbers after . (do not round the result)

            const factor = Math.pow(10, precision);
            return Math.floor(factor * number) / factor;
        },
        getStepJump: function (amount:number) {
            //make sure it's numeric
            amount = Math.abs(amount);
            // FIX TRADCD-957: when amount is below 10 steps are always of 1
            if (amount >= 10) {
              const step = amountSteppers.find(currStep => 
                currStep.min <= amount && currStep.max >= amount);


              if (step)
                  return step.step;
            }
            //return default if not sound
            return 1;
        },
    };
}

const tradingCalculator = TradingCalculator();
export default tradingCalculator