import { useState, useEffect } from "react";
import axios from "axios";
import { Tokens } from "@/config/tokens";

interface TokenAmounts {
  [key: string]: number;
}

export interface ConversionRates {
  [key: string]: number;
}

const useConverter = () => {
  const [usdRate, setUsdRate] = useState<ConversionRates>({});
  const [bnbRate, setBnbRate] = useState<ConversionRates>({});
  const [totalConverted, setTotalConverted] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      const tokens = Tokens.map((t) => t.id);
      const rates = await getRates(tokens, "usd");
      if (rates) setUsdRate(rates);
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      // .filter((t) => t.id != "binancecoin")
      const tokens = Tokens.map((t) => t.id);
      const rates = await getRates(tokens, "bnb");
      if (rates) setBnbRate(rates);
    };
    init();
  }, []);

  //   useEffect(() => {
  //     const fetchConversionRates = async () => {
  //       try {
  //         const tokenIds = Object.keys(tokens)
  //           .map((token) => token.toLowerCase())
  //           .join(",");
  //         const response = await axios.get(
  //           "https://api.coingecko.com/api/v3/simple/price",
  //           {
  //             params: {
  //               ids: tokenIds,
  //               vs_currencies: targetCurrency,
  //             },
  //           }
  //         );

  //         const rates = response.data;
  //         const formattedRates: ConversionRates = {};

  //         for (const token in tokens) {
  //           formattedRates[token] =
  //             rates[token.toLowerCase()]?.[targetCurrency] || 0;
  //         }

  //         setConversionRates(formattedRates);
  //       } catch (error) {
  //         console.error("Error fetching conversion rates:", error);
  //       }
  //     };

  //     fetchConversionRates();
  //   }, [tokens, targetCurrency]);

  //   useEffect(() => {
  //     if (Object.keys(conversionRates).length > 0) {
  //       const convertedTotal = Object.keys(tokens).reduce((acc, token) => {
  //         return acc + tokens[token] * (conversionRates[token] || 0);
  //       }, 0);
  //       setTotalConverted(convertedTotal);
  //     }
  //   }, [conversionRates, tokens]);

  //   const convert = async (tokens: TokenAmounts) => {
  //     if (Object.keys(conversionRates).length > 0) {
  //       const convertedTotal = Object.keys(tokens).reduce((acc, token) => {
  //         return acc + tokens[token] * (conversionRates[token] || 0);
  //       }, 0);
  //       setTotalConverted(convertedTotal);
  //       return conversionRates;
  //     }
  //   };

  const getRates = async (tokens: string[], targetCurrency: string) => {
    try {
      const tokenIds = tokens.map((token) => token.toLowerCase()).join(",");
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: tokenIds,
            vs_currencies: targetCurrency,
          },
        }
      );

      const rates = response.data;
      let formattedRates: ConversionRates = {};

      for (const index in tokens) {
        const token = tokens[index];
        formattedRates[token] =
          rates[token.toLowerCase()]?.[targetCurrency] || 0;
      }
      return formattedRates;
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
    }
  };

  return { getRates, usdRate, bnbRate };
};

export default useConverter;
