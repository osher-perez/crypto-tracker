'use client'

import {useState} from "react";

const [amount , setAmount ] = useState(1);
const totalPrice = amount * price ;
export default function Converter({price , symbole}:{price : string , symbole : string}){
    return <div> מחשבון שלי </div>
}