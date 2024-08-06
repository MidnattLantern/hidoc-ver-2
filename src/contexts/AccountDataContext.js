import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./currentUserContext";

export const AccountDataContext = createContext();
export const setAccountDataContext = createContext();

export const useAccountData = () => useContext(AccountDataContext);
export const useSetAccountData = () => useContext(setAccountDataContext);

export const AccountDataProvider = ({ children }) => {
    const [artistData, setArtistData] = useState({
        // pageArtist is used for artist page
        pageArtist: { results: [] },
        popularArtists: { results: [] },
    });

    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(
                    // future feature: sort by artist who recently made an update goes here
                    '/art-accounts/?ordering=-watchers_art_count'
                );
                setArtistData(prevState => ({
                    ...prevState,
                    popularArtists: data,
                }));
            } catch(err){

            } 
        };

        handleMount();
    }, [currentUser]);

    return (
        <AccountDataContext.Provider value={artistData}>
            <setAccountDataContext.Provider value={setArtistData}>
                {children}
            </setAccountDataContext.Provider>
        </AccountDataContext.Provider>
    )
}