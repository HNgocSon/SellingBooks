
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HotSellingBook from "./book/hot-selling-book";
import SalesBook from "./book/sales-book";
import ListCombo from "./combo/list-combos";
import FeaturedBook from "./book/featured-book";
import ListEbook from "./book/list-ebook";

export default function Home() {
    return (<>
        <HotSellingBook />

        <FeaturedBook />

        <SalesBook />

        <ListEbook/>

        <ListCombo />

      
    </>)
}