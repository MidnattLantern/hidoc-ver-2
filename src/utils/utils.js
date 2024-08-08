//import { jwtDecode } from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
    try{
        const {data} = await axiosReq.get(resource.next);
        setResource((prevResource) => ({
            ...prevResource,
            nenxt:data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some(accResult => accResult.id === cur.id )
                ? acc
                : [...acc, cur];
            }, prevResource.results),
        }));
    } catch(err){

    }
};

/*
export const setTokenTimeStamp = (data) => {
    const refreshTokenTimeStamp = jwtDecode(data?.refresh_token).exp
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimeStamp)
};
*/

export const shouldRefreshToken = () => {
    return !!localStorage.getItem('refreshTokenTimestamp')
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp')
};