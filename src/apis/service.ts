import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import {parse, stringify} from 'qs'


export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt');
  }
  return '';
}

export const popFilterAPI = axios.create({
    baseURL: "https://popfilterbubble.site",
    headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
   
});

export const getVideosAPI = async(channelIdArr: string[]) => {
    const params = {
        customId : channelIdArr,
    };
    const queryString = qs.stringify(params,{arrayFormat : 'repeat'});
    return await popFilterAPI.get(`/api/youtube/politics?${queryString}`);
}
  