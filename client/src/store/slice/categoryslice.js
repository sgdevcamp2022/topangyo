import { createSlice } from '@reduxjs/toolkit'


const initialState = [
    {
      category : 'hobby',
      text : 'π³ μ·¨λ―Έ'
    },
    {
      category : 'restaurant',
      text : 'π΄ λ§μ§'
    },
    {
      category : 'cafe',
      text : 'β μΉ΄ν'
    },
    {
      category : 'sports',
      text : 'πΉ μ€ν¬μΈ /λ μ '
    },
    {
      category : 'study',
      text : 'π κ³΅λΆ'
    },
    {
      category : 'shopping',
      text : 'π μΌν'
    },
    {
      category : 'meeting',
      text : 'π¨βπ©βπ§βπ¦ μλͺ¨μ'
    },
    {
      category : 'etc',
      text : 'ππ» κΈ°ν'
    },
    {
      category : 'all',
      text : 'μ μ²΄'
    },
]

const category = createSlice({
    name : "category",
    initialState,
});

export default category;