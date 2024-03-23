const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  address: String,
  name: String,
  symbol: String,
});

const TransactionSchema = new Schema({
  buys: Number,
  sells: Number,
});

const VolumeSchema = new Schema({
  h24: Number,
  h6: Number,
  h1: Number,
  m5: Number,
});

const PriceChangeSchema = new Schema({
  m5: Number,
  h1: Number,
  h6: Number,
  h24: Number,
});

const LiquiditySchema = new Schema({
  usd: Number,
  base: Number,
  quote: Number,
});

const WebsiteSchema = new Schema({
  label: String,
  url: String,
});

const SocialSchema = new Schema({
  type: String,
  url: String,
});

const PairSchema = new Schema({
  chainId: String,
  dexId: String,
  url: String,
  pairAddress: String,
  baseToken: TokenSchema,
  quoteToken: TokenSchema,
  priceNative: String,
  priceUsd: String,
  txns: {
    m5: TransactionSchema,
    h1: TransactionSchema,
    h6: TransactionSchema,
    h24: TransactionSchema,
  },
  volume: VolumeSchema,
  priceChange: PriceChangeSchema,
  liquidity: LiquiditySchema,
  pairCreatedAt: { type: Date, default: Date.now },
  info: {
    imageUrl: String,
    websites: [WebsiteSchema],
    socials: [SocialSchema],
  },
});

const Pair = mongoose.model("Pair", PairSchema);

module.exports = Pair;
