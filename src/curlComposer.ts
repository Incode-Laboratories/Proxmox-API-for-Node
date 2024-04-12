/* Author: MyristicaFragrans (https://github.com/MyristicaFragrans)
 * curlComposer.ts (c) 2023
 * Desc: description
 * Created:  2023-04-03T04:47:48.176Z
 */

import https from "https"
import { Callback, Token } from "./types";
import { OutgoingHttpHeaders } from "http";

export default class curlCom {
  apiURL = "";
  token = "";
  composed = '';

  constructor(apiURL: string, token: string) {
    this.apiURL = apiURL;
    this.token = token;
  }

  get(url: string): Promise<string> {
    return new Promise((res, rej)=>{
      curl(
        'GET', 
        `${this.apiURL}${url}`, 
        {
          "Authorization": `PVEAPIToken=${this.token}`,
          "Accept": "text/json",
        }, 
        "", 
        (err, ok) => {
          if(err) rej(err);
          else res(ok);
        }
      );
    });
  }
  /**
   * **WARNING**: This does not escape double-quotes and may error if not 
   * already escaped
   */
  post(url: string, data: string): Promise<string> {
    return new Promise((res, rej)=>{
      const headers: OutgoingHttpHeaders = {
        "Authorization": `PVEAPIToken=${this.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "text/json",
      };

      curl(
        'POST', 
        `${this.apiURL}${url}`, 
        headers, 
        data, 
        (err, ok) => {
          if(err) rej(err);
          else res(ok);
        }
      );
    });
  }
  /**
   * **WARNING**: This does not escape double-quotes and may error if not 
   * already escaped
   */
  put(url: string, data: string): Promise<string> {
    return new Promise((res, rej)=>{
      curl(
        'PUT', 
        `${this.apiURL}${url}`, 
        {
          "Authorization": `PVEAPIToken=${this.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "text/json",
        }, 
        data, 
        (err, ok) => {
          if(err) rej(err);
          else res(ok);
        }
      );
    });
  }
  del(url: string, data: string): Promise<string> {
    return new Promise((res, rej)=>{
      curl(
        'DEL', 
        `${this.apiURL}${url}`, 
        {
          "Authorization": `PVEAPIToken=${this.token}`,
        }, 
        data, 
        (err, ok) => {
          if(err) rej(err);
          else res(ok);
        }
      );
    });
  }
}

function curl(method: string, endpoint: string, headers: OutgoingHttpHeaders, data: string, callback: Callback): Promise<void> {
  const addr = new URL(endpoint)
  return new Promise((resolve)=>{
    const request = https.request(addr, {
      headers,
      method,
      
    }, (res) => {
      let data = "";
      res.on('data', (chunk) => { data += chunk });
      res.on('end', () => {
        if (res.statusCode != 200) {
          callback(new Error("Status code " + res.statusCode), data);
          resolve()
          return;
        }
        callback(null, data)
        resolve();
      });
      res.on('error', (err) => {
        callback(err, data);
        resolve();
      })
    });
    request.end(data);
  })
}

export { curl }