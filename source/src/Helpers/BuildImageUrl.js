import config from "../config"

export const buildUrl = (productId) =>
{
  return `${config.systemetImageBaseUrl}/${productId}/${productId}_300.png`
}

