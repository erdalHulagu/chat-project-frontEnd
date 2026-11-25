
import axios from "axios";
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";

// Community oluştur
export const createCommunity = (community) => {
    return axios.post(
        `${BASE_API_URL}/communities`,
        community,
        { headers: authHeader() }
    );
};

// Tüm Community kayıtlarını getir
export const getAllCommunities = () => {
    return axios.get(
        `${BASE_API_URL}/communities`,
        { headers: authHeader() }
    );
};

// ID ile Community getir
export const getCommunityById = (communityId) => {
    return axios.get(
        `${BASE_API_URL}/communities/${communityId}`,
        { headers: authHeader() }
    );
};

// Community güncelle
export const updateCommunity = (communityId, community) => {
    return axios.put(
        `${BASE_API_URL}/communities/${communityId}`,
        community,
        { headers: authHeader() }
    );
};

// Community sil
export const deleteCommunity = (communityId) => {
    return axios.delete(
        `${BASE_API_URL}/communities/${communityId}`,
        { headers: authHeader() }
    );
};

// Mevcut grubu Community'ye ekle
export const addGroupToCommunity = (chatId, communityId) => {
    return axios.post(
        `${BASE_API_URL}/chats/${chatId}/community/${communityId}`,
        {},
        { headers: authHeader() }
    );
};

// Grubu Community'den çıkar
export const removeGroupFromCommunity = (chatId) => {
    return axios.delete(
        `${BASE_API_URL}/chats/${chatId}/community`,
        { headers: authHeader() }
    );
};

// Community içerisindeki grupları getir
export const getCommunityGroups = (communityId) => {
    return axios.get(
        `${BASE_API_URL}/chats/community/${communityId}/groups`,
        { headers: authHeader() }
    );
};
