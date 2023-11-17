import React from 'react'
import { ICard } from '../modals/ICard'
import axios from 'axios';
import { FETCH_URL } from '../constants';
import { GetCryptoFromLocalStorage, SaveCrypto } from '../services/localstorage.service';
import Item from '../components/Item';
import Search from '../components/search/Search';
import { debounce } from "lodash";
import ChatBot from '../components/bot/ChatBot';
import {Button} from "@nextui-org/react";

const Home = () => {
    const [cards, setCards] = React.useState<ICard[]>([]);
    const [dispayCards, setDisplayCards] = React.useState<ICard[]>([]);
    const [query, setQuery] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [itemsToFetch, setItemsToFetch] = React.useState(20);

    async function fetchData() {
        var localData = GetCryptoFromLocalStorage();
        if (new Date().getTime() - localData.date.getTime() < 60 * 10000) {
            setCards(localData.arr);
            return;
        }
        try {
            const response = await axios.get(FETCH_URL);
            const savedData = response.data.cards.slice(0, itemsToFetch);
            const uniqueCards: ICard[] = Array.from(new Set(savedData.map((card: { name: ICard; }) => card.name)))
                .map(name => savedData.find((card: { name: ICard; }) => card.name === name)).filter(card => !!card);
            
            setCards(uniqueCards);
            setDisplayCards(uniqueCards.slice(0, itemsToFetch));
            SaveCrypto(uniqueCards);
            setLoading(false);

        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        fetchData();
    },[dispayCards])

    const handleShowMore = () => {
        const newItemsToFetch = itemsToFetch + 20;
        setItemsToFetch(newItemsToFetch);
        setDisplayCards(cards.slice(0, newItemsToFetch));
        console.log('Click', newItemsToFetch)
    };

    const search = React.useCallback(
        debounce((query) => {
            if (query == "") {
                setDisplayCards(cards);
            } else {
                const filteredCards = cards.filter((card) => {
                    return card.name.toLowerCase().includes(query.toLowerCase());
                });
                setDisplayCards(filteredCards);
            }
        }, 500),
        [cards]
    );
    
    const handleInputSearch = (value: any) => {
        setQuery(value);
        search(value);
    };

    const resetSearch = () => {
        setQuery('');
    }

    return (
        <div className='w-full h-full relative'>
            <ChatBot/>
            <div className='flex flex-col items-center p-5'>
                {!loading ? 
                    <>
                        <div className='grid grid-cols-5 w-[280px] md:w-[572px] lg:w-[864px] gap-x-3 mb-3'>
                            <div className='col-span-3 w-full'>
                            <Search
                                value={query}
                                onChange={handleInputSearch}
                                onReset={resetSearch}
                            />
                            </div>
                            <div className='flex items-center justify-center col-span-2 w-full text-sm md:text-xl bg-[#313131] py-2 px-5 rounded-2xl shadow-lg shadow-[#ccc]'>
                                Cards: {dispayCards.length}
                            </div>
                        </div>
                        <Item cards={dispayCards} />
                        <div>
                            <Button 
                                radius="lg" 
                                className="bg-gradient-to-tr from-[#212121] to-[#414141] text-slate-200 shadow-lg my-5"
                                onClick={handleShowMore}
                            >
                                Show more
                            </Button>
                        </div>
                    </> 
                    : <span className='text-xl bg-[#313131] py-2 px-5 m-2 rounded-2xl shadow-lg shadow-[#ccc]'> Loading...</span>}
            </div>
            
        </div>
    )
}

export default Home