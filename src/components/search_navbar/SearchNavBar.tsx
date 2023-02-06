import React, { useEffect, useState } from 'react';
import style from "./SearchNavBar.module.css";
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { isOpenSearchNavBar } from '../../store/slices/slice-manage';
import { getProductsOfSearch } from '../../store/slices/slice-manage';
import request from '../../store/request/request';
import { links } from '../../store/request/links';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchNavBar: React.FC = () => {
    const manage = useAppSelector(state => state.manage);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        const handle = setTimeout(async () => {
            getSearchProducts(inputText);
        }, 1000) // пока будет происходить новый запрос с задержкой в секунду, старый удалится

        return () => {
           clearTimeout(handle); // запросы не будет происходить одновременно и не будут накладываться друг на друга
        } 
    }, [inputText])

    async function getSearchProducts(inputText: string) {
        if(inputText) {
            const products = await request("GET", links.searchLink(inputText), inputText, manage.token);
            dispatch(getProductsOfSearch(products.data.data.items));
        }else {
            dispatch(getProductsOfSearch([]));
        }
      }

    return (
        <div className={style.container}>
            <p></p>
            <div className={style.searchContainer}>
                <SearchIcon 
                    sx={{
                        marginRight: "10px",
                        color: "rgb(68, 67, 67)"
                    }}
                />
                <input 
                    type="search" 
                    placeholder='ENTER WHAT YOU ARE SEARCHING FOR'
                    className={style.searchInput}
                    value={inputText}
                    onChange={(evt) => setInputText(evt.target.value)}
                />
            </div>
            <CloseIcon 
                sx={{fontSize: "25px", paddingRight: "20px", color: "rgb(52, 51, 51)", cursor: "pointer"}} 
                onClick={() => {
                    dispatch(isOpenSearchNavBar(false))
                    navigate(-1)
                }}
            />
        </div>
    )
}

export default SearchNavBar;