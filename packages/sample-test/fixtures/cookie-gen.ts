import { BrowserContext } from "@playwright/test"

export interface PartialCookie {
  name: string,
  value: string,
  path?: string,
  domain?: string,
}

export const convertCookies = ({ baseURL, cookies }: {
  baseURL: string,
  cookies: PartialCookie[]
}) => {
  const domainMatchReg = /^https?:\/\/(?:www\.)?([^^:\/\n?]+)(?:\/?.*)/;
  const match = domainMatchReg.exec(baseURL);
  
  if(!match) {
    throw new Error(`unable to parse domain from baseURL: ${baseURL}`);
  }
  const defaultDomain = match[1];
  const defaultPath = "/";
  return cookies.map(({ name, value, path, domain }) => {
    return {
      name,
      value,
      domain: domain ?? defaultDomain,
      path: path ?? defaultPath,
    };
  });
}
