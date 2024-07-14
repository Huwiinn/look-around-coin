type GlobalCoinsInfoDataItem = {
  key: string;
  label: string;
  unit: string;
};

export const globalCoinsInfoData: GlobalCoinsInfoDataItem[] = [
  { key: "coins_count", label: "현재 암호화폐 코인 발행 개수", unit: "개" },
  { key: "active_markets", label: "활성 시장 수", unit: "시장" },
  { key: "total_mcap", label: "총 시가총액", unit: "원" },
  { key: "total_volume", label: "총 거래량", unit: "원" },
  { key: "btc_d", label: "코인 시장 비트코인 점유율", unit: "%" },
  { key: "eth_d", label: "코인 시장 이더리움 점유율", unit: "%" },
  { key: "mcap_change", label: "시가총액 변화율", unit: "%" },
  { key: "volume_change", label: "시장 거래량 변화율", unit: "%" },
  { key: "avg_change_percent", label: "평균 변화율", unit: "%" },
  { key: "volume_ath", label: "최고 거래량", unit: "원" },
  { key: "mcap_ath", label: "최고 시가총액", unit: "원" },
];
